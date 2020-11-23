import * as functions from "firebase-functions";
// import { AddressInfo } from "net";
import cors from "cors";
import firebaseAdmin from "firebase-admin";
// import firebase from "firebase";
import express from 'express';
import { endpointTeste } from './temporaryEndpoint';

const app = express();
app.use(cors({ origin: true }), express.json());
exports.app = functions.https.onRequest(app);

// const firebaseConfig = {
//   apiKey: functions.config().someservice.key,
//   authDomain: functions.config().someservice.auth,
//   databaseURL: functions.config().someservice.database,
//   projectId: functions.config().someservice.project,
//   storageBucket: functions.config().someservice.storage,
//   messagingSenderId: functions.config().someservice.messaging,
//   appId: functions.config().someservice.app,
// }

firebaseAdmin.initializeApp(functions.config().firebase);
// firebase.initializeApp(firebaseConfig);

// const db = admin.firestore();

export const db = firebaseAdmin.firestore();

app.get('/teste', endpointTeste);

// const server = app.listen(process.env.PORT || 3000, () => {
//   if (server) {
//     const address = server.address() as AddressInfo;
//     console.log(`Server is running in http://localhost:${address.port}`);
//   } else {
//     console.error(`Failure upon starting server.`);
//   }
// });