({
	doInit : function(cmp, evt, helper) {
		var apexMethod = cmp.get('c.getPDFData');
		var quoteId = cmp.get('v.quoteId');
        
		apexMethod.setParam('quoteId',quoteId);
        apexMethod.setCallback(this, function(response) {
            var state = response.getState();
            if (state == 'SUCCESS') {
            	var ret = JSON.parse(response.getReturnValue());
                if(ret.success){
                    var spinner = cmp.find("_spinner");
                    $A.util.toggleClass(spinner, "slds-hide");
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
                                throw new Error("No response from server or client is offline.");
                			}
                			else if (status === "ERROR") {
                    			console.log("Error: " + errorMessage);
                                throw new Error("Error: " + errorMessage);
			                }
            			}
        		   );
                }else{
                	console.log(ret.message)
                }
            } else {
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
                    console.log('Error' , ret.message)
                }
            } else {
                console.log('Error', response.getError());
                throw new Error('Error: ', response.getError());
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
                    console.log('Error' , ret.message)
                    throw new Error('Error: ', ret.message);
                }
            } else {
                console.log('Error', response.getError());
                throw new Error('Error: ', response.getError());
            }
        });
        $A.enqueueAction(apexMethod);

    }
})