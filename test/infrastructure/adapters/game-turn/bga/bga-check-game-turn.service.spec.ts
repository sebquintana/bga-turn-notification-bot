import { Test, TestingModule } from "@nestjs/testing";
import { createMock } from "@golevelup/ts-jest";
import { ConfigService } from "@nestjs/config";
import { BGACheckGameTurnService } from "infrastructure/adapters/game-turn/bga/bga-check-game-turn.service";
import { InMemoryPlayerRepository } from "infrastructure/adapters/player/in-memory-player.repository";
import { Player } from "domain/entities/player.vo";

describe("BGACheckGameTurnService", () => {
  let bGACheckGameTurnService: BGACheckGameTurnService;
  const configServiceMock = createMock<ConfigService>();
  const playerRepository = new InMemoryPlayerRepository();
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BGACheckGameTurnService,
        {
          provide: ConfigService,
          useValue: configServiceMock,
        },
        {
          provide: "InMemoryPlayerRepository",
          useValue: playerRepository,
        },
      ],
    }).compile();
    bGACheckGameTurnService = module.get<BGACheckGameTurnService>(
      BGACheckGameTurnService
    );
  });

  it("tst", async () => {
    const player: Player = await bGACheckGameTurnService.checkGameTurn();
    expect(player.name).toBe("AxelZeta");
  });
});
