import {processData} from '../processData';

describe('Data returned in the right format', ()=>{
  // eslint-disable-next-line max-len
  const input = '5 3 \n 0 0 N \n RFFLFF \n 1 1 S \n LLFFFRL';

  const output = {
    planet: [5, 3],
    // eslint-disable-next-line max-len
    robots: [[0, 0, 'N', ['R', 'F', 'F', 'L', 'F', 'F']], [1, 1, 'S', ['L', 'L', 'F', 'F', 'F', 'R', 'L']]],
  };
  it('should return an object', ()=>{
    const mockResponse = {
      status: jest.fn(),
      json: jest.fn(),
    };
    const response = processData(mockResponse, input);

    expect(response).toEqual(output);
  });
});
