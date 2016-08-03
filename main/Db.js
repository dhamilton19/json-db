import fs from 'fs';
import deepMerge from './deepMerge';


export default class Db {

	static entries = {};
	static directory = '';
	static fileName = '';
	static fileExtension = '.json';
	static queue = {};
	static writingPromise = null;
	static initialised = false;

	constructor() {
		throw new Error('Class is static.');
	}

	static init({directory, fileName}) {
		this.initialised = true;
		if (!directory) throw new Error('Missing directory.');

		this.directory = directory + '\\';
		this.fileName = fileName ? fileName : 'data';
		this.writingPromise = new Promise(resolve => {
			resolve();
		});
		this.read();
	}

	static read() {
		this.checkInitialised();
		try {
			this.entries = JSON.parse(fs.readFileSync(this.directory + this.fileName + this.fileExtension, 'utf-8'));
		}
		catch (e) { /* swallow error */}
	}

	static addToQueue(item) {
		this.checkInitialised();
		this.queue = deepMerge(this.queue, item);
		this.writingPromise.then(() => {
			this.handleQueue();
		});
	}

	static handleQueue() {
		this.checkInitialised();
		this.entries = deepMerge(this.entries, this.queue);
		this.queue = {};
		this.writingPromise = this.write();
	}

	static merge(){
		this.entries = deepMerge(this.entries, this.queue);
	}

	static write() {
		this.checkInitialised();
		return new Promise((resolve) => {
			fs.writeFile(this.directory + this.fileName + this.fileExtension, JSON.stringify(this.entries), 'utf-8', () => {
				resolve();
			});
		});
	}

	static getAll(callback) {
		this.checkInitialised();
		callback({[this.fileName]: this.entries});
	}

	static checkInitialised() {
		if (!this.initialised) throw new Error('Must initialise static class.');
	}
}
