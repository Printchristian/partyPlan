const app = document.getElementById("app");
const API_URL = "https://fsa-crud-2aa9294fe819.herokuapp.com/api/2306-FTB-ET-WEB-PT/events";

let parties = [];
let selectedParty = null;

async function fetchParties() {
try {
const response = await fetch(API_URL);
const json = await response.json();
parties = json.data;
renderPartyList();
} catch (error) {
app.textContent = "Error loading parties.";
console.error(error);
}
}

function renderPartyList() {
app.innerHTML = "<h2>Upcoming Parties</h2>";
const ul = document.createElement("ul");

parties.forEach(party => {
const li = document.createElement("li");
li.textContent = party.name;

li.addEventListener("click", () => {
fetchPartyDetails(party.id);
});
ul.appendChild(li);
});

app.appendChild(ul);
}

async function fetchPartyDetails(id) {
try {
const response = await fetch(`${API_URL}/${id}`);
const json = await response.json();
selectedParty = json.data;
renderPartyDetails();
} catch (error) {
app.textContent = "Error loading party details.";
console.error(error);
}
}

function renderPartyDetails() {
const div = document.createElement("div");
div.innerHTML = `
<h3>${selectedParty.name}</h3>
<p><strong>Date:</strong> ${selectedParty.date}</p>
<p><strong>Location:</strong> ${selectedParty.location}</p>
<p><strong>Description:</strong> ${selectedParty.description}</p>
<button id="back">Back to list</button>
`;

app.innerHTML = "";
app.appendChild(div);

document.getElementById("back").addEventListener("click", () => {
renderPartyList();
});
}

fetchParties();