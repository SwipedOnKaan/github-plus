let initLoad = true

let checkForAvailablePR = setInterval(() => {
  if (document.querySelector('.btn-group-merge > button:first-child') !== null) {
    document.querySelector('link[rel="icon"]').href =
      chrome.extension.getURL('/icons/github-merge-ready-favicon.ico');
    clearInterval(checkForAvailablePR);
  }
}, initLoad ? 100 : 5000)
