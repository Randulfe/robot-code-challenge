"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.processData = void 0;
var processData = function (str) {
    var data = {};
    var instructions = str.split('\n');
    // array for x, y of planet dimensions
    var planetDimensions = instructions[0].split(' ');
    planetDimensions = planetDimensions.filter(function (e) { return e; });
    data.planet = [];
    console.log(planetDimensions);
    data.planet.push(parseInt(planetDimensions[0]));
    data.planet.push(parseInt(planetDimensions[1]));
    data.robots = [];
    console.log(instructions, instructions.length);
    for (var i = 1; i < instructions.length; i++) {
        if (i % 2 == 0) {
            // instructions
            var orders = instructions[i].split('');
            orders = orders.filter(function (e) { return e != ' '; });
            console.log(orders);
            data.robots[(i / 2) - 1].push(orders);
        }
        else {
            // robot starting position
            data.robots.push([]);
            var robotValues = instructions[i].split(' ');
            robotValues = robotValues.filter(function (e) { return e; });
            console.log(robotValues);
            console.log(data.robots, 'index: ', i, 'value: ', (1 * i) - 1);
            data.robots[i / 2 - 0.5].push(parseInt(robotValues[0]));
            data.robots[i / 2 - 0.5].push(parseInt(robotValues[1]));
            data.robots[i / 2 - 0.5].push(robotValues[2]);
        }
    }
    console.log(data);
    return data;
};
exports.processData = processData;
