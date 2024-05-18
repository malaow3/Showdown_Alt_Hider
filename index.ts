const USERNAME = "DecisionParalysis";

// On dom changes, if there are any elements with the class "usernametext", remove them.
function handle_dom_changes(mutationsList, _observer) {
    // Look for any elements with the class "usernametext" and remove them.
    const usernametexts = document.getElementsByClassName("usernametext");
    while (usernametexts.length > 0) {
        usernametexts[0].remove();
    }

    // Look for any <label> elements and replace the username
    const labels = document.getElementsByTagName("label");
    for (let i = 0; i < labels.length; i++) {
        let label = labels[i];
        if (label.innerHTML.match(new RegExp(USERNAME, 'i'))) {
            label.innerHTML = label.innerHTML.replace(new RegExp(USERNAME, 'gi'), 'player');
        }
    }

    // Look for any nodes that were added and have the text "USERNAME"
    // and replace the username with "player"
    for (const mutation of mutationsList) {
        if (mutation.type === 'childList') {
            mutation.addedNodes.forEach(node => {
                if (node.nodeType === Node.ELEMENT_NODE) {
                    // Recursively replace username in the node and its children
                    replaceUsername(node, USERNAME, 'player');
                }
            });
        }
    }
}

function replaceUsername(node, searchText, replaceText) {
    // If the node contains the searchText, replace it
    if (node.nodeType === Node.TEXT_NODE && node.textContent.match(new RegExp(searchText, 'i'))) {
        node.textContent = node.textContent.replace(new RegExp(searchText, 'gi'), replaceText);
    } else if (node.nodeType === Node.ELEMENT_NODE) {
        // Check all child nodes
        node.childNodes.forEach(child => replaceUsername(child, searchText, replaceText));
    }
}

const observer: MutationObserver = new MutationObserver(handle_dom_changes);
const config: MutationObserverInit = { childList: true, subtree: true };
observer.observe(document.body, config);
