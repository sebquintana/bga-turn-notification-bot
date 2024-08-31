import { Injectable } from "@nestjs/common";
import { Player } from "src/domain/entities/player.vo";
import { CheckGameTurnService } from "src/domain/ports/check-game-turn.service";
import puppeteer, { Page } from "puppeteer";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class BGACheckGameTurnService implements CheckGameTurnService {
  constructor(private readonly configService: ConfigService) {}

  async checkGameTurn(): Promise<Player> {
    // TODO: Implementar la logica para obtener el jugador actual del juego
    this.authenticateBga();
    // Loguearnos a la bga
    // Obtener el jugador actual del juego
    // devolverlo

    return new Player("Axel");
  }

  async authenticateBga(): Promise<void> {
    const password = this.configService.get<string>("PASSWORD");

    const browser = await puppeteer.launch({
      headless: false,
    });
    const page = await browser.newPage();
    await page.goto("https://es.boardgamearena.com/account");

    console.log(await page.title());
    await page.click("#username_input");

    // Ahora `popup` es una instancia de `Page` para el popup de Google
    await page.waitForSelector("#username_input"); // Espera que aparezca el campo de correo electrónico
    await page.type("#username_input", "AxelZeta"); // Rellena el correo electrónico

    // Espera el campo de contraseña y completa el formulario
    await page.waitForSelector('input[type="password"]');
    await page.type('input[type="password"]', password);
    await page.click("#submit_login_button");

    // Espera que la autenticación se complete y la página principal se actualice
    await page.waitForNavigation(); // no funciona como estoy esperando

    console.log(await page.title());

    //await browser.close();
  }
}
