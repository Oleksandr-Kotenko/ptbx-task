# Backend component

## Architecture diagram

Link to architecture diagram [file](https://github.com/Oleksandr-Kotenko/ptbx-task/blob/main/backend/docs/backend-component.drawio)

![Diagram image](https://github.com/Oleksandr-Kotenko/ptbx-task/blob/main/backend/docs/backend-component.drawio.png)

## Project structure

#### Backend layers

|     | Layer          | Description | in backend component |
|-----|----------------| ------ | ------- |
| 1   | Presentation   | Exposes interaction capabilities for the end users or applications / systems wanting to interact with it. Interacts with Business Logic layer. | /src/functions |
| 2   | Business Logic | Expresses domain knowledge, to be utilised from Presentation layer. Interacts with Data Access layer. | /src/services |
| 3   | Data Access | Acts as a data persistence, to be utilised from Business Logic. Can interact with other applications (through their presentation layers). | /src/clients |


#### Application structure

* `bin` folder contains main stack file. Main entry point for the application.
* `lib/ptbx-task-stack.js` - file defines backend component stack.
* `src/clients` - data access layer. For now only http client placed here.
* `src/constants` - storage for constants
* `src/functions` - place to store lambda functions. In current implementation to handle HTTP events from API Gateway.
* `src/services` - Business layer. The only place where business logic exists.
* `src/utils` - Common utils which can be shared across multiple layers.
* `test` - Single place for all project tests.

## Setup and Deploy backend component

Backend component implemented by using [AWS Cloud Development Kit](https://docs.aws.amazon.com/cdk/v2/guide/home.html)

### Important

Before deployment make sure that all prerequisites described [Get Started](https://docs.aws.amazon.com/cdk/v2/guide/getting_started.html) are done.

#### Deploy
* From backend folder install node.js dependencies `npm install`
* Copy and rename from `.env.example` file to `.env`. This file contains environment variables which uses in deployment. `IMAGE_URL` is the same URL as provided in task description.
* Optional you can check template synthesized from the app:
```shell
cdk synth
```
* Optional, if you use AWS CDK first time on account you can install a bootstrap stack.
```shell
cdk bootstrap
```

* Let's deploy stack
```shell
cdk deploy
```
* Deployment output should be like:
```shell
******Stack.Endpoint8024A810 = https://xxxxxxxxxx.execute-api.us-east-1.amazonaws.com/prod/v1/photo-products
```
This endpoint can be used for tests.

## Other useful commands

* Delete a stack
```shell
cdk destroy
```

* Run eslint in project
```shell
npm run lint
```

* Run unit tests
````shell
npm run test
````

## Postman collection for testing
[LINK](https://github.com/Oleksandr-Kotenko/ptbx-task/blob/main/backend/docs/cdk-stack.postman_collection.json)