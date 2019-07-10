var AWS = require("aws-sdk");
var dynamodb = new AWS.DynamoDB();

const humidity_event_type = "humidity_reading";
const temperature_event_type = "temperature_reading";
const motion_detected_event_type = "motion_detected";

const humidity_table = "humidity_readings";
const temperature_table = "temperature_readings";
const motion_detection_table = "motion_detection_events";

const successResponse = {
  statusCode: 200,
  body: JSON.stringify("Item saved to DynamoDB!")
};

const createHumidityItem = event => {
  var parsed_event_date = new Date(event.event_datetime);
  return {
    Item: {
      date: { S: event.event_datetime.slice(0, 10) },
      timestamp: { N: String(parsed_event_date.valueOf()) },
      sensor_id: { S: event.sensor_id },
      sensor_name: { S: event.sensor_name },
      event_datetime: { S: event.event_datetime },
      event_type: { S: event.event_type },
      humidity_percentage: { S: String(event.humidity_percentage) }
    },
    TableName: humidity_table
  };
};

const createTemperatureItem = event => {
  var parsed_event_date = new Date(event.event_datetime);
  return {
    Item: {
      date: { S: event.event_datetime.slice(0, 10) },
      timestamp: { N: String(parsed_event_date.valueOf()) },
      sensor_id: { S: event.sensor_id },
      sensor_name: { S: event.sensor_name },
      event_datetime: { S: event.event_datetime },
      event_type: { S: event.event_type },
      temperature_celsius: { S: String(event.temperature_celsius) },
      temperature_farenheit: { S: String(event.temperature_farenheit) }
    },
    TableName: temperature_table
  };
};

const createMotionDetectedItem = event => {
  var parsed_event_date = new Date(event.event_datetime);
  return {
    Item: {
      date: { S: event.event_datetime.slice(0, 10) },
      timestamp: { N: String(parsed_event_date.valueOf()) },
      sensor_id: { S: event.sensor_id },
      sensor_name: { S: event.sensor_name },
      event_datetime: { S: event.event_datetime },
      event_type: { S: event.event_type }
    },
    TableName: motion_detection_table
  };
};

const persistToDynamo = item => {
  dynamodb.putItem(item, (err, data) => {
    if (err) {
      console.log("Error persisting to DynamoDB: " + err);
      return {
        statusCode: 400,
        body: JSON.stringify("Error persisting to DynamoDB: " + err)
      };
    } else {
      console.log("Reading persisted to DynamoDB: ");
      return successResponse;
    }
  });
};

exports.handler = async event => {
  switch (event.event_type) {
    case humidity_event_type:
      console.log("Processing humidity event");
      return persistToDynamo(createHumidityItem(event));
    case temperature_event_type:
      console.log("Processing temperature event");
      return persistToDynamo(createTemperatureItem(event));
    case motion_detected_event_type:
      console.log("Processing motion detected event");
      return persistToDynamo(createMotionDetectedItem(event));
    default:
      return {
        statusCode: 400,
        body: JSON.stringify("Event type not recognised")
      };
  }
};
