import firebase from 'firebase/app';
import 'firebase/auth';
// <!-- The core Firebase JS SDK is always required and must be listed first -->

/* <script src="https://www.gstatic.com/firebasejs/8.6.5/firebase-app.js"></script>; */

// <!-- TODO: Add SDKs for Firebase products that you want to use
//      https://firebase.google.com/docs/web/setup#available-libraries -->

/* <script src="https://www.gstatic.com/firebasejs/8.6.5/firebase-analytics.js"></script> */

// <script>
//   // Your web app's Firebase configuration
//   // For Firebase JS SDK v7.20.0 and later, measurementId is optional

// import 'firebase/analytics';

const firebaseConfig = {
  apiKey: 'AIzaSyBuShrmPGgUNkNavmTqbNh8FvxBW460iIg',
  authDomain: 'golf-262b7.firebaseapp.com',
  projectId: 'golf-262b7',
  storageBucket: 'golf-262b7.appspot.com',
  messagingSenderId: '293197067826',
  appId: '1:293197067826:web:51b8bc246bcb8a60f3ae2b',
  measurementId: 'G-STRPL9SJ39',
};
//   // Initialize Firebase
firebase.initializeApp(firebaseConfig);
// firebase.analytics();
// </script>
export default { firebase };
