
    async function fetchKycRequests() {
      const res = await fetch("https://andi-banking-1827.onrender.com/api/admin/kyc");
      const data = await res.json();
      const tbody = document.getElementById("kycTableBody");
      tbody.innerHTML = "";

      data.forEach(req => {
        const tr = document.createElement("tr");

        tr.innerHTML = `
          <td>${req.id}</td>
          <td>${req.user_name} (${req.email})</td>
          <td>${req.aadhaar}</td>
          <td>${req.pan}</td>
          <td><a href="${req.document_path}" target="_blank">View</a></td>
          <td>${req.status}</td>
          <td>
            <select id="status-${req.id}">
              <option value="pending" ${req.status === "pending" ? "selected" : ""}>Pending</option>
              <option value="approved" ${req.status === "approved" ? "selected" : ""}>Approved</option>
              <option value="rejected" ${req.status === "rejected" ? "selected" : ""}>Rejected</option>
            </select>
            <button onclick="updateStatus(${req.id})">Update</button>
          </td>
        `;

        tbody.appendChild(tr);
      });
    }

    async function updateStatus(id) {
      const status = document.getElementById(`status-${id}`).value;
      await fetch(`https://andi-banking-1827.onrender.com/api/admin/kyc/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status })
      });
      fetchKycRequests();
    }

    fetchKycRequests();
  