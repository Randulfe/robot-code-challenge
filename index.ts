'use strict';
import express, {Request, Response} from 'express';
const helmet = require('helmet');
import mongoose, {Schema, Document} from 'mongoose';

import {Planet, PlanetModel} from './models/planet';
import {Robot, RobotModel} from './models/robot';
import {runCommands} from './runInstructions';
import {processData} from './processData';

const DATABASE:string = 'mongodb://localhost:27017/Robots';
const PORT:Number = 4300;

export const app = express();

app.use(helmet());

// Body parser
app.use(express.json());

app.post('/input', async (req: Request, res: Response)=>{
  // Get string of input and separate each line
  const input:string = req.body.data;
  const data = processData(res, input);
  // Create world of x y size

  const planet = new PlanetModel();
  planet.x = data.planet[0];
  planet.y = data.planet[1];
  // save planet in db
  try {
    const createdPlanet = await planet.save();
    // Loop over this
    for (const singleRobot of data.robots) {
      const robot = new RobotModel();
      robot.x = singleRobot[0];
      robot.y = singleRobot[1];
      robot.o = singleRobot[2];
      robot.planet = createdPlanet._id;
      try {
        let createdRobot = await robot.save();
        // Read set of instructions and calculate end postion

        createdRobot = runCommands(createdPlanet, createdRobot, singleRobot[3]);
        createdRobot.save();
      } catch (e) {
        return res.status(500).send({message: 'error saving robot', error: e});
      }
    }
    return res.status(200).send({message: 'Finished'});
  } catch (e) {
    return res.status(500).send({message: 'error saving planet', error: e});
  }
});

app.get('/', async (req: express.Request, res: express.Response)=>{
  // eslint-disable-next-line max-len
  const result = await RobotModel.aggregate([{$match: {}}, {$group: {_id: '$planet', count: {$sum: 1}}}]);
  // eslint-disable-next-line max-len
  const lost = await RobotModel.aggregate([{$match: {lost: 'LOST'}}, {$group: {_id: '$planet', count: {$sum: 1}}}]);

  const planetsNumber = await PlanetModel.count();
  // eslint-disable-next-line max-len
  return res.status(200).send({total_planets: planetsNumber, robots_per_planet: result, robots_lost_per_planet: lost});
});

// eslint-disable-next-line max-len
mongoose.connect(DATABASE, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false});

// Get notified if we got connected successfully or not
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));

db.once('open', function() {
  console.log('Successful conection to the database');

  const server = app.listen(PORT, ()=>{
    console.log(`server starting on PORT: ${PORT}`);
  });
  module.exports = server;
});

