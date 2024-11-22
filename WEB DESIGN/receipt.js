document.addEventListener("DOMContentLoaded", function () {
 // Retrieve data from all relevant localStorage items
 const orderData = JSON.parse(localStorage.getItem("orderData")) || {};
 const userData = JSON.parse(localStorage.getItem("userData")) || {};
 const paymentData = JSON.parse(localStorage.getItem("paymentData")) || {};
 const checkoutData = JSON.parse(localStorage.getItem("checkoutData")) || {};

 // Combine user data from different sources with priority
 const combinedUserData = {
  name: checkoutData.name || paymentData.name || userData.name || "",
  email: checkoutData.email || paymentData.email || userData.email || "",
  address:
   checkoutData.address || paymentData.address || userData.address || "",
 };

 // Function to populate receipt section
 function populateReceiptSection() {
  document.getElementById("receipt-name-section").textContent =
   combinedUserData.name;
  document.getElementById("receipt-items-section").textContent =
   orderData.totalItems || "0";
  document.getElementById("receipt-total-section").textContent =
   orderData.totalPrice || "0.00";
  document.getElementById("receipt-fullname-section").textContent =
   combinedUserData.name;
  document.getElementById("receipt-email-section").textContent =
   combinedUserData.email;
  document.getElementById("receipt-address-section").textContent =
   combinedUserData.address;

  // Show the receipt section
  document.getElementById("receipt-section").style.display = "block";
 }

 // Function to populate receipt modal
 function populateReceiptModal() {
  document.getElementById("receipt-name-modal").textContent =
   combinedUserData.name;
  document.getElementById("receipt-email-modal").textContent =
   combinedUserData.email;
  document.getElementById("receipt-address-modal").textContent =
   combinedUserData.address;
  document.getElementById("receipt-items-modal").textContent =
   orderData.totalItems || "0";
  document.getElementById("receipt-price-modal").textContent =
   orderData.totalPrice || "0.00";
 }

 // Close modal function
 window.closeReceipt = function () {
  document.getElementById("receipt-modal").style.display = "none";
 };

 // Close modal when clicking on X button
 document.querySelector(".close-btn").addEventListener("click", closeReceipt);

 // Close modal when clicking outside of it
 window.addEventListener("click", function (event) {
  const modal = document.getElementById("receipt-modal");
  if (event.target === modal) {
   closeReceipt();
  }
 });

 // Show modal function
 window.showReceiptModal = function () {
  document.getElementById("receipt-modal").style.display = "block";
 };

 // Initialize the receipt display
 populateReceiptSection();
 populateReceiptModal();
});
