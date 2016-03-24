import test from 'ava';
import cp from 'cp-file';
import del from 'del';
import execa from 'execa';
import { exists } from 'revv';

test.beforeEach(async t => {
	await cp('support/logo.svg', 'support/one.tmp.svg');
	await cp('support/logo.svg', 'support/two.tmp.svg');
});

test.after('cleanup', async t => {
	await del('support/*.tmp.*');
	await del('support/*.tmp-*');
});

test('revv()ing a single file', async t => {
	await execa('./cli.js', ['support/one.tmp.svg']);
	
	t.is(await exists('support/one.tmp.svg'), false);
});

test('revv()ing with options', async t => {
	await execa('./cli.js', [
		'support/two.tmp.svg',
		'--tidy', 'false'
	]);

	t.is(await exists('support/two.tmp.svg'), false);
});


