"use strict";

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";

import { getFirestore } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js";

import {
  getAuth,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAGOvkm__7cvtDSUI1uWMcbHcaoo_sNTb8",
  authDomain: "web-project-9a7a2.firebaseapp.com",
  projectId: "web-project-9a7a2",
  storageBucket: "web-project-9a7a2.appspot.com",
  messagingSenderId: "239316301410",
  appId: "1:239316301410:web:17505c7642e5b04663433b",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

(() => {
  const data = localStorage.getItem("alex-covid-app.user");
  if (data) {
    window.location = "home.html";
  }
})();

$.validator.addMethod(
  "regex",
  function (value, element, regexp) {
    return this.optional(element) || regexp.test(value);
  },
  "Please check your input."
);

jQuery("#login-form").validate({
  rules: {
    email: {
      email: true,
      required: true,
    },
    password: {
      required: true,
      minlength: 8,
      regex: /^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[0-9])(?=.*?\W).*$/,
    },
  },
  messages: {
    email: {
      required: "Email is required.",
      email: "Please enter a valid email address.",
    },
    password: {
      required: "Password is required.",
      minlength: "Enter a password with at least 8 characters.",
      regex:
        "Your password must contain a symbol, number, uppercase letter and lowercase letter.",
    },
  },
});

$("#login-form").submit(function (e) {
  e.preventDefault();

  if ($("#login-form").valid()) {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        localStorage.setItem(
          "alex-covid-app.user",
          JSON.stringify(email, password)
        );
        window.location = "home.html";
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(error);
        // ..
      });
  }
});
