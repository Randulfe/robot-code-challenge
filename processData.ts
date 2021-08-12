import {Response} from 'express';

export const processData = function(res:any, str:string) {
  const data:any = {};
  const orientations = ['N', 'W', 'S', 'E'];
  const instructions:Array<string> = str.split('\n');

  // array for x, y of planet dimensions
  let planetDimensions:Array<string> = instructions[0].split(' ');
  planetDimensions = planetDimensions.filter((e)=>e);
  data.planet = [];
  data.planet.push( parseInt(planetDimensions[0]) );
  data.planet.push( parseInt(planetDimensions[1]) );
  // eslint-disable-next-line max-len
  if (data.planet[0]>50 || data.planet[1]>50 || data.planet[0]<0 || data.planet[1]<0) {
    // eslint-disable-next-line max-len
    return res.status(400).send({message: 'planet size coordinates must be between 0 and 50'});
  }

  data.robots = [];

  for (let i=1; i<instructions.length; i++) {
    if (i%2 == 0) {
      // instructions
      let orders:Array<string> = instructions[i].split('');
      orders = orders.filter((e)=>e != ' ');
      if (orders.length >100 || orders.length==-1) {
        // eslint-disable-next-line max-len
        return res.status(400).send({message: 'Instruction string must be between 1 and 100 characters'});
      }
      data.robots[(i/2)-1].push(orders );
    } else {
      // robot starting position
      data.robots.push([]);
      let robotValues:Array<string> = instructions[i].split(' ');
      robotValues = robotValues.filter((e)=>e);

      // eslint-disable-next-line max-len
      if (parseInt(robotValues[0])>50 || parseInt(robotValues[1])>50 || parseInt(robotValues[0])<0 || parseInt(robotValues[1])<0) {
        // eslint-disable-next-line max-len
        return res.status(400).send({message: 'Robot coordinates must be within 0 to 50'});
      }

      if (orientations.indexOf(robotValues[2])==-1) {
        // eslint-disable-next-line max-len
        return res.status(400).send({message: 'Robot orientation must be either N, W, S or E'});
      }
      data.robots[i/2-0.5].push( parseInt(robotValues[0]) );
      data.robots[i/2-0.5].push( parseInt(robotValues[1]) );
      data.robots[i/2-0.5].push( robotValues[2] );
    }
  }
  return data;
};
