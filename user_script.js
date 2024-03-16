// ==UserScript==
// @name     Aliexpress star converter
// @version  1
// @grant    none

// @match		*://www.aliexpress.com/*

// ==/UserScript==


function replaceStars(starList) {
  // console.log(starList.children);
  let starSum = 0;
  for (star of starList.children) {
    // console.log(star);
    // console.log('img: ', star.querySelector('img'));
    // console.log('div: ', star.querySelector('div'));
    let imgWidth = star.querySelector('img').getBoundingClientRect().width;
    let divWidth = star.querySelector('div').getBoundingClientRect().width;
    starSum = starSum + (divWidth / imgWidth);
  }

  const numDiv = document.createElement('div');
  numDiv.style.setProperty('font-weight', 'bold');
  numDiv.style.setProperty('font-size', '120%');
  numDiv.appendChild(document.createTextNode(starSum));
  const starDiv = document.createElement('div');
  starDiv.appendChild(document.createTextNode('★'));
  
  starList.replaceChildren(numDiv);
  starList.appendChild(starDiv);
}

// Initial converting
window.addEventListener('load', () => {
  
  // console.log('Initial conversion');

  let starLists = document.querySelectorAll('[class^="multi--starList--"]');
  for (let i = 0; i < starLists.length; i++) {
    if (starLists[i].childElementCount < 3) { continue }
    replaceStars(starLists[i]);
  }
  
  // console.log('Setting up mutation observers');
  
  const allTargets = document.getElementsByClassName("lazy-load");
  for (let i = 0; i < allTargets.length; i++) {
  const observer = new MutationObserver((mutation) => {
    const starList = mutation[0].target.querySelector('[class^="multi--starList--"]')
    if (starList) {
      // console.log('Converting lazy load stars: ', starList);
      replaceStars(starList);
    }
  });
  observer.observe(allTargets[i], { childList: true });  
  }
  
});
