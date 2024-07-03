# Posts

This was my first nodejs application, my purpose was to learn how to handle url endpoints and SQL connections. Four years later, I decided to make it work again.

## Mistakes I've committed:

Do not ignore `node_modules`.
Do not save dependencies (there was no `package.json`!). 
Save passwords in the database connection file (they were local at least).
Do not have a setup or migrations for database.
Code in portuguese, instead of all english.
Useless comments.
Using raw promises instead of async/await.

## Things I've fixed:

- [x] Ignore node_modules (rewrite the history).
- [x] Save dependencies in `package.json`.
- [x] Use `.env` to handle sensitive info.
- [x] Configure containers to run the project with `docker-compose.yaml`.
- [ ] Lint and format code.
- [ ] Delete comments.
- [ ] Use async/await.

## Run the project (Node 20+ is required).

Create a `.env` file based on `.env.example` with your own info and run:

```sh
npm install
npm start
```

Or run with Docker.

```sh
docker compose up
```

## License

Project is licensed under MIT.
