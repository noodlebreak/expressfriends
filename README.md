# README

## Requirements

* Install `npm` if not already installed.

## Installation
+ Run the following commands:

    * `git clone https://github.com/noodlebreak/expressfriends.git`
    * `cd expressfriends`
    * `npm install`

+ Setup database:
    * `createdb <dbname>`
    * Add above created db's connection params in `.env` file, with proper  
      values for db-host, db-user, and password
    * Run `npx sequelize db:migrate` to create tables.
    * Run `npx sequelize db:seed:all` to install sample fixture data, so that the table is somewhat populated for you to see some results in the APIs.


+ You can run the server in two modes:
    1. Auto-reload mode: In case you need to make changes and see them without manually restarting the server:

        `npx nodemon bin/www`

    2. Start the node server without auto reload:

        `npm start`

You can then browse the APIs by going to [http://localhost:8000/api](http://localhost:8000/api)
You can change the port by changing the `PORT` variable in `.env`


## Testing
There are test cases written for checking the functioning of all the APIs.
You can run the tests by running the following command:

`npm run test`

Make sure the seeds are installed, so that assertions on initial data doesn't fail.

## Demo

A demo is already deployed at [expressfriends.herokuapp.coms](https://expressfriends.herokuapp.com/), so check it out.