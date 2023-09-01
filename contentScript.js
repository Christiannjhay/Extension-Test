// contentScript.js
const inputs = document.querySelectorAll('input[type="text"], textarea');

inputs.forEach(input => {
  input.addEventListener("input", function(event) {
    const inputValue = event.target.value;

    chrome.storage.local.get({ inputs: [] }, result => {
      const storedInputs = result.inputs;
      storedInputs.push(inputValue);
      chrome.storage.local.set({ inputs: storedInputs });
    });
  });
});

// Function to detect Facebook and Twitter pages
function isFacebookOrTwitterPage() {
  return (
    window.location.href.includes("facebook.com") ||
    window.location.href.includes("twitter.com")
  );
}

// Check if the current page is Facebook or Twitter
if (isFacebookOrTwitterPage()) {
  // Add specific logic to capture input on Facebook and Twitter
  // For example, you can add additional event listeners here

  // Add "working" to the stored inputs
  chrome.storage.local.get({ inputs: [] }, result => {
    const storedInputs = result.inputs;
    storedInputs.push("working");
    chrome.storage.local.set({ inputs: storedInputs });
  });
}