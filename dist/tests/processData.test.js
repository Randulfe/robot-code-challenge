"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var processData_1 = require("../processData");
describe('Data returned in the right format', function () {
    // eslint-disable-next-line max-len
    var input = '5 3 \n 0 0 N \n RFFLFF \n 1 1 S \n LLFFFRL';
    var output = {
        planet: [5, 3],
        // eslint-disable-next-line max-len
        robots: [[0, 0, 'N', ['R', 'F', 'F', 'L', 'F', 'F']], [1, 1, 'S', ['L', 'L', 'F', 'F', 'F', 'R', 'L']]],
    };
    it('should return an object', function () {
        var mockResponse = {
            status: jest.fn(),
            json: jest.fn(),
        };
        var response = processData_1.processData(mockResponse, input);
        expect(response).toEqual(output);
    });
});
