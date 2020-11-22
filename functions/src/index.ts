import * as functions from "firebase-functions";
import { AddressInfo } from "net";
import * as cors from "cors";
import * as admin from "firebase-admin";
import firebase from "firebase";
import * as express from 'express';
import { Request, Response } from 'express';

const app = express();
app.use(cors({ origin: true }), express.json());
exports.app = functions.https.onRequest(app);

const firebaseConfig = {
  apiKey: functions.config().someservice.key,
  authDomain: functions.config().someservice.auth,
  databaseURL: functions.config().someservice.database,
  projectId: functions.config().someservice.project,
  storageBucket: functions.config().someservice.storage,
  messagingSenderId: functions.config().someservice.messaging,
  appId: functions.config().someservice.app,
}

admin.initializeApp(functions.config().firebase);
firebase.initializeApp(firebaseConfig);

// const db = admin.firestore();

app.get('/teste', async(req: Request, res: Response) => {
  try {

    // await db.collection('teste').doc().set({
    //   nome: 'Luan',
    //   sobrenome: 'Bonetto'
    // })

    res.status(200).send({
      message: 'Hello World',
    })
  } catch (err) {
    res.status(400).send({
      message: err.message,
    })
  }
})

const server = app.listen(process.env.PORT || 3000, () => {
  if (server) {
    const address = server.address() as AddressInfo;
    console.log(`Server is running in http://localhost:${address.port}`);
  } else {
    console.error(`Failure upon starting server.`);
  }
});
