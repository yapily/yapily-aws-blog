/*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/

/* Amplify Params - DO NOT EDIT
	ENV
	REGION
	STORAGE_YAPILYAWS_ARN
	STORAGE_YAPILYAWS_NAME
	STORAGE_YAPILYAWS_STREAMARN
Amplify Params - DO NOT EDIT */

const aws = require("aws-sdk");
const express = require("express");
const base64 = require("base-64");
const axios = require("axios");
const bodyParser = require("body-parser");
const awsServerlessExpressMiddleware = require("aws-serverless-express/middleware");
const { v4: uuidv4 } = require("uuid");
const { query } = require("express");
const tableName = "yapilyaws" + "-dev";
aws.config.update({ region: process.env.TABLE_REGION });
const dynamodb = new aws.DynamoDB.DocumentClient();

// declare a new express app
const app = express();
app.use(bodyParser.json());
app.use(awsServerlessExpressMiddleware.eventContext());

// Enable CORS for all methods
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

const APPLICATION_ID = process.env.APPLICATION_ID; // yapily application uuid
const APPLICATION_SECRET = process.env.APPLICATION_SECRET; // yapily application secret
const APPLICATION_USER = process.env.APPLICATION_USER;
const baseUrl = "https://api.yapily.com"; // yapily API URL

const encryptedHeader = `Basic ${base64.encode(
  `${APPLICATION_ID}:${APPLICATION_SECRET}`
)}`;

/**********************
 * Institutions *
 **********************/

app.get("/v1/institutions", async function (req, res) {
  // Add your code here
  console.info("fetching institutions");
  await axios
    .get(`${baseUrl}/institutions`, {
      headers: {
        Authorization: encryptedHeader,
      },
    })
    .then((results) => {
      console.info("got institutions");

      res.status(200).json(results.data);
    })
    .catch((error) => {
      console.error("failed to load institutions", error);
      res.status(500).json(error);
    });
});

app.get("/v1/institution/:id", async function (req, res) {
  // Add your code here
  console.info("fetching institution");
  await axios
    .get(`${baseUrl}/institutions/${req.params.id}`, {
      headers: {
        Authorization: encryptedHeader,
      },
    })
    .then((results) => {
      console.info("got institution detail:", req.params.id);
      res.status(200).json(results.data);
    })
    .catch((error) => {
      console.error("failed to load institution", error);
      res.status(500).json(error);
    });
});

/****************************
 * Account authentication *
 ****************************/

// endpoint to initiate an account request
app.post("/v1/account-auth-requests", async function (req, res) {
  const { institutionId, callbackURL } = req.body;
  console.info("initialise account auth request");
  await axios
    .post(
      `${baseUrl}/account-auth-requests`,
      {
        applicationUserId: APPLICATION_USER,
        institutionId,
        callback: callbackURL,
      },
      {
        headers: {
          Authorization: encryptedHeader,
        },
      }
    )
    .then(async (results) => {
      res.status(200).json(results.data);
    })
    .catch((error) => {
      console.error("failed to request account auth", error);
      res.status(500).json(error.response);
    });
});

// fetch consent details from yapily, this will return consent status
app.get("/v1/consents/:id", async function (req, res) {
  await axios
    .get(`${baseUrl}/consents/${req.params.id}`, {
      headers: {
        Authorization: encryptedHeader,
      },
    })
    .then((results) => {
      res.status(200).json(results.data);
    })
    .catch((error) => {
      res.status(500).json(error.response);
    });
});

/****************************
 * Accounts *
 ****************************/

// save account details to dynamodb
app.post("/v1/accounts", async function (req, res) {
  await dynamodb.put(
    {
      TableName: tableName,
      Item: {
        id: uuidv4(), // generate random id
        ...req.body,
      },
    },
    (err) => {
      if (err) {
        console.error("failed to save to account: ", err);
        return res.status(500).json(err);
      } else {
        res.status(200).json({ message: "Account saved" });
      }
    }
  );
});

// get account detail from dynamodb
app.get("/v1/accounts/:userId", async function (req, res) {
  let results = [];
  try {
    const data = await dynamodb
      .scan({
        TableName: tableName,
      })
      .promise();
    results = data.Items.filter(
      (account, index, array) =>
        array.findIndex(
          (t) =>
            t.userId === req.params.userId &&
            t.institutionId === account.institutionId &&
            t.consentToken === account.consentToken
        ) === index
    );
  } catch (e) {
    return res.status(500).json(e);
  }
  return res.status(200).json(results);
});

// fetch account details from yapily with consent
app.get("/v1/accounts", async function (req, res) {
  const { consent } = req.query; // with approved consent from the user
  console.log("consent::", req.query);
  await axios
    .get(`${baseUrl}/accounts`, {
      headers: {
        Authorization: encryptedHeader,
        consent,
        Accept: "application/json;charset=UTF-8",
      },
    })
    .then((results) => {
      res.status(200).json(results.data);
    })
    .catch((error) => {
      console.error("failed to load accounts", error);
      res.status(500).json(error);
    });
});

/****************************
 * Transactions *
 ****************************/

// get list of transactions from yapily
app.get("/v1/accounts/:id/transactions", async function (req, res) {
  const { consent } = req.query; // consent of account
  // get a month wort of date
  const beforeDate = new Date();
  const date = new Date(new Date().setDate(beforeDate.getDate() - Number(30)));
  await axios
    .get(
      `${baseUrl}/accounts/${
        req.params.id
      }/transactions?from=${date.toISOString()}&with=categories`,
      {
        headers: {
          Authorization: encryptedHeader,
          consent,
          Accept: "application/json;charset=UTF-8",
        },
      }
    )
    .then((results) => {
      res.status(200).json(results.data);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
});

/****************************
 * Payment request  *
 ****************************/

// make consent request to make a payment
app.post("/v1/payment-auth-requests", async function (req, res) {
  const { institutionId, callbackURL, paymentRequest } = req.body;
  await axios
    .post(
      `${baseUrl}/payment-auth-requests`,
      {
        applicationUserId: APPLICATION_USER,
        institutionId,
        callback: callbackURL,
        paymentRequest,
      },
      {
        headers: {
          Authorization: encryptedHeader,
        },
      }
    )
    .then(async (results) => {
      res.status(200).json(results.data);
    })
    .catch((error) => {
      console.error("failed to get payment consent", error);
      res.status(500).json(error.response);
    });
});

// make payment with consent acquired from user
app.post("/v1/payments", async (req, res) => {
  const { paymentRequest, consent } = req.body;
  console.log("paymentRequest", paymentRequest);
  await axios
    .post(
      `${baseUrl}/payments`,
      { ...paymentRequest },
      {
        headers: {
          Authorization: encryptedHeader,
          consent,
          Accept: "application/json;charset=UTF-8",
          "Content-Type": "application/json;charset=UTF-8",
        },
      }
    )
    .then(async (results) => {
      res.status(200).json(results.data);
    })
    .catch((error) => {
      console.error("failed to make payment", error.response);
      res.status(500).json(error.response);
    });
});
// save payment detail to dynamodb
app.post("/v1/save-payment", async function (req, res) {
  await dynamodb.put(
    {
      TableName: tableName,
      Item: {
        id: uuidv4(), // generate random id
        ...req.body,
      },
    },
    (err) => {
      if (err) {
        console.error("failed to save to account: ", err);
        return res.status(500).json(err);
      } else {
        res.status(200).json({ message: "Account saved" });
      }
    }
  );
});
// get payment detail
app.get("/v1/payments/:id/details", async (req, res) => {
  const { id } = req.params;
  const { consent } = req.query; // consent used for payment
  await axios
    .get(`${baseUrl}/payments/${id}/details`, {
      headers: {
        Authorization: encryptedHeader,
        consent,
        Accept: "application/json;charset=UTF-8",
      },
    })
    .then((results) => {
      res.status(200).json(results.data);
    })
    .catch((error) => {
      console.error("failed to get payment details", error.response);
      res.status(500).json(error.response);
    });
});

// get account detail from dynamodb
app.get("/v1/payment/detail/:userId", async function (req, res) {
  let results = [];
  try {
    const data = await dynamodb
      .scan({
        TableName: tableName,
      })
      .promise();
    results = data.Items.filter(
      (account, index, array) =>
        array.findIndex(
          (t) =>
            t.userId === req.params.userId &&
            t.institutionId === account.institutionId &&
            t.paymentConsentToken === account.paymentConsentToken &&
            t.paymentId === account.paymentId
        ) === index
    );
  } catch (e) {
    return res.status(500).json(e);
  }
  return res.status(200).json(results);
});
app.listen(3000, function () {
  console.log("App started");
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app;
