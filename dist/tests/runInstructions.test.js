"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var planet_1 = require("../models/planet");
var robot_1 = require("../models/robot");
var runInstructions_1 = require("../runInstructions");
describe('check that robot displacements are executed correctly', function () {
    var createdPlanet = new planet_1.PlanetModel();
    createdPlanet.x = 5;
    createdPlanet.y = 3;
    var createdRobot = new robot_1.RobotModel();
    createdRobot.x = 0;
    createdRobot.y = 0;
    createdRobot.o = 'N';
    createdRobot.planet = createdPlanet._id;
    var orders = ['F', 'F', 'R', 'F', 'L', 'F'];
    // eslint-disable-next-line max-len
    var output = { x: 1, y: 3, o: 'N' };
    it('should return the right position of the robots', function () {
        var response = runInstructions_1.runCommands(createdPlanet, createdRobot, orders);
        expect(response).toMatchObject(output);
    });
});
