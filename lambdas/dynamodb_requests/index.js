var AWS = require("aws-sdk");
var documentClient = new AWS.DynamoDB.DocumentClient();

const humidity_table = "humidity_readings";
const temperature_table = "temperature_readings";
const motion_detection_table = "motion_detection_events";

const getTableName = metric => {
  if (metric == "temperature") {
    return temperature_table;
  } else if (metric == "humidity") {
    return humidity_table;
  } else if (metric == "motion_detection") {
    return motion_detection_table;
  }
};

exports.handler = (event, context, callback) => {
  const date = event.dateParam;
  const table = getTableName(event.metricParam);
  const params = {
    TableName: table,
    Select: "ALL_ATTRIBUTES",
    ExpressionAttributeNames: {
      "#k1": "date"
    },
    ExpressionAttributeValues: {
      ":v1": date
    },
    KeyConditionExpression: "#k1 = :v1"
  };
  documentClient.query(params, (err, data) => {
    if (err) {
      console.log("error: " + err.stack);
      callback(null, {
        statusCode: 400,
        body: JSON.stringify(
          "something went wrong: " + err + " trace:" + err.stack
        ),
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json"
        }
      });
    } else {
      callback(null, {
        statusCode: 200,
        body: JSON.stringify(data.Items),
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json"
        }
      });
    }
  });
};
