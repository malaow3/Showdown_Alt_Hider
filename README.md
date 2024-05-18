# Showdown Alt Hider

## What is this?
This is a tool for obfuscating your username in Showdown. It is especially useful for anyone who wants to record videos of their Showdown games.
without revealing their username.

## How to Install
1. Install Tampermonkey for either [Chrome](https://chromewebstore.google.com/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo)
or [Firefox](https://addons.mozilla.org/en-US/firefox/addon/tampermonkey/)
2. Once Tampermonkey is installed, navigate to this [link](https://github.com/malaow3/Showdown_Alt_Hider/raw/main/main.user.js) to install the script
3. Change the value of `USERNAME` in and `REPLACEMENT` variable in the script to your username and desired replacement.


## Building from source
To build from source, you can follow the guide below. Please first have [Bun](https://bun.sh/) installed.

1. Clone the repo
2. Run `bun install`
3. Run `./build.sh`
4. Copy the contents of `main.user.js` to Tampermonkey

