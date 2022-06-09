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

let obj;

const xValues = [
  "Population",
  "Cases",
  "Deaths",
  "Recovered",
  "Tests",
  "Critical",
];
let myChart;
let yValues = [];
const barColors = ["red", "green", "blue", "orange", "brown", "pink"];

function handleHover(evt, item, legend) {
  legend.chart.data.datasets[0].backgroundColor.forEach(
    (color, index, colors) => {
      colors[index] =
        index === item.index || color.length === 9 ? color : color + "4D";
    }
  );
  legend.chart.update();
}

function handleLeave(evt, item, legend) {
  legend.chart.data.datasets[0].backgroundColor.forEach(
    (color, index, colors) => {
      colors[index] = color.length === 9 ? color.slice(0, -2) : color;
    }
  );
  legend.chart.update();
}

fetch("https://corona.lmao.ninja/v2/all?yesterday")
  .then((res) => res.json())
  .then((data) => (obj = data))
  .then(() => {
    myChart = new Chart("myChart", {
      type: "bar",
      data: {
        labels: xValues,
        datasets: [
          {
            label: xValues[0],
            backgroundColor: barColors,
            data: [
              obj.population,
              obj.cases,
              obj.deaths,
              obj.recovered,
              obj.tests,
              obj.critical,
            ],
          },
        ],
      },
      options: {
        responsive: true,
        title: {
          display: true,
          text: "COVID-19 Global Information",
        },
        legend: {
          onHover: handleHover,
          onLeave: handleLeave,
          display: false,
        },
      },
    });
  });
