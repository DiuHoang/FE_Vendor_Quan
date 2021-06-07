import firebase from 'firebase/app';
import 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyDtFYLr4Puy5ww656BaljR7eFO1Uhd6nZ4",
    authDomain: "queenparty-6017e.firebaseapp.com",
    projectId: "queenparty-6017e",
    storageBucket: "queenparty-6017e.appspot.com",
    messagingSenderId: "191175710331"
  };

  firebase.initializeApp(firebaseConfig);

  const storage =  firebase.storage();

  export{
      storage, firebase as default
  }