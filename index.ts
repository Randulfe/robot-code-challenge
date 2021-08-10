'use strict';
import express, {Request, Response} from 'express';
const helmet = require('helmet');
import mongoose, {Schema, Document} from 'mongoose';

import {Planet, PlanetModel} from './models/planet';
import {Robot, RobotModel} from './models/robot';

const DATABASE:string = 'mongodb://localhost:27017/Robots';
const PORT:Number = 4300;

const app = express();

app.use(helmet());

// Body parser
app.use(express.json());

app.post('/input', (req: Request, res: Response)=>{
  // Get string of input and separate each line
  const input:String = req.body.data;
  const instructions:Array<string> = input.split('\n');

  // Create world of x y size
  let planetDimensions:Array<string> = instructions[0].split(' ');
  planetDimensions = planetDimensions.filter((e)=>e);
  console.log(planetDimensions);
  const planet = new PlanetModel();
  planet.x = parseInt(planetDimensions[0]);
  planet.y = parseInt(planetDimensions[1]);

  // save planet in db
  planet.save(async (err:any, savedPlanet:Planet)=>{
    // eslint-disable-next-line max-len
    if (err) return res.status(500).send({message: 'Error adding planet to the database'});
    console.log('planet added');
  });


  // WAIT FOR FIRST THE PLANET TO BE ADDED
  // STORE PLANET ID AND ADD IT TO ROBOT 



  // LOOP OVER THIS
  // Create robot in x y o inside z planet
  let robotValues:Array<string> = instructions[1].split(' ');
  robotValues = robotValues.filter((e)=>e);
  let robot = new RobotModel();
  console.log(robotValues);
  robot.x = parseInt(robotValues[0]);
  robot.y = parseInt(robotValues[1]);
  robot.o = robotValues[2];

  console.log(robot);
  robot.save(async (err:any, savedRobot:Robot)=>{
    // eslint-disable-next-line max-len
    if (err) return res.status(500).send({message: err});
    console.log('robot added');
    return res.status(200).send(savedRobot);
  });
  // Read set of instructions and calculate end postion

  // Update robot state in the planet

  // repeat
});

// eslint-disable-next-line max-len
mongoose.connect(DATABASE, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false});

// Get notified if we got connected successfully or not
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));

db.once('open', function() {
  console.log('Successful conection to the database');

  app.listen(PORT, ()=>{
    console.log(`server starting on PORT: ${PORT}`);
  });
});
