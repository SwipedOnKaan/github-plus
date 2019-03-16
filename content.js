let initLoad = true
//Test2
function setFavIcon(icon) {
  document.querySelector('link[rel="icon"]').href =
    chrome.extension.getURL(icon);
}

let loop = setInterval(() => {
  if (window.location.href.includes('/issues/')) {
    clearInterval(loop)

    document.querySelector('title').innerHTML = `(${
      document.querySelector('.gh-header-number').innerHTML
    }) ${
      document.querySelector('title').innerHTML
    }`;

    if (document.querySelector('.TableObject-item > span').innerHTML.split('</svg>')[1].includes('Closed')) {
      setFavIcon('/icons/github-issue-closed-favicon.ico');
    }

  } else if (window.location.href.includes('/pull/')) {

    if (document.querySelector('.btn-group-merge > button:first-child') !== null) {
      setFavIcon('/icons/github-merge-ready-favicon.ico');
      clearInterval(loop);
    } else if (document.querySelector('.merge-branch-heading').innerHTML === 'Pull request successfully merged and closed') {
      setFavIcon('/icons/github-pr-merged-favicon.ico');
      clearInterval(loop);
    }
  }
}, initLoad ? 100 : 5000)
