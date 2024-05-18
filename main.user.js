// ==UserScript==
// @name			Showdown Alt Hider
// @version		1.0.0
// @description	Hide your username on Pokemon Showdown
// @author		malaow3
// @match			https://play.pokemonshowdown.com/*
// ==/UserScript==

// index.ts
var handle_dom_changes = function(mutationsList, _observer) {
  const usernametexts = document.getElementsByClassName("usernametext");
  while (usernametexts.length > 0) {
    usernametexts[0].remove();
  }
  const labels = document.getElementsByTagName("label");
  for (let i = 0;i < labels.length; i++) {
    const label = labels[i];
    if (label.innerHTML.match(new RegExp(USERNAME, "i"))) {
      label.innerHTML = label.innerHTML.replace(new RegExp(USERNAME, "gi"), REPLACEMENT);
    }
  }
  for (const mutation of mutationsList) {
    if (mutation.type === "childList") {
      const addedNodes = Array.from(mutation.addedNodes);
      for (const node of addedNodes) {
        if (node.nodeType === Node.ELEMENT_NODE) {
          replaceUsername(node, USERNAME, REPLACEMENT);
        }
      }
    }
  }
};
var replaceUsername = function(node, searchText, replaceText) {
  if (node.nodeType === Node.TEXT_NODE && node.textContent?.match(new RegExp(searchText, "i"))) {
    node.textContent = node.textContent.replace(new RegExp(searchText, "gi"), replaceText);
  } else if (node.nodeType === Node.ELEMENT_NODE) {
    const children = Array.from(node.childNodes);
    for (const child of children) {
      replaceUsername(child, searchText, replaceText);
    }
  }
};
var USERNAME = "MyUsername";
var REPLACEMENT = "Player";
var observer = new MutationObserver(handle_dom_changes);
var config = { childList: true, subtree: true };
observer.observe(document.body, config);
