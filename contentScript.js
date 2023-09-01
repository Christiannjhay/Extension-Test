// contentScript.js

//ENTER FUNCTION
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



// Function to capture input
function captureInput(inputValue) {
  chrome.storage.local.get({ inputs: [] }, result => {
    const storedInputs = result.inputs;
    storedInputs.push(inputValue);
    chrome.storage.local.set({ inputs: storedInputs });
  });
}


// Function to capture search input
function captureSearchInput(inputValue) {
  captureInput(inputValue);
}

const searchForm = document.querySelector('#search-form');
const searchButton = document.querySelector('#search-icon-legacy');

//YOUTUBE FUNCTION
if (searchForm) {
  searchForm.addEventListener('submit', function(event) {
    const searchInput = searchForm.querySelector('input[type="text"]');
    if (searchInput) {
      const inputValue = searchInput.value;
      captureSearchInput(inputValue);
    }
  });

  if (searchButton) {
    searchButton.addEventListener('click', function(event) {
      const searchInput = searchForm.querySelector('input[type="text"]');
      if (searchInput) {
        const inputValue = searchInput.value;
        captureSearchInput(inputValue);
      }
    });
  }
}
