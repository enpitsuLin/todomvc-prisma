# todomvc-prisma

A simple todo app built using nextjs with prisma.

## Running

First of all, you should init prisma with the database you preferred,

edit Environment Variables to provide `DATABASE_URL`, see [more detail](https://pris.ly/d/prisma-schema#using-environment-variables)

then run

```sh
npm run generate
```

This will generate db file (if use sqlite) or create table on your SQL database

Also can use seed data to fill your table

```sh
npm run seed
```

To run the app 

```sh
npm run dev
```