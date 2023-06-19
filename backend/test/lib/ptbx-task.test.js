const cdk = require('aws-cdk-lib');
const { Template } = require('aws-cdk-lib/assertions');
const PtbxTask = require('../../lib/ptbx-task-stack');

test('SQS Queue and SNS Topic Created', () => {
  const app = new cdk.App();
  // WHEN
  const stack = new PtbxTask.PtbxTaskStack(app, 'MyTestStack');
  // THEN
  const template = Template.fromStack(stack);
  template.hasResourceProperties('AWS::Lambda::Function', {
    Runtime: 'nodejs18.x',
  });

  template.hasResourceProperties('AWS::ApiGateway::Method', {
    HttpMethod: 'GET',
  });
});
