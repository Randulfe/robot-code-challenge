import {PlanetModel} from '../models/planet';
import {RobotModel} from '../models/robot';
import {runCommands} from '../runInstructions';

describe('check that robot displacements are executed correctly', ()=>{
  const createdPlanet = new PlanetModel();
  createdPlanet.x = 5; createdPlanet.y = 3;
  const createdRobot = new RobotModel();
  createdRobot.x = 0; createdRobot.y = 0; createdRobot.o = 'N';
  createdRobot.planet = createdPlanet._id;
  const orders = ['F', 'F', 'R', 'F', 'L', 'F'];
  // eslint-disable-next-line max-len
  const output = {x: 1, y: 3, o: 'N'};
  it('should return the right position of the robots', ()=>{
    const response = runCommands(createdPlanet, createdRobot, orders);
    expect(response).toMatchObject(output);
  });
});


// ADD TEST FOR THE GENERAL THING OF EVERYTHING
// DOCKERIZE
// CREATE README
