
  const API_BASE = "https://andi-banking-1827.onrender.com/api/banks"; // backend URL
  const bankList = document.getElementById('bankList');
  const modal = document.getElementById('bankModal');

  // Load banks from backend
  document.addEventListener("DOMContentLoaded", loadBanks);

  async function loadBanks() {
    bankList.innerHTML = "";
    try {
      const res = await fetch(API_BASE);
      const banks = await res.json();
      banks.forEach(bank => renderBankCard(bank));
    } catch (err) {
      console.error("Error loading banks:", err);
    }
  }

  function openModal() { modal.style.display = 'flex'; }
  function closeModal() { modal.style.display = 'none'; }

  async function createBank() {
    const bank = {
      name: document.getElementById('bankName').value,
      min_amount: document.getElementById('minAmount').value,
      max_amount: document.getElementById('maxAmount').value,
      fixed_charge: document.getElementById('fixedCharge').value,
      percent_charge: document.getElementById('percentCharge').value,
      processing_time: document.getElementById('processingTime').value,
      status: document.getElementById('status').value
    };

    try {
      const res = await fetch(API_BASE, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bank)
      });
      if (res.ok) {
        closeModal();
        loadBanks(); // reload list after adding
      }
    } catch (err) {
      console.error("Error creating bank:", err);
    }
  }

  async function updateBank(id, updatedBank) {
    try {
      const res = await fetch(`${API_BASE}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedBank)
      });
      if (res.ok) loadBanks();
    } catch (err) {
      console.error("Error updating bank:", err);
    }
  }

  async function deleteBank(id) {
    try {
      const res = await fetch(`${API_BASE}/${id}`, { method: "DELETE" });
      if (res.ok) loadBanks();
    } catch (err) {
      console.error("Error deleting bank:", err);
    }
  }

function renderBankCard(bank) {
  const card = document.createElement('div');
  card.classList.add('bank-card');
  card.innerHTML = `
    <h3>${bank.name}</h3>
    <p><b>Transaction Limit:</b> ${bank.min_amount || 0} - ${bank.max_amount || 0} INR</p>
    <p><b>Charge:</b> ${bank.fixed_charge || 0} INR + ${bank.percent_charge || 0}%</p>
    <p><b>Processing:</b> ${bank.processing_time || "N/A"}</p>
    <label>Status</label>
    <select>
      <option ${bank.status==="Active" ? "selected" : ""}>Active</option>
      <option ${bank.status==="Inactive" ? "selected" : ""}>Inactive</option>
    </select>
    <button class="btn btn-blue">Details</button>
    <button class="btn btn-green">Update</button>
    <button class="btn btn-red">Delete</button>
  `;

  // Attach events
  const select = card.querySelector("select");
  select.addEventListener("change", e => {
    updateBank(bank.id, { status: e.target.value });
  });

  const detailsBtn = card.querySelector(".btn-blue");
  detailsBtn.addEventListener("click", () => {
    alert(`
      Bank: ${bank.name}
      Limit: ${bank.min_amount || 0} - ${bank.max_amount || 0}
      Charge: ${bank.fixed_charge || 0} INR + ${bank.percent_charge || 0}%
      Processing: ${bank.processing_time || "N/A"}
      Status: ${bank.status}
    `);
  });

  const updateBtn = card.querySelector(".btn-green");
  updateBtn.addEventListener("click", () => {
    updateBank(bank.id, bank);  // you can enhance this to open modal for editing
  });

  const deleteBtn = card.querySelector(".btn-red");
  deleteBtn.addEventListener("click", () => {
    deleteBank(bank.id);
  });

  bankList.appendChild(card);
}
