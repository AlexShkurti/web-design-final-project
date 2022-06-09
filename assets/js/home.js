"use strict";

const user = JSON.parse(localStorage.getItem("alex-covid-app.user"));
(() => {
  if (!user) {
    window.location = "login.html";
  }
})();

$(".logout").click(() => {
  localStorage.removeItem("alex-covid-app.user");
});
