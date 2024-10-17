const admin = require("firebase-admin");
require("dotenv").config();
const config = require("./config.js");
const { getAuth } = require("firebase/auth");

const { initializeApp } = require("firebase/app");
const { getStorage } = require("firebase/storage");
const serviceAccount = require("./serviceAccountKey.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.FIREBASE_DB_URL,
});
const app = initializeApp(config.firebaseConfig);
const auth = getAuth(app);
const storage = getStorage(app);
const db = admin.database();
const adminAuth = admin.auth();

console.log("firebase is ready to go ");
module.exports = {
  auth,
  adminAuth,
  storage,
  db,
  admin,
};
