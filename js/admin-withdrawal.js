const API_BASE = "https://andi-banking-1827.onrender.com/api/withdrawals";
const tbody = document.getElementById("withdrawalList");

document.addEventListener("DOMContentLoaded", loadWithdrawals);

async function loadWithdrawals() {
  tbody.innerHTML = "";
  try {
    const res = await fetch(API_BASE);
    const withdrawals = await res.json();

    if (withdrawals.length === 0) {
      tbody.innerHTML = `<tr><td colspan="7">No Data Available</td></tr>`;
      return;
    }

    withdrawals.forEach(w => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${w.full_name}</td>
        <td>${w.amount}</td>
        <td>${w.method || "N/A"}</td>
        <td>${w.charge}</td>
        <td>${new Date(w.created_at).toLocaleString()}</td>
        <td class="status-${w.status.toLowerCase()}">${w.status}</td>
        <td>
          <select onchange="updateStatus(${w.id}, this.value)">
            <option value="pending" ${w.status === "pending" ? "selected" : ""}>Pending</option>
            <option value="approved" ${w.status === "approved" ? "selected" : ""}>Approved</option>
            <option value="rejected" ${w.status === "rejected" ? "selected" : ""}>Rejected</option>
          </select>
        </td>
      `;
      tbody.appendChild(row);
    });
  } catch (err) {
    console.error("Error loading withdrawals:", err);
  }
}

async function updateStatus(id, status) {
  try {
    await fetch(`${API_BASE}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status })
    });
    loadWithdrawals(); // reload after update
  } catch (err) {
    console.error("Error updating withdrawal status:", err);
  }
}
