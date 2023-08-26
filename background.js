// background.js
chrome.action.onClicked.addListener(tab => {
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: injectScript
  });
});

function injectScript() {
  const script = `
    const inputs = document.querySelectorAll('input[type="text"], textarea');
    inputs.forEach(input => {
      input.addEventListener("input", function(event) {
        const inputValue = event.target.value;
        console.log("User input:", inputValue);
      });
    });
  `;

  const scriptElement = document.createElement("script");
  scriptElement.textContent = script;
  document.documentElement.appendChild(scriptElement);
  scriptElement.remove();
}
