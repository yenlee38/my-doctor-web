import { initializeApp } from "firebase/app";
import { initializeFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
//lan1
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC3nFrxLvpnHbhEQmgpYSZJCntjXsLzaFI",
  authDomain: "my-doctor-91624.firebaseapp.com",
  projectId: "my-doctor-91624",
  storageBucket: "my-doctor-91624.appspot.com",
  messagingSenderId: "277901999857",
  appId: "1:277901999857:web:c84a69bbe6eea0204e7350",
};
//lan2
// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const db = getFirestore(app);
const db = initializeFirestore(app, { experimentalForceLongPolling: true });
const storage = getStorage();
export { db, storage };
//lan3
//lan4
//lan 5
//lan6
//lan7
//lan8
