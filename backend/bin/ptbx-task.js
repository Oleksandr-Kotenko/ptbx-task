#!/usr/bin/env node
const cdk = require('aws-cdk-lib');
const { PtbxTaskStack } = require('../lib/ptbx-task-stack');
require('dotenv').config();

const app = new cdk.App();
new PtbxTaskStack(app, 'PtbxTaskStack');
