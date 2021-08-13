// ADD TEST FOR THE GENERAL THING OF EVERYTHING
// DOCKERIZE
// CREATE README
import {app, server} from '../index';
import supertest from 'supertest';
import mongoose from 'mongoose';

const api = supertest(app);

describe('POST create planet and robots from instruction set', ()=>{
  const input = {data: '5 3 \n 0 0 N \n FFRLFF \n 1 1 S \n RF'};

  const robots = [{x: 0, y: 4, o: 'N'}, {x: 0, y: 1, o: 'W'}];
  const planet = {x: 5, y: 3};
  it('should return created robots and planets', async ()=>{
    // eslint-disable-next-line max-len
    const response = await api.post('/input').send(input).expect(200).expect('Content-Type', /application\/json/);
    expect(response.body.message).toEqual('Finished');
    expect(response.body.planet).toMatchObject(planet);
    expect(response.body.robots[0]).toMatchObject(robots[0]);
    expect(response.body.robots[1]).toMatchObject(robots[1]);
  });
});

describe('GET stats for the total amount of robots and planets', ()=>{
  it('should return a nested object with stats', async ()=>{
    // eslint-disable-next-line max-len
    const response = await api.get('/').expect(200).expect('Content-Type', /application\/json/);
    expect(response.body.total_planets).toEqual(1);
    expect(response.body.robots_per_planet[0]).toMatchObject({count: 2});
    expect(response.body.robots_lost_per_planet[0]).toMatchObject({count: 1});
  });
});

afterAll(()=>{
  mongoose.connection.close();
  server.close();
});
