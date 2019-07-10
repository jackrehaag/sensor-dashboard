#!/usr/bin/env bash

FUNCTION_NAME="DynamoDB_requests"
ZIP_FILE="function.zip"
LAMBDA_FILE="index.js"

zip $ZIP_FILE index.js
aws lambda update-function-code --function-name $FUNCTION_NAME --zip-file fileb://$ZIP_FILE
rm $ZIP_FILE
