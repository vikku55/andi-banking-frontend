const API_USERS = "https://andi-banking-1827.onrender.com/api/users"; // backend port 5000

const tabs = document.querySelectorAll(".tab");
const content = document.getElementById("userContent");

// Function to get readable status
function getStatus(user) {
  if (user.is_banned) return "Banned";
  if (!user.is_email_verified) return "Email Unverified";
  if (!user.is_phone_verified) return "Phone Unverified";
  return "Verified";
}

// Function to fetch and display users
async function loadUsers(type, clickedTab = null) {
  // Highlight active tab
  tabs.forEach(tab => tab.classList.remove("active"));
  if (clickedTab) clickedTab.classList.add("active");

  // Show loading
  content.innerHTML = `<div class="loading">Loading ${type} users...</div>`;

  try {
    const res = await fetch(`${API_USERS}/${type}`); // ✅ Correct API URL
    const users = await res.json();

    if (!users || users.length === 0) {
      content.innerHTML = `<div class="loading">No ${type} users found.</div>`;
      return;
    }

    // Build table
   // Build table
let table = `<table class="user-table">
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>`;
users.forEach(u => {
  const status = getStatus(u);

  // Decide button text
  let actionBtn = "";
  if (u.is_banned) {
    actionBtn = `<button onclick="updateStatus(${u.id}, 'is_banned', 0)">Unban</button>`;
  } else {
    actionBtn = `<button onclick="updateStatus(${u.id}, 'is_banned', 1)">Ban</button>`;
  }

  if (!u.is_email_verified) {
    actionBtn += ` <button onclick="updateStatus(${u.id}, 'is_email_verified', 1)">Verify Email</button>`;
  }
  if (!u.is_phone_verified) {
    actionBtn += ` <button onclick="updateStatus(${u.id}, 'is_phone_verified', 1)">Verify Phone</button>`;
  }

  table += `<tr>
              <td>${u.id}</td>
              <td>${u.full_name}</td>
              <td>${u.email}</td>
              <td>${status}</td>
              <td>${actionBtn}</td>
            </tr>`;
});
table += `</table>`;


    content.innerHTML = table;
  } catch (err) {
    content.innerHTML = `<div class="loading">Error loading users: ${err.message}</div>`;
  }
}

// Attach click events
tabs.forEach(tab => {
  tab.addEventListener("click", () => {
    const type = tab.dataset.type;
    loadUsers(type, tab);
  });
});


async function updateStatus(id, field, value) {
  try {
    const res = await fetch(`${API_USERS}/update/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ field, value })
    });

    const data = await res.json();
    alert(data.message);

    // Reload table after update
    const activeTab = document.querySelector(".tab.active").dataset.type;
    loadUsers(activeTab, document.querySelector(".tab.active"));
  } catch (err) {
    alert("Error updating user: " + err.message);
  }
}

// Load all users initially
loadUsers("all", document.querySelector(".tab[data-type='all']"));
