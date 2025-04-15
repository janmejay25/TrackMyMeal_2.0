function loadOrders() {
    fetch('php/fetch_orders.php')
    .then(response => response.json())
    .then(data => {
        const pendingTable = document.querySelector('#pendingOrdersTable tbody');
        const todaysTable = document.querySelector('#todaysOrdersTable tbody');
        pendingTable.innerHTML = '';
        todaysTable.innerHTML = '';

        // Populate Pending Orders
        data.pending_orders.forEach(order => {
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
        data.todays_orders.forEach(order => {
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
        
    });
}

// Load orders on page load
window.onload = loadOrders;
