"use strict";
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
// ADD TEST FOR THE GENERAL THING OF EVERYTHING
// DOCKERIZE
// CREATE README
var index_1 = require("../index");
var supertest_1 = __importDefault(require("supertest"));
var mongoose_1 = __importDefault(require("mongoose"));
var api = supertest_1.default(index_1.app);
describe('POST create planet and robots from instruction set', function () {
    var input = { data: '5 3 \n 0 0 N \n FFRLFF \n 1 1 S \n RF' };
    var robots = [{ x: 0, y: 4, o: 'N' }, { x: 0, y: 1, o: 'W' }];
    var planet = { x: 5, y: 3 };
    it('should return created robots and planets', function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, api.post('/input').send(input).expect(200).expect('Content-Type', /application\/json/)];
                case 1:
                    response = _a.sent();
                    expect(response.body.message).toEqual('Finished');
                    expect(response.body.planet).toMatchObject(planet);
                    expect(response.body.robots[0]).toMatchObject(robots[0]);
                    expect(response.body.robots[1]).toMatchObject(robots[1]);
                    return [2 /*return*/];
            }
        });
    }); });
});
describe('GET stats for the total amount of robots and planets', function () {
    it('should return a nested object with stats', function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, api.get('/').expect(200).expect('Content-Type', /application\/json/)];
                case 1:
                    response = _a.sent();
                    expect(response.body.total_planets).toEqual(1);
                    expect(response.body.robots_per_planet[0]).toMatchObject({ count: 2 });
                    expect(response.body.robots_lost_per_planet[0]).toMatchObject({ count: 1 });
                    return [2 /*return*/];
            }
        });
    }); });
});
afterAll(function () {
    mongoose_1.default.connection.close();
    index_1.server.close();
});
