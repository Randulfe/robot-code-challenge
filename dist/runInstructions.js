"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.runCommands = void 0;
// eslint-disable-next-line max-len
var runCommands = function (createdPlanet, createdRobot, orders) {
    var directions = ['N', 'E', 'S', 'W'];
    // Get index in orientation matrix
    var robotOrientation = directions.indexOf(createdRobot.o);
    // iterate over all orders
    for (var _i = 0, orders_1 = orders; _i < orders_1.length; _i++) {
        var order = orders_1[_i];
        // apply right / left turns
        if (order === 'R') {
            robotOrientation = robotOrientation + 1;
            if (robotOrientation > 3) {
                robotOrientation = 0;
            }
        }
        else if (order === 'L') {
            robotOrientation = robotOrientation - 1;
            if (robotOrientation < 0) {
                robotOrientation = 3;
            }
            // apply forward moves
        }
        else {
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
        if (createdRobot.x > createdPlanet.x || createdRobot.y > createdPlanet.y || createdRobot.x < 0 || createdRobot.y < 0) {
            createdRobot.lost = 'LOST';
            break;
        }
        createdRobot.o = directions[robotOrientation];
    }
    return createdRobot;
};
exports.runCommands = runCommands;
