const API_BASE = "https://andi-banking-1827.onrender.com/api/admin/deposits";

async function fetchDeposits() {
  try {
    const res = await fetch(API_BASE);
    const deposits = await res.json();

    const table = document.getElementById("depositTable");
    table.innerHTML = "";

    deposits.forEach(dep => {
      table.innerHTML += `
        <tr>
          <td>${dep.id}</td>
          <td>${dep.full_name} (#${dep.user_id})</td>
          <td>${dep.amount}</td>
          <td>${dep.method}</td>
          <td>
            <select onchange="updateStatus(${dep.id}, this.value)">
              <option value="pending" ${dep.status === "pending" ? "selected" : ""}>Pending</option>
              <option value="approved" ${dep.status === "approved" ? "selected" : ""}>Approved</option>
              <option value="rejected" ${dep.status === "rejected" ? "selected" : ""}>Rejected</option>
            </select>
          </td>
          <td>${new Date(dep.created_at).toLocaleString()}</td>
          <td><button onclick="updateStatus(${dep.id}, document.querySelector('[onchange=\"updateStatus(${dep.id}, this.value)\"]').value)">Update</button></td>
        </tr>
      `;
    });
  } catch (err) {
    console.error("Error fetching deposits:", err);
  }
}

async function updateStatus(id, status) {
  try {
    await fetch(`${API_BASE}/${id}/status`, {   // ✅ include /status
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status })
    });
    alert("Status updated!");
    fetchDeposits();
  } catch (err) {
    console.error("Error updating status:", err);
  }
}


fetchDeposits();
