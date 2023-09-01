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
