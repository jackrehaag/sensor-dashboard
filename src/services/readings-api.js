const axios = require("axios");

const metricDataKeys = {
  temperature: "temperature_celsius",
  humidity: "humidity_percentage",
  motion_detection: "date"
};

const baseURL =
  process.env.REACT_APP_READINGS_API;

const endpoint =
  process.env.REACT_APP_READINGS_API_ENDPOINT;

const buildURL = (metric, date) => {
  return baseURL + endpoint + "?metric=" + metric + "&date=" + date;
};

const getDataKey = metric => {
  return metricDataKeys[metric];
};

const transformData = (metric, data) => {
  return data.map(datapoint => {
    return {
      x: datapoint["event_datetime"],
      y: parseFloat(datapoint[getDataKey(metric)])
    }
  })
}

const getData = (metric, date) => {
  const dataKey = getDataKey(metric);
  return axios.get(buildURL(metric, date))
    .then(response => {
      const results = JSON.parse(response.data["body"]);
      return transformData(metric, results);
    })
    .catch(err => {
      console.log("Could not fetch data, error: " + err);
    });
};

export default getData;
