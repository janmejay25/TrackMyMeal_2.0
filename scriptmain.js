let countdownInterval;

function fetchOrder() {
  const orderId = document.getElementById("order_id").value;
  const contactNumber = document.getElementById("contact_number").value;

  if (!orderId || !contactNumber) {
    alert("Please enter both Order ID and Contact Number.");
    return;
  }

  fetch("search_order.php", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `order_id=${orderId}&contact_number=${contactNumber}`
  })
  .then(response => response.json())
  .then(data => {
    if (data.status === 'success') {
      const order = data.order;

      document.getElementById("orderDetails").style.display = "block";
      document.getElementById("orderId").innerText = "Order ID: " + order.order_id;
      document.getElementById("name").innerText = "Name: " + order.name;
      document.getElementById("meal").innerText = "Meal: " + order.meal;
      document.getElementById("quantity").innerText = "Quantity: " + order.quantity;
      document.getElementById("restaurant").innerText = "Restaurant: " + order.restaurant;
      document.getElementById("contact_number").innerText = "Contact: " + order.contact_number;
      document.getElementById("price").innerText = "Price: ₹" + order.price;


      startCountdown(order.placed_time, order.estimated_time);
    } else {
      alert(data.message);
    }
  })
  .catch(err => {
    console.error(err);
    alert("An error occurred while fetching order details.");
  });
}

function startCountdown(placedTime, estimatedMinutes) {
  clearInterval(countdownInterval);

  const placedDate = new Date(placedTime);
  const totalSeconds = estimatedMinutes * 60;

  function updateTimer() {
    const now = new Date();
    const elapsedSeconds = Math.floor((now - placedDate) / 1000);
    let remainingSeconds = totalSeconds - elapsedSeconds;

    if (remainingSeconds < 0) remainingSeconds = 0;

    const mins = Math.floor(remainingSeconds / 60).toString().padStart(2, '0');
    const secs = (remainingSeconds % 60).toString().padStart(2, '0');

    document.getElementById('timeText').innerHTML = `${mins}:${secs}`;

    if (remainingSeconds <= 0) {
      clearInterval(countdownInterval);
    }
  }

  updateTimer();
  countdownInterval = setInterval(updateTimer, 1000);
}
