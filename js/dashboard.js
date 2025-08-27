document.addEventListener("DOMContentLoaded", async () => {
    const userId = 1; // yahan apne logged-in user ka ID lagao

    try {
        const res = await fetch(`https://andi-banking-1827.onrender.com/api/user-stats/${userId}`);
        const data = await res.json();

        document.getElementById("current-balance").innerText = data.currentBalance;
        document.getElementById("total-deposited").innerText = data.totalDeposited;
        document.getElementById("total-transactions").innerText = data.totalTransactions;
        document.getElementById("pending-bank").innerText = data.pendingOtherBanks ?? 0;
        document.getElementById("total-withdrawal").innerText = data.totalWithdrawals ?? 0;
        document.getElementById("withdraw-pending").innerText = data.pendingWithdrawals ?? 0;

    } catch (err) {
        console.error("Error fetching stats:", err);
    }
});



