# Interstellar Robots

### Table of contents

- [The premise](#The-premise)
- [Requirements](#Requirements)
- [Running the server](#Running-the-server)
- [Input](#Input)
- [Stats](#Stats)
- [Testing](#Testing)

### The premise

The surface of planet can be modelled by a rectangular grid around which robots are able to move according to instructions provided from Earth. You are to write a program that determines each sequence of robot positions and reports the final position of the robot.
A robot position consists of a grid coordinate (a pair of integers: x-coordinate followed by y coordinate) and an orientation (N, S, E, W for north, south, east, and west). A robot instruction is a string of the letters "L", "R", and "F" which represent, respectively, the instructions:
- Left: the robot turns left 90 degrees and remains on the current grid point.
- Right: the robot turns right 90 degrees and remains on the current grid point.
- Forward: the robot moves forward one grid point in the direction of the current orientation and maintains the same orientation.

The direction North corresponds to the direction from grid point (x, y) to grid point (x, y+1).

There is also a possibility that additional command types may be required in the future and provision should be made for this.

Since the grid is rectangular and bounded (...yes it is a strange planet), a robot that moves "off" an edge of the grid is lost forever. However, lost robots leave a robot "scent" that prohibits future robots from dropping off the world at the same grid point. The scent is left at the last grid position the robot occupied before disappearing over the edge. An instruction to move "off" the world  from a grid point from which a robot has been previously lost is simply ignored by the current robot

## Requirements

- MongoDB
- Node.js version 12.16 at least
- Typescript

This small back-end app interacts with a MongoDB database named **Robots** running on the default MongoDB port ```27017```. This database should contain two collections, one named **planets** and the other named **robots**.

## Running the server
To run the server in order to make the **POST** request to add planets, robots and move them around and to get the stats with **GET** follow this instructions: 
- Close the repo
- Run ```npm install```
- Run ```npm run build```
- Run ```npm start```

You are ready to make your API requests !

## Input

For this back-end project, you should pass the input with the following structure: 
```
{
data : 'PLANET_X PLANET_Y \n ROBOT0_X ROBOT0_Y ROBOT0_O \n ROBOT0_INSTRUCTIONS \n ROBOT1_X ROBOT1_Y ROBOT1_O \n ROBOT1_INSTRUCTIONS'
}
```

I.e as an object with a string in the data property. This object must be passed as the body with ```Content-Type : application/json``` of a **POST** request to the following endpoint : ```http://localhost:4300/input```

You can execute this either with [postman](https://www.postman.com/), [curl](https://curl.se/) or any other HTTP request service. 

Meaning of each parameter: 
- **PLANET_X, PLANET_Y** : x and y dimensions of the planet
- **ROBOT[NUMBER]_X, ROBOT[NUMBER]_Y** : starting x y positions of that specific robot in the planet
- **ROBOT[NUMBER]_O** : starting orientation of the robot (N,E,S,W)
- **ROBOT[NUMBER]_INSTRUCTIONS** : string of characters of instructions to execute to move the robot. They can either be L (for turn to the left for instance North to West), R(turn to the right for instance North to East), F(move forward towards robot's directions one square)
- **\n** : as instructions would naturally come from the front-end separated by a different line I am using the line breaker ```\n``` to divide the string into smaller chunks.

## Stats

To check how many robots there are on each planet, how many of them ended up lost and how many planets there are you simply have to make a **GET** request to the following endpoint: ````http://localhost:4300```

## Testing

To perform this small application's testing you can either build the image contained in the Dockerfile of the project and run a container from it or follow these instructions: 
- Clone the repo
- Run ```npm install```
- Run ```npm run build```
- Run ```npm test```
