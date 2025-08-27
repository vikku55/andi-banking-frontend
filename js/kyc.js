// document.addEventListener("DOMContentLoaded", () => {
    document.querySelector("form").addEventListener("submit", async function(e) {
    e.preventDefault();

    const user_id = document.getElementById("user_id").value.trim();
    const fullname = document.getElementById("fullname").value.trim();
    const aadhaar = document.getElementById("aadhaar").value.trim();
    const pan = document.getElementById("pan").value.trim();
    const document_path = document.getElementById("document").value.trim();

    const kycData = { user_id, fullname, aadhaar, pan, document_path };

    try {
        const res = await fetch("https://andi-banking-1827.onrender.com/api/kyc", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(kycData)
        });

        const data = await res.json();
        if (res.ok) {
            alert(data.message);
            document.querySelector("form").reset();
        } else {
            alert(data.message || "Error submitting KYC");
        }
    } catch (err) {
        console.error("Error:", err);
        alert("Something went wrong");
    }
});