let initLoad = true

let loop = setInterval(() => {
  if (!window.location.href.includes('/pull/')) {
    clearInterval(loop)
    console.log('stopped loop, not on a pull request page');

    if (window.location.href.includes('/issues/')) {
      let currentTitle = document.querySelector('title').innerHTML;
      let ticketNumber = document.querySelector('.gh-header-number').innerHTML;
      let newTitle = `(${ticketNumber}) ${currentTitle}`;
      document.querySelector('title').innerHTML = newTitle;
    }
  } else {
    if (document.querySelector('.btn-group-merge > button:first-child') !== null) {
      document.querySelector('link[rel="icon"]').href =
        chrome.extension.getURL('/icons/github-merge-ready-favicon.ico');
      clearInterval(loop);
      console.log('stopped loop, found merge button and setting favicon');
    }

    if (document.querySelector('.merge-branch-heading').innerHTML === 'Pull request successfully merged and closed') {
      clearInterval(loop);
      console.log('stopped loop, PR already closed');
    }
  }
}, initLoad ? 100 : 5000)
