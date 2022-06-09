"use strict";

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";

import {
  getFirestore,
  collection,
  getDocs,
  setDoc,
  doc,
} from "https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js";

import {
  getAuth,
  createUserWithEmailAndPassword,
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

(() => {
  const data = localStorage.getItem("alex-covid-app.user");
  if (data) {
    window.location = "home.html";
  }
})();

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

$.validator.addMethod(
  "regex",
  function (value, element, regexp) {
    return this.optional(element) || regexp.test(value);
  },
  "Please check your input."
);

jQuery("#signup-form").validate({
  rules: {
    fname: {
      required: true,
      minlength: 3,
      regex: /^[A-Z][a-z0-9_-]{3,19}$/,
    },
    lname: {
      required: true,
      minlength: 3,
      regex: /^[A-Z][a-z0-9_-]{3,19}$/,
    },
    email: {
      email: true,
      required: true,
    },
    password: {
      required: true,
      minlength: 8,
      regex: /^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[0-9])(?=.*?\W).*$/,
    },
    confirm_password: {
      required: true,
      equalTo: "#password",
    },
  },
  messages: {
    fname: {
      required: "First name is required.",
      minlength: "First name should have at least 3 characters.",
      regex: "First character should be uppercase.",
    },
    lname: {
      required: "Last name is required.",
      minlength: "Last name should have at least 3 characters.",
      regex: "First character should be uppercase.",
    },
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
    confirm_password: {
      required: "Confirm password is required.",
      equalTo: "Enter a password matching the previous input field.",
    },
  },
});

$("#signup-form").submit(function (e) {
  e.preventDefault();

  if ($("#signup-form").valid()) {
    const fname = document.getElementById("fname").value;
    const lname = document.getElementById("lname").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    createUserWithEmailAndPassword(auth, email, password)
      .then(async ({ user }) => {
        const userId = user.uid;
        await setDoc(doc(db, "users", userId), {
          fname,
          lname,
          email,
          password,
        }).then(() => (window.location = "home.html"));
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(error);
      });
  }
});
