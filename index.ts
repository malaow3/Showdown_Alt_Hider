const USERNAME = "MyUsername";
const REPLACEMENT = "Player";

// On dom changes, if there are any elements with the class "usernametext", remove them.
// biome-ignore lint/suspicious/noExplicitAny: We are ok with an any here, the value is not used.
function handle_dom_changes(mutationsList: MutationRecord[], _observer: any) {
	// Look for any elements with the class "usernametext" and remove them.
	const usernametexts = document.getElementsByClassName("usernametext");
	while (usernametexts.length > 0) {
		usernametexts[0].remove();
	}

	// Look for any <label> elements and replace the username
	const labels = document.getElementsByTagName("label");
	for (let i = 0; i < labels.length; i++) {
		const label = labels[i];
		if (label.innerHTML.match(new RegExp(USERNAME, "i"))) {
			label.innerHTML = label.innerHTML.replace(
				new RegExp(USERNAME, "gi"),
				REPLACEMENT,
			);
		}
	}

	// Look for any nodes that were added and have the text "USERNAME"
	// and replace the username with "player"
	for (const mutation of mutationsList) {
		if (mutation.type === "childList") {
			const addedNodes: Node[] = Array.from(mutation.addedNodes);
			for (const node of addedNodes) {
				if (node.nodeType === Node.ELEMENT_NODE) {
					// Recursively replace username in the node and its children
					replaceUsername(node, USERNAME, REPLACEMENT);
				}
			}
		}
	}
}

function replaceUsername(node: Node, searchText: string, replaceText: string) {
	// If the node contains the searchText, replace it
	if (
		node.nodeType === Node.TEXT_NODE &&
		node.textContent?.match(new RegExp(searchText, "i"))
	) {
		node.textContent = node.textContent.replace(
			new RegExp(searchText, "gi"),
			replaceText,
		);
	} else if (node.nodeType === Node.ELEMENT_NODE) {
		// Check all child nodes
		const children = Array.from(node.childNodes);
		for (const child of children) {
			replaceUsername(child, searchText, replaceText);
		}
	}
}

const observer: MutationObserver = new MutationObserver(handle_dom_changes);
const config: MutationObserverInit = { childList: true, subtree: true };
observer.observe(document.body, config);
