const cdk = require('aws-cdk-lib');
const nodejs = require('aws-cdk-lib/aws-lambda-nodejs');
const lambda = require('aws-cdk-lib/aws-lambda');
const apiGateway = require('aws-cdk-lib/aws-apigateway');
const path = require('path');

class PtbxTaskStack extends cdk.Stack {
  /**
   * @param {cdk.App} scope
   * @param {string} id
   * @param {cdk.StackProps=} props
   */
  constructor(scope, id, props) {
    super(scope, id, props);

    const getPhotoProductsHandler = new nodejs.NodejsFunction(this, 'get-photo-products-handler', {
      runtime: lambda.Runtime.NODEJS_18_X,
      entry: path.join(__dirname, '../src/functions/get-photo-products/handler.js'),
      handler: 'getPhotoProducts',
      environment: {
        IMAGES_URL: process.env.IMAGES_URL,
        LOG_LEVEL: 'debug',
      },
    });

    const api = new apiGateway.RestApi(this, 'ptbx-api-gateway', {
      restApiName: 'Ptbx API',
      description: 'Service to retrieve a list of images with properties',
    });

    const v1ApiGateway = api.root.addResource('v1');
    const getPhotoProductPath = v1ApiGateway.addResource('photo-products', {
      defaultCorsPreflightOptions: {
        allowOrigins: apiGateway.Cors.ALL_ORIGINS,
        allowHeaders: apiGateway.Cors.DEFAULT_HEADERS.concat(['x-api-key']),
      },
    });

    getPhotoProductPath.addMethod(
      'GET',
      new apiGateway.LambdaIntegration(getPhotoProductsHandler)
    );
  }
}

module.exports = { PtbxTaskStack };
