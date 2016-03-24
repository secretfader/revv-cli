#!/usr/bin/env node
'use strict';
const notifier = require('update-notifier');
const meow = require('meow');
const revv = require('revv').default;

const cli = meow(
	'Usage',
	'  $ revv <path|glob> [...]',
	{
		boolean: [
			'tidy'
		],
		alias: { t: 'tidy' }
	}
);

notifier({pkg: cli.pkg}).notify();

if (cli.input.length === 0) {
	console.error('Please specify at least one path.');
	process.exit(1);
}

revv(cli.input, cli.flags);
