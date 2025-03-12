import { TskvLogger } from './tskv.logger';

describe('TskvLogger tests', () => {
  let logger: TskvLogger;

  beforeEach(() => {
    logger = new TskvLogger();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('to tskv message in json format', () => {
    const mockData = jest.spyOn(console, 'log').mockImplementation(() => {});
    const message = 'tskv message';
    const mockOptionalParams = 'params';
    logger.log(message, mockOptionalParams);
    const expectedString = `level=log\tmessage=${message}\toptionalParams=${mockOptionalParams}\n`;
    expect(mockData).toHaveBeenCalledWith(expectedString);
  });

  it('to tskv error in json format', () => {
    const mockData = jest.spyOn(console, 'error').mockImplementation(() => {});
    const message = 'tskv message';
    const mockOptionalParams = 'params';
    logger.error(message, mockOptionalParams);
    const expectedString = `level=error\tmessage=${message}\toptionalParams=${mockOptionalParams}\n`;
    expect(mockData).toHaveBeenCalledWith(expectedString);
  });
});
