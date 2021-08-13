'use strict';
import express, {Request, Response} from 'express';
import helmet from 'helmet';
import mongoose from 'mongoose';

// Import mongoose models and util functions
import {PlanetModel} from './models/planet';
import {RobotModel} from './models/robot';
import {runCommands} from './runInstructions';
import {processData} from './processData';

// DB and server info
const DATABASE:string = 'mongodb://localhost:27017/Robots';
const PORT:Number = 4300;

export const app = express();

// security headers middleware
app.use(helmet());

// Body parser
app.use(express.json());

// CREATE ROBOT, PLANET AND RUN INSTRUCTIONS
app.post('/input', async (req: Request, res: Response)=>{
  // Get and process data
  const input:string = req.body.data;
  const data = processData(res, input);

  // create new planet
  const planet = new PlanetModel();
  planet.x = data.planet[0];
  planet.y = data.planet[1];
  try {
    // save planet in db
    const createdPlanet = await planet.save();
    // array of robots to send in the response
    const robots = [];
    // iterate over each robot with its own instruction
    for (const singleRobot of data.robots) {
      // create new robot
      const robot = new RobotModel();
      robot.x = singleRobot[0];
      robot.y = singleRobot[1];
      robot.o = singleRobot[2];
      robot.planet = createdPlanet._id;
      try {
        // save each robot
        let createdRobot = await robot.save();

        // read instructions and execute robot movements
        createdRobot = runCommands(createdPlanet, createdRobot, singleRobot[3]);
        // save final position of each robot
        createdRobot.save();
        // add it to the response array
        robots.push(robot);
      } catch (e) {
        return res.status(500).send({message: 'error saving robot', error: e});
      }
    }
    // eslint-disable-next-line max-len
    return res.status(200).send({message: 'Finished', robots: robots, planet: planet});
  } catch (e) {
    return res.status(500).send({message: 'error saving planet', error: e});
  }
});

// RETURN STATS OF THE DB
app.get('/', async (req: express.Request, res: express.Response)=>{
  // return total robots per planet
  // eslint-disable-next-line max-len
  const result = await RobotModel.aggregate([{$match: {}}, {$group: {_id: '$planet', count: {$sum: 1}}}]);
  // return total lost robots per planet
  // eslint-disable-next-line max-len
  const lost = await RobotModel.aggregate([{$match: {lost: 'LOST'}}, {$group: {_id: '$planet', count: {$sum: 1}}}]);

  // total number of planets in the db
  const planetsNumber = await PlanetModel.count();
  // eslint-disable-next-line max-len
  return res.status(200).send({total_planets: planetsNumber, robots_per_planet: result, robots_lost_per_planet: lost});
});

// connect to the database
// eslint-disable-next-line max-len
mongoose.connect(DATABASE, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false});

// Get notified if we got connected successfully or not
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));

// open db and start server
export const server = db.once('open', function() {
  console.log('Successful conection to the database');

  app.listen(PORT, ()=>{
    console.log(`server starting on PORT: ${PORT}`);
  });
  module.exports = server;
});

