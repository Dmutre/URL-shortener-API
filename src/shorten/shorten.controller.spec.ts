import { Test, TestingModule } from '@nestjs/testing';
import { ShortenController } from './shorten.controller';
import { ShortenService } from './shorten.service';

describe('ShortenController', () => {
  let controller: ShortenController;
  const mockedShortCode = 'DDDDDD';
  const mockedOriginalUrl = 'http://localhost:5005/website';
  const mockedShortcodeStat = {
    shortcode: mockedShortCode,
    url: mockedOriginalUrl,
    hitScore: 23,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ShortenController],
      providers: [
        {
          provide: ShortenService,
          useValue: {
            createShortCode: jest.fn().mockRejectedValue(mockedShortCode),
            getOriginalUrl: jest.fn().mockResolvedValue(mockedOriginalUrl),
            getShortcodeStats: jest.fn().mockResolvedValue(mockedShortcodeStat),
          },
        },
      ],
    }).compile();

    controller = module.get<ShortenController>(ShortenController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
