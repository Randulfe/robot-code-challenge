// function to process input data
export const processData = function(res:any, str:string) {
  const data:any = {};
  // reference for the orientation array
  const orientations = ['N', 'W', 'S', 'E'];
  // split instructions by separate line
  const instructions:Array<string> = str.split('\n');

  // array for x, y of planet dimensions
  let planetDimensions:Array<string> = instructions[0].split(' ');
  planetDimensions = planetDimensions.filter((e)=>e);
  data.planet = [];
  data.planet.push( parseInt(planetDimensions[0]) );
  data.planet.push( parseInt(planetDimensions[1]) );
  // check planet size is within requirements
  // eslint-disable-next-line max-len
  if (data.planet[0]>50 || data.planet[1]>50 || data.planet[0]<0 || data.planet[1]<0) {
    // eslint-disable-next-line max-len
    return res.status(400).send({message: 'planet size coordinates must be between 0 and 50'});
  }

  // array of robots x,y,o with each one's instructions
  data.robots = [];

  for (let i=1; i<instructions.length; i++) {
    // even elements corresponds to robots instructions
    if (i%2 == 0) {
      // instructions
      let orders:Array<string> = instructions[i].split('');
      orders = orders.filter((e)=>e != ' ');
      // check char size of instructions within allowed range
      if (orders.length >100 || orders.length==-1) {
        // eslint-disable-next-line max-len
        return res.status(400).send({message: 'Instruction string must be between 1 and 100 characters'});
      }
      // add orders to each robot's array
      data.robots[(i/2)-1].push(orders );
    } else {
      // robot starting position
      data.robots.push([]);
      let robotValues:Array<string> = instructions[i].split(' ');
      robotValues = robotValues.filter((e)=>e);

      // check robot starting position is within the allowed range
      // eslint-disable-next-line max-len
      if (parseInt(robotValues[0])>50 || parseInt(robotValues[1])>50 || parseInt(robotValues[0])<0 || parseInt(robotValues[1])<0) {
        // eslint-disable-next-line max-len
        return res.status(400).send({message: 'Robot coordinates must be within 0 to 50'});
      }

      // check if orientation is one of the 4 allowed characters
      if (orientations.indexOf(robotValues[2])==-1) {
        // eslint-disable-next-line max-len
        return res.status(400).send({message: 'Robot orientation must be either N, W, S or E'});
      }
      // add robot position and orientation
      data.robots[i/2-0.5].push( parseInt(robotValues[0]) );
      data.robots[i/2-0.5].push( parseInt(robotValues[1]) );
      data.robots[i/2-0.5].push( robotValues[2] );
    }
  }
  return data;
};
