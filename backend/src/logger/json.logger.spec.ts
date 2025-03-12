import { JsonLogger } from './json.logger';

describe('JsonLogger test', () => {
  let logger: JsonLogger;

  beforeEach(() => {
    logger = new JsonLogger();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('console message in json format', () => {
    const mockData = jest.spyOn(console, 'log').mockImplementation(() => {});
    const message = 'json message';
    logger.log(message);
    const expectedData = JSON.stringify({
      level: 'log',
      message,
      optionalParams: [],
    });
    expect(mockData).toHaveBeenCalledWith(expectedData);
  });

  it('console error in json format', () => {
    const mockData = jest.spyOn(console, 'error').mockImplementation(() => {});
    const message = 'json error message';
    logger.error(message);
    const expectedData = JSON.stringify({
      level: 'error',
      message,
      optionalParams: [],
    });
    expect(mockData).toHaveBeenCalledWith(expectedData);
  });
});
