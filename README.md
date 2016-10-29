Generate PDF for Quote in Salesforce1
===============================

This package contains a lightning compnent which internally uses the <a href="https://github.com/kumarrk21/PDFViewer">PDF Viewer</a> lightning component to generate PDFs for Quotes on the fly using Salesforce1.

Salesforce1, out of the box, doesn't support creating quote PDFs. It also doesn't support viewing or emailing them either. This package contains sample code to generate PDFs on quote objects and save them. Once installed in your org, create a custom button (call it 'Generate PDF') for Quote object using VF page 'S1QuotePDF'. Then place this custom button in your page layout for your users to use in Salesforce1. Since Quote object doesn't support quick actions, you will have to use custom buttons which means this button will also be visible in the full site. You may want to update the VF page to throw a message to the user if accessed in full site that it is not supported for full site and only supported for Salesfore1. Also, the send email hasn’t been implemented in this sample although you could easily implement it using ‘SingleEmailMessage’ object. There are numerous examples available in the interwebs for sending emails with Salsforce

<a href="https://githubsfdeploy.herokuapp.com?">
  <img alt="Deploy to Salesforce"
       src="https://raw.githubusercontent.com/afawcett/githubsfdeploy/master/deploy.png">
</a>

