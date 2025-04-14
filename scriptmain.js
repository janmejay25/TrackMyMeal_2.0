function fetchOrder() {
  const orderId = document.getElementById("order_id").value;
  const contactNo = document.getElementById("contact_no").value;

  

//code

  fetch("search_order.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: `order_id=${orderId}&contact_no=${contactNo}`
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
      document.getElementById("contact").innerText = "Contact: " + order.contact;

      startTimer(order.placed_time, order.estimated_time);
    } else {
      alert(data.message);
    }
  })
  .catch(err => {
    console.error(err);
    alert("An error occurred while fetching order details.");
  });
}

function startTimer(placedTime, estimatedTime) {
  const placedDate = new Date(placedTime);
  const endDate = new Date(placedDate.getTime() + estimatedTime * 60000);

  document.getElementById("timer").style.display = "block";

  const interval = setInterval(() => {
    const now = new Date();
    const diff = endDate - now;

    if (diff <= 0) {
      clearInterval(interval);
      document.getElementById("time").innerText = "Order is Ready!";
    } else {
      const mins = Math.floor(diff / 60000);
      const secs = Math.floor((diff % 60000) / 1000);
      document.getElementById("time").innerText = `${mins}m ${secs}s`;
    }
  }, 1000);
}

//new tcountdown code merge 
let countdownInterval;

function fetchAndStartCountdown() {
  clearInterval(countdownInterval);
  
  const orderId = document.getElementById('order_id').value;  // Corrected line!
  if (!orderId) {
    alert("Enter a valid order ID.");
    return;
  }

  fetch('get_remaining_time.php?order_id=' + orderId)
    .then(response => response.json())
    .then(data => {
      if (data.error) {
        alert(data.error);
        return;
      }
      startCountdown(data.remaining_seconds, data.total_estimated_seconds);
    })
    .catch(error => {
      console.error("Error fetching remaining time:", error);
    });
}

function startCountdown(remainingSeconds, totalSeconds) {
const circle = document.getElementById('progress');
const radius = 90;
const circumference = 2 * Math.PI * radius;
circle.style.strokeDasharray = circumference;

document.getElementById('countdown-container').style.display = 'block';

const endTime = new Date().getTime() + (remainingSeconds * 1000);

function formatTime(seconds) {
const mins = Math.floor(seconds / 60);
const secs = seconds % 60;
return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

function updateTimer() {
const now = new Date().getTime();
let secondsLeft = Math.round((endTime - now) / 1000);

if (secondsLeft < 0) secondsLeft = 0;

document.getElementById('timeText').innerHTML = formatTime(secondsLeft);

// important: use totalSeconds (full estimated time)
const offset = circumference - (secondsLeft / totalSeconds) * circumference;
circle.style.strokeDashoffset = offset;

if (secondsLeft <= 0) {
  clearInterval(countdownInterval);
  document.getElementById('timeText').innerHTML = '00:00';
}
}

updateTimer();
countdownInterval = setInterval(updateTimer, 1000);
}


// countdown 
// let countdownInterval;

//     function startCountdown() {
//       clearInterval(countdownInterval); // reset previous timer
//       const inputMinutes = parseInt(document.getElementById('minutes').value);
//       if (!inputMinutes || inputMinutes <= 0) {
//         alert("Enter a valid number of minutes.");
//         return;
//       }

//       const totalSeconds = inputMinutes * 60;
//       let remainingSeconds = totalSeconds;

//       document.getElementById('countdown-container').style.display = 'block';

//       const circle = document.getElementById('progress');
//       const radius = 90;
//       const circumference = 2 * Math.PI * radius;
//       circle.style.strokeDasharray = circumference;
//       circle.style.strokeDashoffset = 0;

//       function formatTime(seconds) {
//         const mins = Math.floor(seconds / 60);
//         const secs = seconds % 60;
//         return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
//       }

//       function updateTimer() {
//         document.getElementById('timeText').innerHTML = formatTime(remainingSeconds);

//         const offset = circumference - (remainingSeconds / totalSeconds) * circumference;
//         circle.style.strokeDashoffset = offset;

//         if (remainingSeconds <= 0) {
//           clearInterval(countdownInterval);
//           document.getElementById('timeText').innerHTML = '00:00';
//         }
//         remainingSeconds--;
//       }

//       updateTimer(); // first call immediately
//       countdownInterval = setInterval(updateTimer, 1000);
//     }


// countdown test 
// function startCountdownToEnd(endTime) {
//   const container = document.getElementById("countdown-container");
//   const progressCircle = document.getElementById("progress");
//   const radius = progressCircle.r.baseVal.value;
//   const circumference = 2 * Math.PI * radius;

//   progressCircle.style.strokeDasharray = `${circumference}`;
//   progressCircle.style.strokeDashoffset = '0';
//   container.style.display = 'block';

//   const totalDuration = endTime - Math.floor(Date.now() / 1000);  // seconds remaining
//   let remainingTime = totalDuration;

//   const interval = setInterval(() => {
//     const currentTime = Math.floor(Date.now() / 1000);
//     remainingTime = endTime - currentTime;

//     if (remainingTime < 0) {
//       clearInterval(interval);
//       container.style.display = 'none';
//       alert("Order is ready!");
//       return;
//     }

//     // Update circle progress
//     const progress = remainingTime / totalDuration;
//     const offset = circumference * (1 - progress);
//     progressCircle.style.strokeDashoffset = offset;

//     // Optional: Update time text display
//     const minutes = Math.floor(remainingTime / 60);
//     const seconds = remainingTime % 60;
//     document.getElementById("time-display").innerText = 
//       `${minutes}m ${seconds}s`;

//   }, 1000);
// }

// // Start countdown
// startCountdownToEnd(endTime);
