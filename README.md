# Game Of Life React

My implementation of John Conway's Game Of Life

# Requirements

- NodeJs

## installation

- clone repo `git clone https://github.com/antcolag/game-of-life-react.git`
- install packages `cd game-of-life-react; npm i`

## Play

- build, watch and run on localhost:3000 `npm start`
- build production `npm run build`

### Using production build

To use the production build you have to serve the files in the `build` directory
with an http server, for example you can run `python -m http.server` in the
`build` folder to have a static file server on `http://localhost:8000`

## The Game of Life React app

To create the app I used `create-react-app`, which is installed as a
dev dependency in the root folder.

There is no need to install the `create-react-app`
(`npm i --save-dev` in the root folder), the dependency is there only
to show the tool I used to create this application

### How does it work

The app is composed by a GameOfLife class which encapsulate
the logic of the game.

The component that handles the user interface for GameOfLife class is `Board`.

The GameOfLife class is dependency-injected in the `Board` by
the `App` component, which is the top of the component hierarchy and exposes
a few input elements to handle settings like the framerate and the size of the
canvas, as well as the *infinite* behaviour described below

## Borders and infinite behaviour

The board size is limited by default and the cells that are not rendered are
considered as dead cells.

It is possible to prevent this behaviour by setting `infinite={true}` on the
`board` element