document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("withdrawForm");

    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        const user_id = document.getElementById("user_id").value.trim();
        const amount = document.getElementById("amount").value.trim();
        const method = document.getElementById("method").value;

        if (!user_id || !amount || !method) {
            alert("All fields are required!");
            return;
        }

        try {
            const res = await fetch("https://andi-banking-1827.onrender.com/api/withdrawals/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ user_id, amount, method })
            });

            const data = await res.json();

            if (res.ok) {
                alert(data.message || "Withdrawal request submitted!");
                form.reset();
            } else {
                alert(`Error: ${data.message || "Failed to submit request"}`);
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Something went wrong. Please try again later.");
        }
    });
});
