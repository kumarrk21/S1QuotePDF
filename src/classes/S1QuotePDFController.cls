public with sharing class S1QuotePDFController {
	public S1QuotePDFController(ApexPages.StandardController sc) {	}

	@AuraEnabled
	public static String getPDFData(String quoteId, String templateId){
		returnMessage ret = new returnMessage();
		ret.success = false;
		try{
			String pdfURL = '/quote/quoteTemplateDataViewer.apexp?id='+quoteId+'&summlid='+templateId;
			PageReference pdf = new PageReference(pdfURL);
			String b64 = EncodingUtil.base64Encode(pdf.getContent());
			ret.success=true;
			ret.message = b64;	
		}catch(Exception e){
			ret.message = JSON.serialize(e.getMessage());
		}
		return JSON.serialize(ret);
	}

	@AuraEnabled
	public static String emailPDF(String quoteId, String emailId, String pdfData){
		returnMessage ret = new returnMessage();
		ret.success = false;

		//Implement send email logic here..
		ret.success=true;
		ret.message = 'Email Sent Successfully';
		return JSON.serialize(ret);

	}

	@AuraEnabled
	public static String savePDF(String quoteId, String pdfData){
		returnMessage ret = new returnMessage();
		ret.success = false;

		try{
			Quote q = [Select Name from Quote where id=:quoteId];
			QuoteDocument qd = new QuoteDocument();
			qd.document = EncodingUtil.base64Decode(pdfData);
			qd.quoteId = quoteId;
			insert qd;	
			ret.success = true;
		}catch(Exception e){
			ret.message = e.getMessage();
		}
		
		return JSON.serialize(ret);
	}

	private class returnMessage{
    	public Boolean success{get;set;}
    	public String message{get;set;}
    }

}