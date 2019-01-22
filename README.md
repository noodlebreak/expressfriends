# README

## Requirements

* Install `npm` if not already installed.

## Installation
+ Run the following commands:

    * `git clone https://github.com/noodlebreak/nodejsexp.git`
    * `cd nodejsexp`
    * `npm install`

+ Setup database:
    * `createdb <dbname>`
    * Add above created db's connection params in `.env` file, with proper  
      values for db-host, db-user, and password
    * Run `npx sequelize db:migrate` to create tables.
    * Run `npx sequelize db:seed:all` to install sample fixture data, so that the table is somewhat populated for you to see some results in the APIs.


+ Start dev server by running the following command in project dir:

    `npx nodemon`

You can then browse the APIs by going to [http://localhost:8000/api](http://localhost:8000/api)


## Testing
There are test cases written for checking the functioning of all the APIs.
You can run the tests by running the following command:

`npm run test`

Make sure the seeds are installed, so that assertions on initial data doesn't fail.