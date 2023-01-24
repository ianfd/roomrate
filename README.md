# Roomrate

Roomrate is a web-app that can help you determine what room would be the best choice to be upgraded.

This depends on various factors.

- The audio medium installed in the room.
- How accessible the room is.
- What conference system is installed in the room.
- How big the construction effort would be in case of an upgrade.
- How bug the technical effort would be in case of an upgrade.
- What image medium is installed in the room.

In the end a score will be computed to determine what room should be upgraded next given all entered rooms.

----

The structure is the following:

A university has many FACULTIES.

Each FACULTY has many BUILDINGS.

Each BUILDING has many rooms.

----

This also provides a simple JWT authentication, you can create users in the database. In the future there will 
be the possibility for an administrator to create more users from the web interface. For now it's database only.

----

Technical requirements / structure / advice

- The backend is built with NestJS and uses a PostgreSQL database to store all data. 
  - You can set environment variables or use the env folder in the backend folder to create a env file.
  - If you created a env file ``<NAME>.env``, you can start your backend with ``NODE_ENV=<NAME> node dist/main`` after you've built it with ``npm build``.
- The fontend is build with Angular and NG-Bootstrap.
  - To connect the frontend with the backend use the (in the frontend folder) ``src/environments/environment.prod.ts`` and replace the ``backend`` property with your backend url. Then build the angular app.
  - Then deploy your angular app as usual.

----

## Future ideas:

- easy deployment with docker containers, for both front- and backend
- add user creation to the UI
- add an internal logs page to display all internal logs
- add more search capability
- add more sorting capability

----

This project was developed at [Saarland University](https://www.uni-saarland.de/projekt/digitalisierung.html), by Ian F. Diks.

