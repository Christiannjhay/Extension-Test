// contentScript.js
function logInputValues(inputValues) {
  chrome.storage.local.get({ inputs: [] }, result => {
    const storedInputs = result.inputs;
    storedInputs.push(...inputValues);
    chrome.storage.local.set({ inputs: storedInputs });
  });
}

document.addEventListener("input", event => {
  if (event.target.matches('input[type="text"], textarea')) {
    const inputValue = event.target.value;
    logInputValues([inputValue]);
  }
});
