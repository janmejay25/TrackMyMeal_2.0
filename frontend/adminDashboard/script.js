// Sample data for simulation
const pendingOrders = [
    { id: 1, name: "Amit", meal: "Pizza", qty: 2, price: 300, contact: "9876543210", placed: "12:00", eta: 30, status: "Preparing" },
    { id: 2, name: "Sara", meal: "Burger", qty: 1, price: 150, contact: "9998887776", placed: "12:15", eta: 20, status: "Preparing" }
  ];
  
  const todaysOrders = [
    { id: 3, name: "Ravi", meal: "Biryani", qty: 1, price: 250, contact: "9876543210", placed: "11:00", eta: 25, status: "Delivered" }
  ];
  
  function renderTable(data, tableId) {
    const tbody = document.querySelector(`#${tableId} tbody`);
    tbody.innerHTML = "";
    data.forEach(order => {
      const row = document.createElement("tr");
      for (let key in order) {
        const td = document.createElement("td");
        td.textContent = order[key];
        row.appendChild(td);
      }
      if (tableId === "pendingOrdersTable") {
        const actionTd = document.createElement("td");
        actionTd.innerHTML = `<button onclick="alert('Marking complete for ${order.name}')">Complete</button>`;
        row.appendChild(actionTd);
      }
      tbody.appendChild(row);
    });
  }
  
  function updateCounts() {
    document.getElementById("showPendingBtn").textContent = `Pending Orders (${pendingOrders.length})`;
    document.getElementById("showTodayBtn").textContent = `Today's Orders (${todaysOrders.length})`;
  }
  
  document.getElementById("showPendingBtn").addEventListener("click", () => {
    document.getElementById("pendingOrdersSection").style.display = "block";
    document.getElementById("todaysOrdersSection").style.display = "none";
    renderTable(pendingOrders, "pendingOrdersTable");
    updateCounts();
  });
  
  document.getElementById("showTodayBtn").addEventListener("click", () => {
    document.getElementById("todaysOrdersSection").style.display = "block";
    document.getElementById("pendingOrdersSection").style.display = "none";
    renderTable(todaysOrders, "todaysOrdersTable");
    updateCounts();
  });
  
  // Initial count setup
  updateCounts();
  