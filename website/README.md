This website is built using [Docusaurus 2](https://v2.docusaurus.io/), a modern static website generator.

Note: `yarn` is required, otherwise some plugins dont work

## Installation

```sh
yarn
```

## Local Development

```sh
yarn start
```

This command starts a local development server and open up a browser window. Most changes are reflected live without having to restart the server.

## Build

```sh
yarn build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

## Deployment

```sh
GIT_USER=<Your GitHub username> USE_SSH=true yarn deploy
```

If you are using GitHub pages for hosting, this command is a convenient way to build the website and push to the `gh-pages` branch.
