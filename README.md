Generate PDF for Quote in Salesforce1
===============================

This package contains a lightning compnent which internaly uses the <a href="https://github.com/kumarrk21/PDFViewer">PDF Viewer</a> lightning component to generate PDFs for Quotes on the fly using Salesforce1.

Salesforce1, out of the box, doesn't support creating quote PDFs. It also desn't support viewing or emailing them either. This package contains sample code to achieve the same. Once installed in your org, create a custom button for Qoute object using VF page 'S1QuotePDF'. Then palce this custom button in your page layout for your users to use in Salesforce1. Since Quote object doesn't support quick actions, you will have to use custom buttons which means this button will also be visible in the full site. You may want to update the VF page to throw a message to the user if accessed in full site that it is not supported for full site and only supported for Salesfore1.

<a href="https://githubsfdeploy.herokuapp.com?">
  <img alt="Deploy to Salesforce"
       src="https://raw.githubusercontent.com/afawcett/githubsfdeploy/master/deploy.png">
</a>
