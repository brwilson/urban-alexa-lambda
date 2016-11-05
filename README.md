# urban-alexa-lambda

An Amazon Lambda Function for Alexa Skills Kit that interacts with Urban Dictionary.

## Requirements

- serverless >= 1.1.0
- serverless-alexa-plugin >= 0.0.3
- urban >= 0.3.1

## Installation

First, install and set up serverless. Also install the AWS cli and set up your local credentials

Deploy:

```bash
$ npm install && npm install --dev
$ AWS_PROFILE=YOURPROFILE serverless deploy
```

In AWS check to make sure that the "Alexa Skills Kit" is set up in the generated Lambda function's triggers. The `serverless-alexa-plugin` seems to work only sometimes.

Then go into your Alexa Developer Console and configure an Alexa skill using the `utterances.txt` and `intent_schema.js` files in this repo to set it up. Use the ARN of your deployed Lambda function as the endpoint for the skill.
