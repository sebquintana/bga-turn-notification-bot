import { Injectable } from "@nestjs/common";
import { Player } from "src/domain/entities/player.vo";
import { CheckGameTurnService } from "src/domain/ports/check-game-turn.service";

import { ConfigService } from "@nestjs/config";
import * as puppeteer from "puppeteer";
import { Page } from "puppeteer"; // Importa el tipo Page

@Injectable()
export class BGACheckGameTurnService implements CheckGameTurnService {
  private page: Page; // Ahora el tipo de page es correctamente Page

  constructor(private readonly configService: ConfigService) {}

  async checkGameTurn(game?: string): Promise<Player> {
    // Lógica para obtener el jugador actual del juego
    await this.authenticateBga(); // Nos autenticamos
    const currentTurnInGames = await this.getGamesTurns(); // Obtenemos la información de las partidas en curso

    console.log({ currentTurnInGames });

    let gameInfo = currentTurnInGames.find((info) => info.game === game);

    console.log({ gameInfo });

    return new Player("Axel");
  }

  private async authenticateBga(): Promise<void> {
    const password = this.configService.get<string>("PASSWORD");

    const browser = await puppeteer.launch({
      headless: false,
    });
    this.page = await browser.newPage();
    await this.page.goto("https://es.boardgamearena.com/account");

    console.log(await this.page.title());

    // Rellenar nombre de usuario y contraseña
    await this.page.waitForSelector("#username_input");
    await this.page.type("#username_input", "AxelZeta");

    await this.page.waitForSelector('input[type="password"]');
    await this.page.type('input[type="password"]', password); // Usar password del configService

    // Iniciar sesión
    await this.page.click("#submit_login_button");

    // Esperar a que la autenticación se complete y la página principal cargue
    await this.page.waitForNavigation();
  }

  private async getGamesTurns(): Promise<any> {
    // Aquí asumimos que ya estamos autenticados y en la página principal
    await this.page.waitForSelector(
      "div.bga-player-avatar__pulser-holder.svelte-xa780p"
    );
    await this.page.click("div.bga-player-avatar__pulser-holder.svelte-xa780p");

    await this.page.waitForSelector(".corner-animations");

    // Extraer información de los elementos hijos
    const info = await this.page.evaluate(() => {
      const parentElement = document.querySelector(
        "div#overall-content > div:nth-of-type(9) > div:nth-of-type(3) > div:nth-of-type(2) > div:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(1)"
      );

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
