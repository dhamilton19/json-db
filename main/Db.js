import fs from 'fs';


export default class Db {

	static entries = {};
	static directory = '';
	static fileName = '';
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
		this.fileName = fileName ? fileName : 'data.json';
		this.writingPromise = new Promise(resolve => {
			resolve();
		});
		this.read();
	}

	static read() {
		this.checkInitialised();
		try {
			this.entries = JSON.parse(fs.readFileSync(this.directory + this.fileName, 'utf-8'));
		}
		catch (e) { /* swallow error */ }
	}

	static addToQueue(item) {
		this.checkInitialised();
		this.queue = {...this.queue, ...item};
		this.writingPromise.then(() => {
			this.handleQueue();
		});
	}

	static handleQueue() {
		this.checkInitialised();
		this.entries = {...this.entries, ...this.queue};
		this.queue = {};
		this.writingPromise = this.write();
	}

	static write() {
		this.checkInitialised();
		return new Promise((resolve) => {
			fs.writeFile(this.directory + this.fileName, JSON.stringify(this.entries), 'utf-8', () => {
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
