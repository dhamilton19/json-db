#json-db
#####A simple DB that stores data in a json file.
Once initialised, the library loads the json file at the specified directory into memory or if none is found, then a empty object.
Each time an item is going to be stored in the database, it is added to a queue. The queue is then merged with the object from the json file and is then written to the json file again. If the write operation is being performed when an item arrives in the queue, a promise will be returned which will then write the queue after it is resolved.

This project was created specifically for the project below as Firebase was blocked by work firewall.

See example of use at: https://github.com/dhamilton91/react-menu-app


##options
`directory` [string] location to save json database.


##Use:
1. `npm install https://github.com/dhamilton91/json-db.git --save`
2. Add the following code to your node server to intialise database (see options above):
	
		`const Db = require('json-db').Db;
		Db.init(options);`

3. Writing to database:

	`Db.addToQueue(item);`
	
4. Reading from database:

	`Db.getAll(callback);`

	
	
