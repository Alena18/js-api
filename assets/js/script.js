const API_KEY = "3X3PMnklqc66kDV2zAIbqvMSpWo";
const API_URL = "https://ci-jshint.herokuapp.com/api";
const resultsModal = new bootstrap.Modal(document.getElementById("resultsModal"));

document.getElementById("status").addEventListener("click", e => getStatus(e));

// Create a promise
async function getStatus(e) {
   const queryString = `${API_URL}?api_key=${API_KEY}`;

   const response = await fetch(queryString);

   const data = await response.json();

   if (response.ok) {
      //console.log(data);  // or data.expire to see expiry date
      displayStatus(data);
   } else {
      throw new Error(data.error);
   }
};

function displayStatus(data) {
    let heading = "API Key Status";
    let results = `<div>Your key is valid until</div>`;
    results += `<div class="key-status">${data.expiry}</div>`;

    document.getElementById("resultsModalTitle").innerText = heading;
    document.getElementById("results-content").innerHTML = results;
    resultsModal.show();
}
