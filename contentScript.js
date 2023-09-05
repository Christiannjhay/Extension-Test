// Store the inputs to local storage
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

// Daigler Enter function
function captureTextAreaInput() {
  const textAreas = document.querySelectorAll('.rui-textarea.form-control.w-100.mx-0.mb-2');

  textAreas.forEach(textArea => {
    textArea.addEventListener("keydown", function(event) {
      if (event.key === "Enter") {
        const inputValue = textArea.value;
        captureInput(inputValue);
      }
    });
  });
}

// Daigler Send Button
function captureButtonInput() {
  const button = document.querySelector('.btn.btn-primary.mt-1.col.mr-2');

  if (button) {
    button.addEventListener("click", function() {
      const textArea = document.querySelector('.rui-textarea.form-control.w-100.mx-0.mb-2');
      if (textArea) {
        const inputValue = textArea.value;
        console.log("Textarea content: ", inputValue);
        captureInput(inputValue);
      }
    });
  }
}

// Capture input from Twitter
document.body.addEventListener("click", function(event) {
  const postButton = event.target.closest('[data-testid="tweetButtonInline"]');
  if (postButton) {
    const tweetInput = document.querySelector('[aria-label="Tweet text"]');
    if (tweetInput) {
      const inputValue = tweetInput.innerText;
      captureInput(inputValue);
    }
  }
});


// Listen for clicks on the document body and check if the button was clicked
document.body.addEventListener("click", function (event) {
  const tweetButton = event.target.closest('[data-testid="tweetButton"]');

  if (tweetButton) {
    const tweetInput = document.querySelector('[aria-label="Tweet text"]');
    if (tweetInput) {
      const inputValue = tweetInput.innerText;
      captureInput(inputValue);
    }
  }
});

// Function to capture and store input in local storage
function captureAndStoreInput() {
  // Get the tweet input element
  const tweetInput = document.querySelector('[data-testid="tweetTextarea_0"]');
  
  // Get the Post button element
  const postButton = document.querySelector('[data-testid="tweetButton"]');
  
  // Check if both the input and button elements exist
  if (tweetInput && postButton) {
    // Add a click event listener to the Post button
    postButton.addEventListener('click', function() {
      // Get the input value
      const inputValue = tweetInput.innerText;
      
      // Store the input value in local storage
      chrome.storage.local.get({ inputs: [] }, function(result) {
        const storedInputs = result.inputs;
        storedInputs.push(inputValue);
        chrome.storage.local.set({ inputs: storedInputs });
      });
    });
  }
}

// Call the captureAndStoreInput function
captureAndStoreInput();

// Capture input from Facebook
document.body.addEventListener("click", function(event) {
  const postButton = event.target.closest('.x1i10hfl');
  if (postButton) {
    const tweetInput = document.querySelector('[contenteditable="true"]');
    if (tweetInput) {
      const inputValue = tweetInput.textContent; // Use textContent here
      captureInput(inputValue);
    }
  }
});



// All websites
const textInputs = document.querySelectorAll('input[type="text"], textarea');

textInputs.forEach(textInput => {
  textInput.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
      const inputValue = textInput.value;
      captureInput(inputValue);
    }
  });
});

// Youtube
const searchForm = document.querySelector('#search-form');
const searchButton = document.querySelector('#search-icon-legacy');

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

