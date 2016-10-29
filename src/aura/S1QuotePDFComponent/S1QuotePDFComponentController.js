({
	doInit : function(cmp, evt, helper) {
		var apexMethod = cmp.get('c.getPDFData');
		var quoteId = cmp.get('v.quoteId');
		var templateId = cmp.get('v.templateId');

		apexMethod.setParam('quoteId',quoteId);
        apexMethod.setParam('templateId',templateId);
        apexMethod.setCallback(this, function(response) {
            var state = response.getState();
            if (state == 'SUCCESS') {
            	var ret = JSON.parse(response.getReturnValue());
                if(ret.success){
                	var pdfData = ret.message;
                	cmp.set('v.pdfData',pdfData);
                	//Create the PDF viewer component
                	$A.createComponent(
            			"c:pdfViewer",
            			{
                			"pdfData": pdfData
            			},
            			function(pdfViewer, status, errorMessage){
                			if (status === "SUCCESS") {
                    		var pdfContainer = cmp.get("v.pdfContainer");
                    		pdfContainer.push(pdfViewer);
                    		cmp.set("v.pdfContainer", pdfContainer);
                			}
                			else if (status === "INCOMPLETE") {
                    			console.log("No response from server or client is offline.")
                			}
                			else if (status === "ERROR") {
                    			console.log("Error: " + errorMessage);

			                }
            			}
        		   );
                }else{
                	this.throwError("Error get PDF Data " + ret.message);
                	console.log(ret.message)
                }
            } else {
            	this.throwError("Error get PDF Data " + response.getError());
            	console.log(response.getError());
            }
        });
        $A.enqueueAction(apexMethod);
	},

    sendEmail: function(cmp,evt,helper){
        var apexMethod = cmp.get('c.emailPDF');
        var quoteId = cmp.get('v.quoteId');
        var emailId = cmp.get('v.emailId');
        var pdfData = cmp.get('v.pdfData');
        apexMethod.setParam('quoteId',quoteId);
        apexMethod.setParam('emailId',emailId);
        apexMethod.setParam('pdfData',pdfData);
        apexMethod.setCallback(this, function(response) {
            var state = response.getState();
            if (state == 'SUCCESS') {
                var ret = JSON.parse(response.getReturnValue());
                if(ret.success){
                    alert(ret.message);
                }else{
                    this.throwError("Error get PDF Data " + ret.message);
                    console.log('Error' , ret.message)
                }
            } else {
                this.throwError("Error get PDF Data " + response.getError());
                console.log('Error', response.getError());
            }
        });
        $A.enqueueAction(apexMethod);
    },

    saveQuote:function(cmp,evt,helper){

        var apexMethod = cmp.get('c.savePDF');
        var quoteId = cmp.get('v.quoteId');
        var pdfData = cmp.get('v.pdfData');
        apexMethod.setParam('quoteId',quoteId);
        apexMethod.setParam('pdfData',pdfData);
        apexMethod.setCallback(this, function(response) {
            var state = response.getState();
            if (state == 'SUCCESS') {
                var ret = JSON.parse(response.getReturnValue());
                if(ret.success){
                    //Navigate to Qoute
                    var url = '/' + quoteId;
                    if((typeof sforce!='undefined')&&(sforce!=null)){
                        sforce.one.navigateToURL(url);
                    }else{
                        try{
                            var urlEvent = $A.get("e.force:navigateToURL");
                            urlEvent.setParams({
                                    "url": url
                            });
                            urlEvent.fire();
                        }catch(e){
                            window.location.href=url;
                        }
                    }
                }else{
                    this.throwError("Error in saving PDF Data " + ret.message);
                    console.log('Error' , ret.message)
                }
            } else {
                this.throwError("Error get PDF Data " + response.getError());
                console.log('Error', response.getError());
            }
        });
        $A.enqueueAction(apexMethod);

    }
})