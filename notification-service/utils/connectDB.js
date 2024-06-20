// // Import the functions you need from the SDKs you need
// import { initializeApp, cert } from "firebase-admin/app";
// // import { getAnalytics } from "firebase/analytics";
// import { getFirestore } from "firebase-admin/firestore";
// import serviceAccount from "./../../serviceAccountKey.json" assert { type: "json" };

// Import the functions you need from the SDKs you need
import { initializeApp, cert } from "firebase-admin/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase-admin/firestore";
import serviceAccount from "./../serviceAccountKey.json" assert { type: "json" };

// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Initialize Firebase
// initializeApp({
//   credential: cert(serviceAccount),
// });

// const firestore = getFirestore();

// // const docRef = firestore.collection('users').doc('alovelace');

// // docRef.set({
// //   first: 'Ada',
// //   last: 'Lovelace',
// //   born: 1815
// // });

// export default firestore;
// Initialize Firebase
initializeApp({
  credential: cert(serviceAccount),
});

const db = getFirestore();

export default db;
