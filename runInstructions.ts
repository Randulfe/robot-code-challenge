import {Robot} from './models/robot';
import {Planet} from './models/planet';

// eslint-disable-next-line max-len
export const runCommands = function(createdPlanet:Planet, createdRobot:Robot, orders:Array<string>) {
  const directions:Array<string> = ['N', 'E', 'S', 'W'];
  // Get index in orientation matrix
  let robotOrientation = directions.indexOf(createdRobot.o);

  // iterate over all orders
  for (const order of orders) {
    // apply right / left turns
    if (order==='R') {
      robotOrientation = robotOrientation + 1;
      if (robotOrientation>3) {
        robotOrientation = 0;
      }
    } else if (order==='L') {
      robotOrientation = robotOrientation - 1;
      if (robotOrientation<0) {
        robotOrientation = 3;
      }
    // apply forward moves
    } else {
      switch (robotOrientation) {
        case 0: {
          createdRobot.y += 1;
          break;
        }
        case 1: {
          createdRobot.x += 1;
          break;
        }
        case 2: {
          createdRobot.y -= 1;
          break;
        }
        case 3: {
          createdRobot.x -= 1;
          break;
        }
      }
    }
    // check if robot out of planet
    // eslint-disable-next-line max-len
    if (createdRobot.x > createdPlanet.x || createdRobot.y > createdPlanet.y || createdRobot.x <0 || createdRobot.y<0) {
      createdRobot.lost = 'LOST';
      break;
    }
    createdRobot.o = directions[robotOrientation];
  }
  return createdRobot;
};
