#!/usr/bin/env node
import fs from 'fs';
import rl from 'readline';
import { once } from 'events';

const path: string = process.argv[2];

async function getTopThree() {
	const read = rl.createInterface({
		input: fs.createReadStream(path),
		crlfDelay: Infinity,
	});

	let acc = 0;
	const calOnElf: Array<number> = [];
	read.on('line', (line) => {
		if (line === '') {
			calOnElf.push(acc);
			acc = 0;
		} else {
			acc += Number(line);
		}
	});

	await once(read, 'close');
	return calOnElf;
}

function getSum(arr: Array<number>) {
	return arr.sort((a,b) => a < b ? 1 : -1).splice(0, 3).reduce((acc, elf) => acc + elf, 0);
}

(async function main() {
	const arr = await getTopThree();

	console.log(getSum(arr));
})();

