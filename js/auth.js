// auth.js
// Usage: include on login.html and register.html

const API_BASE = "https://andi-banking-1827.onrender.com/api"; // change if different

// --- Register (signup) ---
async function registerUser(e) {
  e.preventDefault();
  const full_name = document.querySelector("#name").value; // id is still name
  const email = document.querySelector("#email").value;
  const phone = document.querySelector("#phone").value;
  const password = document.querySelector("#password").value;

  try {
    const res = await fetch(`${API_BASE}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ full_name, email, phone, password })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Register failed");
    alert("Registration successful. Please login.");
    window.location.href = "login.html";
  } catch (err) {
    alert(err.message);
  }
}

// --- Login (user) ---
async function loginUser(e) {
  e.preventDefault();
  const email = document.querySelector("#email").value;
  const password = document.querySelector("#password").value;

  try {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Login failed");

    // Save token + role
    localStorage.setItem("token", data.token);
    localStorage.setItem("role", data.role || "user");

    // redirect based on role
    if ((data.role || "user") === "admin") {
      window.location.href = "admin-dashboard.html";
    } else {
      window.location.href = "user-dashboard.html";
    }
  } catch (err) {
    alert(err.message);
  }
}

// --- Admin login (optional separate form) ---
async function loginAdmin(e) {
  e.preventDefault();
  const email = document.querySelector("#email").value;
  const password = document.querySelector("#password").value;

  try {
    const res = await fetch(`${API_BASE}/auth/admin/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Login failed");

    localStorage.setItem("token", data.token);
    localStorage.setItem("role", data.role || "admin");
    window.location.href = "admin-dashboard.html";
  } catch (err) {
    alert(err.message);
  }
}
 

