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
   // test
   // for (let e of form.entries()) {
   //    console.log(e);
   // }
   const response = await fetch(API_URL, {
       method: "POST",
       headers: {
           "Authorization": API_KEY,
       },
       body: form,
   });
   // test
   // if(response.ok) {
      // console.log(data);
   // } else {
   //    throw new Error(data.error);
   // }
   const data = await response.json();

    if (response.ok) {
        displayErrors(data);
    } else {
        throw new Error(data.error);
    }

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
}


function displayErrors(data) {
   
   let results = "";
   let heading = `JSHint Results for ${data.file}`;

   if (data.total_errors === 0) {
      results = `<div class="no_errors">No errors reported!</div>`;
  } else {
      results = `<div>Total Errors: <span class="error_count">${data.total_errors}</span></div>`;
      for (let error of data.error_list) {
          results += `<div>At line <span class="line">${error.line}</span>, `;
          results += `column <span class="column">${error.col}:</span></div>`;
          results += `<div class="error">${error.error}</div>`;
      }
  }

    document.getElementById("resultsModalTitle").innerText = heading;
    document.getElementById("results-content").innerHTML = results;
    resultsModal.show();
}


function displayStatus(data) {
    let heading = "API Key Status";
    let results = `<div>Your key is valid until</div>`;
    results += `<div class="key-status">${data.expiry}</div>`;

    document.getElementById("resultsModalTitle").innerText = heading;
    document.getElementById("results-content").innerHTML = results;
    resultsModal.show();
}




