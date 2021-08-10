'use strict';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var helmet = require('helmet');
var mongoose_1 = __importDefault(require("mongoose"));
var planet_1 = require("./models/planet");
var robot_1 = require("./models/robot");
var DATABASE = 'mongodb://localhost:27017/Robots';
var PORT = 4300;
var app = express_1.default();
app.use(helmet());
// Body parser
app.use(express_1.default.json());
app.post('/input', function (req, res) {
    // Get string of input and separate each line
    var input = req.body.data;
    var instructions = input.split('\n');
    // Create world of x y size
    var planetDimensions = instructions[0].split(' ');
    planetDimensions = planetDimensions.filter(function (e) { return e; });
    console.log(planetDimensions);
    var planet = new planet_1.PlanetModel();
    planet.x = parseInt(planetDimensions[0]);
    planet.y = parseInt(planetDimensions[1]);
    // save planet in db
    planet.save(function (err, savedPlanet) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            // eslint-disable-next-line max-len
            if (err)
                return [2 /*return*/, res.status(500).send({ message: 'Error adding planet to the database' })];
            console.log('planet added');
            return [2 /*return*/];
        });
    }); });
    // LOOP OVER THIS
    // Create robot in x y o inside z planet
    var robotValues = instructions[1].split(' ');
    robotValues = robotValues.filter(function (e) { return e; });
    var robot = new robot_1.RobotModel();
    console.log(robotValues);
    robot.x = parseInt(robotValues[0]);
    robot.y = parseInt(robotValues[1]);
    robot.o = robotValues[2];
    console.log(robot);
    robot.save(function (err, savedRobot) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            // eslint-disable-next-line max-len
            if (err)
                return [2 /*return*/, res.status(500).send({ message: err })];
            console.log('robot added');
            return [2 /*return*/, res.status(200).send(savedRobot)];
        });
    }); });
    // Read set of instructions and calculate end postion
    // Update robot state in the planet
    // repeat
});
// eslint-disable-next-line max-len
mongoose_1.default.connect(DATABASE, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });
// Get notified if we got connected successfully or not
var db = mongoose_1.default.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function () {
    console.log('Successful conection to the database');
    app.listen(PORT, function () {
        console.log("server starting on PORT: " + PORT);
    });
});
