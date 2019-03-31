let initLoad = true
//Test5

function setFavIcon(icon) {
  document.querySelector('link[rel="icon"]').href =
    chrome.extension.getURL(icon);
}

window.onload = function() {
  document.addEventListener('click',function(e) {
    if (e.target && e.target.classList[0] === 'ellipsis-expander') {
      let parentElement = e.target.parentNode.parentNode.childNodes[1];

      if (parentElement.getAttribute('commit-message-partial') === null) {
        parentElement.setAttribute('commit-message-partial', parentElement.childNodes[3].innerHTML);
      }

      if (parentElement.getAttribute('commit-message-full') === null) {
        parentElement.setAttribute('commit-message-full', parentElement.childNodes[1].title.substring(5));
      }

      parentElement.childNodes[3].innerHTML = e.target.getAttribute('aria-expanded') === 'true'
        ? parentElement.getAttribute('commit-message-full')
        : parentElement.getAttribute('commit-message-partial');
    }
  });
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

    if (!document.querySelector('.mergeability-details > .merge-message > .select-menu > .btn-group-merge > button').disabled) {
      setFavIcon('/icons/github-merge-ready-favicon.ico');
    } else if (document.querySelector('.merge-branch-heading').innerHTML === 'Pull request successfully merged and closed') {
      setFavIcon('/icons/github-pr-merged-favicon.ico');
      clearInterval(loop);
    }
  }
}, initLoad ? 100 : 2000)
