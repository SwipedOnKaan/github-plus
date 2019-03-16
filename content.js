let initLoad = true
//Test5
window.onload = function() {

}


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

      document.querySelector('.gh-header-title > .js-issue-title')
        .style.color = '#dd0028';
    } else if (document.querySelector('.TableObject-item > span').innerHTML.split('</svg>')[1].includes('Open')) {
      document.querySelector('.gh-header-title > .js-issue-title')
        .style.color = '#2cbe4e';
    }

  } else if (window.location.href.includes('/pull/')) {
    if (document.querySelector('.TableObject-item > span').innerHTML.split('</svg>')[1].includes('Merged')) {
      document.querySelector('.gh-header-title > .js-issue-title')
        .style.color = '#6f42c1';
    }

    if (document.querySelector('.btn-group-merge > button:first-child').disabled === false) {
      setFavIcon('/icons/github-merge-ready-favicon.ico');
    } else if (document.querySelector('.merge-branch-heading').innerHTML === 'Pull request successfully merged and closed') {
      setFavIcon('/icons/github-pr-merged-favicon.ico');
      clearInterval(loop);
    }
  }
}, initLoad ? 100 : 2000)



let loop2 = setInterval(() => {
  let isDisabled = document.querySelector('.btn-group-merge > button:first-child').disabled
  console.log('isDisabled?: ', isDisabled);
  if (!isDisabled) {
    clearInterval(loop2);
  }
}, 10)
