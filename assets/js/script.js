const API_KEY = "3X3PMnklqc66kDV2zAIbqvMSpWo";
const API_URL = "https://ci-jshint.herokuapp.com/api";
const resultsModal = new bootstrap.Modal(document.getElementById("resultsModal"));

// Get status button
document.getElementById("status").addEventListener("click", e => getStatus(e));
// Wire up our Run Checks button
document.getElementById("submit").addEventListener("click", e => postForm(e));

// Create postForm
async function postForm(e) {

   const form = new FormData(document.getElementById("checksform"));

   const response = await fetch(API_URL, {
       method: "POST",
       headers: {
           "Authorization": API_KEY,
       },
       body: form,
   });

}
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

