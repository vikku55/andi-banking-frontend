// js/branches.js

// Run when page loads
document.addEventListener("DOMContentLoaded", () => {
  fetchBranches();
});

// Function to fetch and display all branches
const API_BASE = "https://andi-banking-1827.onrender.com/api/branches";

// Fetch branches
async function fetchBranches() {
  try {
    const res = await fetch(`${API_BASE}/all`);
    const branches = await res.json();
    console.log("Fetched branches:", branches);  // 👈 Debug here
    
    const tbody = document.querySelector("#branchesTable tbody");
    tbody.innerHTML = "";

    branches.forEach(branch => {
      const row = `
        <tr>
          <td>${branch.id}</td>
          <td>${branch.name}</td>
          <td>${branch.address}</td>
          <td>${branch.city || ""}</td>
          <td>${branch.state || ""}</td>
          <td>${branch.zip_code || ""}</td>
          
        </tr>
      `;
      tbody.insertAdjacentHTML("beforeend", row);
    });
  } catch (err) {
    console.error("Error fetching branches:", err);
  }
}