let pendingOrders = [];
let todaysOrders = [];

function loadOrders() {
  fetch('php/fetch_orders.php')
    .then(response => response.json())
    .then(data => {
      const pendingTable = document.querySelector('#pendingOrdersTable tbody');
      const todaysTable = document.querySelector('#todaysOrdersTable tbody');
      pendingTable.innerHTML = '';
      todaysTable.innerHTML = '';

      pendingOrders = data.pending_orders;
      todaysOrders = data.todays_orders;

      // Populate Pending Orders
      pendingOrders.forEach(order => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${order.order_id}</td>
          <td>${order.name}</td>
          <td>${order.meal}</td>
          <td>${order.quantity}</td>
          <td>${order.price}</td>
          <td>${order.contact_number}</td>
          <td>${order.placed_time}</td>
          <td>${order.estimated_time}</td>
          <td class="status-${order.status.toLowerCase()}">${order.status}</td>
          <td>
            <a class="btn btn-update" href="php/update_order.php?status=Completed&order_id=${order.order_id}">Complete</a>
            <a class="btn btn-delete" href="php/delete_order.php?order_id=${order.order_id}" onclick="return confirm('Delete this order?')">Delete</a>
          </td>
        `;
        pendingTable.appendChild(row);
      });

      // Populate Today's Orders
      todaysOrders.forEach(order => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${order.order_id}</td>
          <td>${order.name}</td>
          <td>${order.meal}</td>
          <td>${order.quantity}</td>
          <td>${order.price}</td>
          <td>${order.contact_number}</td>
          <td>${order.placed_time}</td>
          <td>${order.estimated_time}</td>
          <td class="status-${order.status.toLowerCase()}">${order.status}</td>
        `;
        todaysTable.appendChild(row);
      });

      updateCounts(); // update counts after loading
    });
}

// Frontend JS changes: toggle table views and update counts
function updateCounts() {
  document.getElementById("showPendingBtn").textContent = `Pending Orders (${pendingOrders.length})`;
  document.getElementById("showTodayBtn").textContent = `Today's Orders (${todaysOrders.length})`;
}

document.getElementById("showPendingBtn").addEventListener("click", () => {
  document.getElementById("pendingOrdersSection").style.display = "block";
  document.getElementById("todaysOrdersSection").style.display = "none";
});

document.getElementById("showTodayBtn").addEventListener("click", () => {
  document.getElementById("todaysOrdersSection").style.display = "block";
  document.getElementById("pendingOrdersSection").style.display = "none";
});

// Load orders on page load
window.onload = loadOrders;
