import { Inject, Injectable } from "@nestjs/common";
import { Player } from "domain/entities/player.vo";
import { CheckGameTurnService } from "domain/ports/check-game-turn.service";
import { ConfigService } from "@nestjs/config";
import { Browser, Page } from "puppeteer-core";
import puppeteer from "puppeteer-core";
import chromium from "@sparticuz/chromium-min";
import { PlayerRepository } from "domain/ports/player.repository";
import path from "path";
import * as fs from "fs";

@Injectable()
export class BGACheckGameTurnService implements CheckGameTurnService {
  private page: Page;

  constructor(
    private readonly configService: ConfigService,
    @Inject("InMemoryPlayerRepository")
    private playerRepository: PlayerRepository
  ) {}

  async checkGameTurn(game?: string): Promise<Player> {
    await this.authenticateBga();
    const currentTurnInGames = await this.getGamesTurns();

    console.log({ currentTurnInGames });

    let gameInfo = currentTurnInGames.find((info) => info.game === game);

    console.log({ gameInfo });

    return this.playerRepository.findByBgaNickName(gameInfo.player);
  }

  private async authenticateBga(): Promise<void> {
    try {
      const password = this.configService.get<string>("PASSWORD");
      console.log({ password });

      const browser = await this.getBrowser();

      this.page = await browser.newPage();
      await this.page.setUserAgent(
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko)"
      );
      await this.page.goto("https://es.boardgamearena.com/account");

      console.log(
        `Nos vamos a autenticar Page Title: ${await this.page.title()}`
      );

      await this.page.waitForSelector("#username_input");
      await this.page.type("#username_input", "AxelZeta");

      await this.page.waitForSelector('input[type="password"]');
      await this.page.type('input[type="password"]', "password");

      await this.page.click("#submit_login_button");

      await this.page.waitForNavigation();
      console.log(
        `Ya estamos autenticados Page Title: ${await this.page.title()}`
      );
      console.log("Autenticado");
    } catch (error) {
      console.error("Error al autenticar", error);
    }
  }

  private async getBrowser(): Promise<Browser> {
    const isLambda = process.env.ENVIRONMENT == "PROD";
    this.createTempDir();

    let executablePath: string;
    let args: string[];
    let headless;

    if (isLambda) {
      executablePath = "/opt/nodejs/node_modules/@sparticuz/chromium/bin";
      args = [...chromium.args, "--hide-scrollbars", "--disable-web-security"];
      headless = chromium.headless;
    } else {
      // Local development environment
      // Use Puppeteer's default Chromium or your local Chrome installation
      executablePath = await this.getLocalChromiumExecutablePath();
      args = ["--hide-scrollbars", "--disable-web-security"];
      headless = true;
    }

    const browser = await puppeteer.launch({
      args: args,
      defaultViewport: chromium.defaultViewport,
      executablePath: executablePath,
      headless: headless,
    });

    console.log("browser", browser);
    return browser;
  }

  private async getLocalChromiumExecutablePath(): Promise<string> {
    try {
      const puppeteer = require("puppeteer");
      return puppeteer.executablePath();
    } catch (error) {
      console.error("Error getting Puppeteer executable path:", error);
    }
    const localChromePath = "/usr/bin/google-chrome"; // Linux example
    // const localChromePath = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'; // macOS example
    // const localChromePath = 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe'; // Windows example

    if (fs.existsSync(localChromePath)) {
      return localChromePath;
    } else {
      throw new Error("Could not find local Chromium or Chrome executable.");
    }
  }

  private createTempDir() {
    const nssDbDir = path.join(process.env.HOME, ".pki", "nssdb");
    if (!fs.existsSync(nssDbDir)) {
      fs.mkdirSync(nssDbDir, { recursive: true, mode: 0o700 });
    }
    const userDataDir = "/tmp/user-data";
    if (!fs.existsSync(userDataDir)) {
      fs.mkdirSync(userDataDir, { recursive: true });
    }

    const fontConfigDir = "/tmp/fonts";
    if (!fs.existsSync(fontConfigDir)) {
      fs.mkdirSync(fontConfigDir, { recursive: true });
    }

    const fontConfigFile = path.join(fontConfigDir, "fonts.conf");
    if (!fs.existsSync(fontConfigFile)) {
      const fontConfigContent = `
    <?xml version="1.0"?>
    <!DOCTYPE fontconfig SYSTEM "fonts.dtd">
    <fontconfig>
      <dir>/var/task/fonts</dir>
      <cachedir>/tmp/fonts/cache</cachedir>
      <config></config>
    </fontconfig>
  `;
      fs.writeFileSync(fontConfigFile, fontConfigContent);
    }
  }

  private async getGamesTurns(): Promise<any> {
    console.log(`getGamesTurns`);
    // Aquí asumimos que ya estamos autenticados y en la página principal
    await this.page.waitForSelector(
      "div.bga-player-avatar__pulser-holder.svelte-xa780p"
    );
    await this.page.click("div.bga-player-avatar__pulser-holder.svelte-xa780p");

    await this.page.waitForSelector(".corner-animations");

    console.log(`getGamesTurns: ${await this.page.title()}`);

    // Extraer información de los elementos hijos
    const info = await this.page.evaluate(() => {
      const parentElement = document.querySelector(
        "div#overall-content > div:nth-of-type(9) > div:nth-of-type(3) > div:nth-of-type(2) > div:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(1)"
      );

      console.log(`Listado de partidas: ${JSON.stringify(parentElement)}`);
      if (parentElement) {
        const children = Array.from(parentElement.children) as HTMLElement[];
        const childInfos = children.map((child) => {
          const textLines = child.innerText.split("\n");
          const turnInfo = textLines[2].split(" - ");

          return {
            game: textLines[0],
            player: turnInfo[0],
            days: turnInfo[1],
          };
        });
        return childInfos;
      }
      return null;
    });

    return info;
  }
}
