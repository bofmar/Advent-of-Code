#!/usr/bin/env node
import fs from 'fs';

const path: string = process.argv[2];
fs.readFile(path, (error, data) => {
	if(error) {
		console.log(error);
		return
	}
	const strData = data.toString();
	const arr = strData.split('\n');
	let highestArr = [0, 0, 0];
	for(let i = 1, acc = 0; i < arr.length; i++) {
		if (arr[i] === '') {
			for (let i = 0; i < highestArr.length; i++) {
				if (highestArr[i] === 0 || highestArr[i] < acc) {
					highestArr[i] = acc;
					highestArr.sort((a,b) => a > b ? 1 : -1);
					break;
				}
			}
			acc = 0;
		} else {
			acc += Number(arr[i]);
		}
	}
	console.log(highestArr.reduce((acc, elf) => acc + elf, 0));
});
