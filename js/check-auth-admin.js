// check-auth-admin.js
(function () {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  if (!token || role !== "admin") {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    window.location.href = "admin-login.html";
  }
})();
