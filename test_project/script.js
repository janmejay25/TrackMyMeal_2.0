document.getElementById("searchForm").addEventListener("submit", function (e) {
    e.preventDefault(); // Stop form from reloading the page
  
    const form = document.getElementById("searchForm");
    const formData = new FormData(form);
  
    fetch("search_order.php", {
      method: "POST",
      body: formData
    })
      .then((response) => response.text())
      .then((data) => {
        document.getElementById("result").innerHTML = data;
      })
      .catch((error) => {
        console.error("Error:", error);
        document.getElementById("result").innerText = "Something went wrong!";
      });
  });
  