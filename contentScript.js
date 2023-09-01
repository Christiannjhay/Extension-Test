// contentScript.js
const textInputs = document.querySelectorAll('input[type="text"], textarea');

textInputs.forEach(textInput => {
  textInput.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
      const inputValue = textInput.value;

      chrome.storage.local.get({ inputs: [] }, result => {
        const storedInputs = result.inputs;
        storedInputs.push(inputValue);
        chrome.storage.local.set({ inputs: storedInputs });
      });
    }
  });
});
