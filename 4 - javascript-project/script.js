// script.js

// Function to make a request to The Meal DB API
async function fetchMealsByIngredient(ingredient) {
  const apiUrl = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`;
  const response = await fetch(apiUrl);
  const data = await response.json();
  return data.meals;
}

// Function to take user orders
function takeOrder() {
  const ingredient = prompt("Enter the main ingredient for your order:");
  const formattedIngredient = ingredient.toLowerCase().replace(/\s/g, "_");

  fetchMealsByIngredient(formattedIngredient)
    .then((meals) => {
      if (meals === null) {
        alert("No meals found for the specified ingredient. Please try again.");
        takeOrder(); // Use recursion to prompt the user for another ingredient
      } else {
        const randomMeal = meals[Math.floor(Math.random() * meals.length)];
        const order = {
          description: randomMeal.strMeal,
          orderNumber: getOrderNumber(),
          completionStatus: "incomplete",
        };
        storeOrder(order);
        alert(
          `Order placed!\nDescription: ${order.description}\nOrder Number: ${order.orderNumber}`
        );
      }
    })
    .catch((error) => console.error("Error fetching meals:", error));
}

// Function to store order details in sessionStorage
function storeOrder(order) {
  let orders = JSON.parse(sessionStorage.getItem("orders")) || [];
  orders.push(order);
  sessionStorage.setItem("orders", JSON.stringify(orders));
  sessionStorage.setItem("lastOrderNumber", order.orderNumber);
}

// Function to generate a unique order number
function getOrderNumber() {
  const orders = JSON.parse(sessionStorage.getItem("orders")) || [];
  return orders.length + 1;
}

// Function to display and complete orders
function displayAndCompleteOrders() {
  let incompleteOrders = JSON.parse(sessionStorage.getItem("orders")) || [];

  if (incompleteOrders.length === 0) {
    alert("No incomplete orders found.");
    return;
  }

  const orderList = incompleteOrders
    .map((order) => `${order.orderNumber}: ${order.description}`)
    .join("\n");
  const userInput = prompt(
    `Incomplete Orders:\n${orderList}\nEnter the order number to mark as complete (or enter 0 to cancel):`
  );
  console.log(userInput);
  if (userInput === null || userInput === "0") {
    return; // User clicked cancel
  }

  const orderNumber = parseInt(userInput);
  const selectedOrderIndex = incompleteOrders.findIndex(
    (order) => order.orderNumber === orderNumber
  );

  if (selectedOrderIndex !== -1) {
    const selectedOrder = incompleteOrders[selectedOrderIndex];
    selectedOrder.completionStatus = "completed";
    incompleteOrders = incompleteOrders.filter(
      (order, index) => index !== selectedOrderIndex
    ); // Remove the completed order
    sessionStorage.setItem("orders", JSON.stringify(incompleteOrders));
    alert(`Order ${orderNumber} marked as complete.`);
  } else {
    alert(`Order number ${orderNumber} not found.`);
  }
}

// Main logic
takeOrder(); // You can replace this with your application's entry point logic
