//This is a test commit

let loop = setInterval(function() {
  if (document.querySelector('.btn-group-merge > button:first-child') !== null) {
    console.log("Button found, stopping loop and setting favicon");
    document.querySelector('link[rel="icon"]').href = chrome.extension.getURL('/icons/github-merge-ready-favicon.ico');
    clearInterval(loop);
  } else {
    console.log("button not found");
  }
}, 100)
