#!/bin/bash

bun run build;

# Prepend userscript metadata to the file.
{
	echo "// ==UserScript=="
	echo "// @name			Showdown Alt Hider"
	echo "// @version		1.0.0"
	echo "// @description	Hide your username on Pokemon Showdown"
	echo "// @author		malaow3"
	echo "// @match			https://play.pokemonshowdown.com/*"
    echo "// ==/UserScript=="
	echo ""
	cat main.user.js
} > tmp-main.user.js

mv tmp-main.user.js main.user.js
