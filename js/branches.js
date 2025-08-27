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
          <td><button class="delete-btn" onclick="deleteBranch(${branch.id})">Delete</button></td>
        </tr>
      `;
      tbody.insertAdjacentHTML("beforeend", row);
    });
  } catch (err) {
    console.error("Error fetching branches:", err);
  }
}


// Add a new branch
document.getElementById("branchForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const branchData = {
    name: document.getElementById("name").value,
    address: document.getElementById("address").value,
    city: document.getElementById("city").value,
    state: document.getElementById("state").value,
    zip_code: document.getElementById("zip").value,
  };

  try {
    const res = await fetch(`${API_BASE}/create`, {   // ✅ correct endpoint
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(branchData)
    });

    const data = await res.json();
    alert(data.message);
    fetchBranches();
    e.target.reset();
  } catch (err) {
    console.error("Error adding branch:", err);
  }
});

// Delete branch
async function deleteBranch(id) {
  if (!confirm("Are you sure you want to delete this branch?")) return;

  try {
    const res = await fetch(`${API_BASE}/delete/${id}`, { method: "DELETE" });  // ✅ correct endpoint
    const data = await res.json();
    alert(data.message);
    fetchBranches();
  } catch (err) {
    console.error("Error deleting branch:", err);
  }
}


document.addEventListener("DOMContentLoaded", fetchBranches);
