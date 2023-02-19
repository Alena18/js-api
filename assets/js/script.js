const API_KEY = "3X3PMnklqc66kDV2zAIbqvMSpWo";
const API_URL = "https://ci-jshint.herokuapp.com/api?api_key";
const resultsModal = new bootstrap.Modal(document.getElementById("resultsModal"));

document.getElementById("status").addEventListener("click", e => getStatus(e));

// Create a promise
async function getStatus(e) {
   const queryString = `${API_URL}?api_key=${API_KEY}`;

   const response = await fetch(queryString);

   const data = await response.json();

   if (response.ok) {
      console.log(data);
   };
};
