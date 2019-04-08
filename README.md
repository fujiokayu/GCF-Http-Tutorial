# GCF-Http-Tutorial

## [Pricing (Free usage)](https://cloud.google.com/functions/pricing-summary/?hl=ja)
### Free usage tier
- 2 Million	Times
- Up to 1 Million Seconds
- 5 Gigabytes Down Traffic

See also [Google Cloud Platform: free](https://cloud.google.com/free/?hl=ja).

## Using Docker
If you familiar with Docker, I recommend using [this image](https://hub.docker.com/r/google/cloud-sdk/).  
It was installed gcloud and node.js.

## [HTTP Tutorial](https://cloud.google.com/functions/docs/tutorials/http?hl=ja)
### Setting up
1. GO TO THE [MANAGE RESOURCES PAGE](https://console.cloud.google.com/cloud-resource-manager?_ga=2.185008361.-1306992646.1554131714) and make project.
1. Enable Billing(need GCP Account)
1. [Enable the Cloud Functions API](https://console.cloud.google.com/flows/enableapi?apiid=cloudfunctions&redirect=https://cloud.google.com/functions/docs/tutorials/http&_ga=2.147738103.-1306992646.1554131714)
1. [Install and Initialize Cloud SDK](https://cloud.google.com/sdk/docs/?hl=ja)
1. Update and install gcloud components:  
`gcloud components update`
1. if you don't have a Node.js development environment, see [this](https://cloud.google.com/nodejs/docs/setup?hl=ja).
### Make and deproy apps
1. Make local folder  
`mkdir ~/your-foler && cd ~/your-foler`
1. vi [index.js](index.js)
1. Deploy app  
`gcloud beta functions deploy helloGET --trigger-http`  
If the warning about runtime flag bothers you, see [this](https://cloud.google.com/functions/docs/concepts/go-runtime?hl=ja).
1. call your httpsTrigger by curl.  
`curl "https://[YOUR_REGION]-[YOUR_PROJECT_ID].cloudfunctions.net/helloGET"
`
1. You will get response "Hello World!".  
If you need response status, implement as follow:
```
exports.helloGET = (req, res) => {
    res.status(200).send('Hello World!');
};
```

### Cleaning up
1. Deleting the project
    1. In the GCP Console, go to the [Projects page](https://console.cloud.google.com/iam-admin/projects?_ga=2.244729285.-1306992646.1554131714)
    1. select the project you want to delete and click Delete.
    1. In the dialog, type the project ID, and then click Shut down to delete the project.
1. Deleting the Cloud Function
```
gcloud functions delete helloGET 
```