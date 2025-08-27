// check-auth-user.js
(function () {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  if (!token || role !== "user") {
    // optionally clear
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    window.location.href = "login.html";
  }
})();
