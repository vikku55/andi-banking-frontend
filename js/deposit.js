document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");

    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        const user_id = document.getElementById("user_id").value.trim();
        const amount = document.getElementById("amount").value.trim();
        const method = document.getElementById("method").value;

        if (!user_id || !amount || !method) {
            alert("All fields are required");
            return;
        }

        try {
            const res = await fetch("https://andi-banking-1827.onrender.com/api/deposits/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ user_id, amount, method })
            });

            const data = await res.json();

            if (res.ok) {
                alert(data.message);
                form.reset();
            } else {
                alert(`Error: ${data.message}`);
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Something went wrong. Please try again later.");
        }
    });
});
