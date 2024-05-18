// index.ts
var handle_dom_changes = function(mutationsList, _observer) {
  const usernametexts = document.getElementsByClassName("usernametext");
  while (usernametexts.length > 0) {
    usernametexts[0].remove();
  }
  const labels = document.getElementsByTagName("label");
  for (let i = 0;i < labels.length; i++) {
    let label = labels[i];
    if (label.innerHTML.match(new RegExp(USERNAME, "i"))) {
      label.innerHTML = label.innerHTML.replace(new RegExp(USERNAME, "gi"), "player");
    }
  }
  for (const mutation of mutationsList) {
    if (mutation.type === "childList") {
      mutation.addedNodes.forEach((node) => {
        if (node.nodeType === Node.ELEMENT_NODE) {
          replaceUsername(node, USERNAME, "player");
        }
      });
    }
  }
};
var replaceUsername = function(node, searchText, replaceText) {
  if (node.nodeType === Node.TEXT_NODE && node.textContent.match(new RegExp(searchText, "i"))) {
    node.textContent = node.textContent.replace(new RegExp(searchText, "gi"), replaceText);
  } else if (node.nodeType === Node.ELEMENT_NODE) {
    node.childNodes.forEach((child) => replaceUsername(child, searchText, replaceText));
  }
};
var USERNAME = "DecisionParalysis";
var observer = new MutationObserver(handle_dom_changes);
var config = { childList: true, subtree: true };
observer.observe(document.body, config);
