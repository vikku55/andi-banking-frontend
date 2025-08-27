async function fetchDashboardStats() {
  try {
    const res = await fetch("https://andi-banking-1827.onrender.com/api/stats");
    const data = await res.json();

    // Users
    document.querySelector("#totalUsers span").innerText = data.users.total;
    document.querySelector("#bannedUsers span").innerText = data.users.banned;
    document.querySelector("#emailUnvarified span").innerText = data.users.emailUnverified;
    document.querySelector("#phoneUnvarified span").innerText = data.users.phoneUnverified;

    // Finance
    document.querySelector("#depositWallet span").innerText = data.finance.depositWallet + " INR";
    document.querySelector("#interestWallet span").innerText = data.finance.interestWallet + " INR";

    // Deposits
    document.querySelector("#depositCount span").innerText = data.deposits.count;
    document.querySelector("#depositAmount span").innerText = data.deposits.amount + " INR";
    document.querySelector("#depositCharges span").innerText = data.deposits.charges + " INR";

    // Transactions
    document.querySelector("#transactionCount span").innerText = data.transactions.count;
    document.querySelector("#transactionAmount span").innerText = data.transactions.amount + " INR";
    document.querySelector("#transactionCharges span").innerText = data.transactions.charges + " INR";
    

    // Withdraws
    document.querySelector("#withdrawCount span").innerText = data.totalWithdraws.count;
    document.querySelector("#withdrawAmount span").innerText = data.withdraws.amount + " INR";
    document.querySelector("#withdrawCharges span").innerText = data.withdraws.charges + " INR";
    document.querySelector("#withdrawApproved span").innerText = data.withdraws.count;
    document.querySelector("#withdrawPending span").innerText = data.pendingWithdraws.count;
    document.querySelector("#withdrawRejected span").innerText = data.rejectedWithdraws.count;

  } catch (error) {
    console.error("Error fetching stats:", error);
  }
}

// Call it on page load
fetchDashboardStats();
setInterval(fetchDashboardStats, 10000); // optional auto-refresh


// for dropdown

document.querySelectorAll(".dropdown-btn").forEach(btn => {
  btn.addEventListener("click", function(e) {
    e.preventDefault();
    let dropdown = this.nextElementSibling;

    if (dropdown.style.display === "block") {
      dropdown.style.display = "none";
    } else {
      dropdown.style.display = "block";
    }
  });
});


function toggleDropdown(el) {
  const parent = el.parentElement;
  parent.classList.toggle("open");
}
