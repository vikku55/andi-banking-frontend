const API_BASE = "https://andi-banking-1827.onrender.com/api/transactions";
const tbody = document.getElementById("transactionList");

document.addEventListener("DOMContentLoaded", loadTransactions);

async function loadTransactions() {
  tbody.innerHTML = "";
  try {
    const res = await fetch(API_BASE);
    const transactions = await res.json();

    if (!Array.isArray(transactions)) {
      console.error("Invalid response:", transactions);
      tbody.innerHTML = `<tr><td colspan="8">Error loading data</td></tr>`;
      return;
    }

    if (transactions.length === 0) {
      tbody.innerHTML = `<tr><td colspan="8">No Data Available</td></tr>`;
      return;
    }

    transactions.forEach(tx => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${tx.full_name}</td>
        <td>${tx.bank_name}</td>
        <td>${tx.amount}</td>
        <td>${tx.charge}</td>
        <td>${tx.account}</td>
        <td>${new Date(tx.trx_time).toLocaleString()}</td>
        <td>${tx.processing_time || "N/A"}</td>
        <td class="status-${tx.status.toLowerCase()}">${tx.status}</td>
      `;
      tbody.appendChild(row);
    });
  } catch (err) {
    console.error("Error loading transactions:", err);
    tbody.innerHTML = `<tr><td colspan="8">Server Error</td></tr>`;
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