import getData from "./readings-api";
import axios from "axios";
import { JestEnvironment } from "@jest/environment";

beforeEach(() => {
  jest.mock("axios");
  axios.get = jest.fn(() => {
    return new Promise((resolve, reject) => {
      resolve(1)
    })
  });
});

test("it queries the correct URL", () => {
  getData("customMetricHere", "2019-06-24");
  expect(axios.get.mock.calls.length).toBe(1);
  expect(axios.get.mock.calls[0]).toEqual([
    REACT_APP_READINGS_API +
    REACT_APP_READINGS_API_ENDPOINT +
    "?metric=customMetricHere&date=2019-06-24"
  ]);
});

test("it formats the humidity data correctly", async () => {
  axios.get = jest.fn(() => {
    return Promise.resolve({
      data: {
        statusCode: 200,
        body: JSON.stringify([
          {
            event_type: "humidity_reading",
            date: "2019-06-24",
            event_datetime: "2019-06-24T15:50:07",
            sensor_id: "31343DFB-4CB8-4985-8322-ACEA8F26CDC3",
            timestamp: 1561391407000,
            humidity_percentage: "62",
            sensor_name: "Jack's sensor"
          },
          {
            event_type: "humidity_reading",
            date: "2019-06-24",
            event_datetime: "2019-06-24T15:52:08",
            sensor_id: "31343DFB-4CB8-4985-8322-ACEA8F26CDC3",
            timestamp: 1561391528000,
            humidity_percentage: "61",
            sensor_name: "Jack's sensor"
          }
        ])
      }
    })
  })

  await expect(getData("humidity", "2019-06-24")).resolves.toEqual(
    [
      { x: "2019-06-24T15:50:07", y: 62 },
      { x: "2019-06-24T15:52:08", y: 61 }
    ])
});

test("it formats the temperature data correctly", async () => {
  axios.get = jest.fn(() => {
    return Promise.resolve({
      data: {
        statusCode: 200,
        body: JSON.stringify([
          {
            event_type: "temperature_reading",
            date: "2019-06-24",
            event_datetime: "2019-06-24T15:50:07",
            sensor_id: "31343DFB-4CB8-4985-8322-ACEA8F26CDC3",
            temperature_celsius: "24.3",
            timestamp: 1561391407000,
            temperature_farenheit: "75.74",
            sensor_name: "Jack's sensor"
          }, {
            event_type: "temperature_reading",
            date: "2019-06-24",
            event_datetime: "2019-06-24T15:52:08",
            sensor_id: "31343DFB-4CB8-4985-8322-ACEA8F26CDC3",
            temperature_celsius: "24.2",
            timestamp: 1561391528000,
            temperature_farenheit: "75.56",
            sensor_name: "Jack's sensor"
          }
        ])
      }
    })
  })

  await expect(getData("temperature", "2019-06-24")).resolves.toEqual(
    [
      { x: "2019-06-24T15:50:07", y: 24.3 },
      { x: "2019-06-24T15:52:08", y: 24.2 }
    ])
});