var corsApiUrl = "https://cors-anywhere.herokuapp.com/";
// TODO: REPLACE YOUR TOKEN
var apiToken = "?token=vIhThpOoHPRSNSfg30iZ8VUkTJ_yNrIwLuwkrn0MqC4";

var caps = false;
var full = false;

// CORS stands for "cross origin resource sharing" -- you'll be making http requests in order
// DON'T CHANGE THIS: fetches the data from the API endpoint
const doCORSRequest = (options) => {
  var x = new XMLHttpRequest();
  x.open("GET", corsApiUrl + options.url);
  x.send(options.data);
  return x;
};

// Example promise that executes the GET request above and waits for it to finish before resolving
const corsPromise = () =>
  new Promise((resolve, reject) => {
    const request = doCORSRequest({
      url: "https://trefle.io/api/v1/families" + apiToken,
    });
    resolve(request);
  });

// THIS IS SOME SAMPLE CODE FOR HOW TO USE PROMISES -- feel free to adapt this into a function!
corsPromise().then(
  (request) =>
  (request.onload = request.onerror = function() {
    // TODO: ADD FUNCTION, ETC. FOR WHATEVER YOU WANT TO DO ONCE THE DATA IS RECEIVED
    families = JSON.parse(request.response).data
    makeTable(families)
    document.getElementById('caps').onclick = function(event) {
      caps = !caps;
      makeTable(families)
    }
    document.getElementById('full').onclick = function(event) {
      full = !full;
      makeTable(families)
    }
  })
);

function tableRow(family) {
  return `
  <tr>
    <td>${family.common_name ? family.common_name : ""}</td>
    <td>${family.name}</td>
    <td>${(family.division_order) ? family.division_order.name : ""}</td>
  </tr>
  `
}

function makeTable(families) {
  if (caps) {
    families = families.map(function(family) {
      return {
        common_name: family.common_name,
        name: family.name.toUpperCase(),
        division_order: family.division_order,
      }
    })
  }

  if (full) {
    families = families.filter(function(family) {
      return family.common_name && family.name && family.division_order;
    })
  }

  var table = document.getElementById('table');
  var old_tbody = table.getElementsByTagName('tbody')[0];
  var new_tbody = document.createElement('tbody');

  families.forEach((family, _) => {
    var row = new_tbody.insertRow(new_tbody.rows.length);
    row.innerHTML = tableRow(family)
  });

  old_tbody.parentNode.replaceChild(new_tbody, old_tbody);
}

//// TODO: ADD WHATEVER FUN CONTENT YOU WANT ////
