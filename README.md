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

## The Game of Life React app

To create the app I used `create-react-app`, which is installed as a
dev dependency in the root folder, and rappresents the environment.

There is no need to install the `create-react-app`
(`npm i --save-dev` in the root folder), the dependency is there only
to explain the process of building the application

### How does it work

The app is composed by a GameOfLife class which encapsulate only
the logic of the game that can be used as a library.

The component that handles the user interface for GameOfLife class is `Board`.

The GameOfLife class is dependency-injected in the `Board` component by
the `App` component, which is the top of the component hierarchy and exposes
some settings like the framerate and the size of the canvas

### Borders

The board size is limited and the cells that are not rendered are
considered as dead cells, this causes the glider to become a square when
it reaches the edge of the map. is it possible to prevent this behaviour
setting `infinite={true}` property on the board element