import { expect, Locator, Page } from "@playwright/test";

import { NavbarComponent } from "./components/navbarComponent";
import { EditProfilePage } from "./editProfilePage";

import path from "path";
import fs from "fs";



export class ViewProfilePage {
  readonly url = "https://internship.serverbb.online/perfil/estudiante";
  readonly page: Page;

  readonly navbar: NavbarComponent;

  readonly editProfileButton: Locator;

  readonly numeroCelular: Locator;

  readonly carrera: Locator;
  readonly anioIngreso: Locator;
  readonly descripcion: Locator;

  readonly agregarCurriculumsButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.navbar = new NavbarComponent(page);
    this.editProfileButton = this.page.locator('#editarPerfil');
    this.numeroCelular = this.page.locator("#valueTelefonoEstudiante");
    this.carrera = this.page.locator("#valueCarreraEstudiante");
    this.anioIngreso = this.page.locator("#valueAnioIngresoEstudiante");
    this.descripcion = this.page.locator("#valueDescripcionEstudiante");

    this.agregarCurriculumsButton = this.page.getByText("Agregar curriculums");
  }

  async goto() {
    await this.page.goto(this.url);
  }

  async getNumeroCelular() {
    await this.page.waitForLoadState("networkidle");

    const numeroCelular = await this.page.locator("#valueTelefonoEstudiante").innerText();
    return numeroCelular;
  }

  async getCarrera() {
    await this.page.waitForLoadState("networkidle");

    const carrera = await this.carrera.innerText();
    return carrera;
  }

  async getAnioIngreso() {
    await this.page.waitForLoadState("networkidle");

    const anioIngreso = await this.anioIngreso.innerText();
    return anioIngreso;
  }

  async getDescripcion() {
    await this.page.waitForLoadState("networkidle");
    //refresh this.description
    
    const descripcion = await this.descripcion.innerText();
    return descripcion;
  }

async getCurriculum(cvName: string) {
    try {
        const curriculum = await this.page
            .getByText(cvName) 
            .innerText({ timeout: 3000 });
        return curriculum;
    } catch (error) {
        return null;
    }
}

async viewCurriculum(cvName: string) {
  try {
    const curriculum = await this.page
        .getByText(cvName) 
        .innerText({ timeout: 3000 });
    return true;
} catch (error) {
    return null;
}
}



  async clickAgregarCurriculums() {
    await this.agregarCurriculumsButton.click();
  }

  async agregarCurriculums() {
    //await this.page.getByRole("textbox").click();
    const filePath = path.resolve(__dirname, "../files/CV_PRUEBA.pdf");
    const timestamp = new Date().getTime();
    const newFileName = `CV_PRUEBA_${timestamp}.pdf`;
    const newFilePath = path.resolve(__dirname, `../files/${newFileName}`);
    await fs.promises.copyFile(filePath, newFilePath);
    //make a new file with a timestamp in the name based on the original file
    await this.page
      .getByRole("textbox")
      .setInputFiles(newFilePath);

    await this.page.getByRole("button", { name: "Guardar" }).click();
        await this.page.waitForResponse(response =>
            response.url().includes('/curriculum') && response.status() === 200
        );

    //then delete the new file
    await fs.promises.unlink(newFilePath);
    return newFileName;

  }

  async deleteCurriculum(cvName: string) {
    await this.page
      .locator("li")
      .filter({ hasText: "x "+cvName })
      .getByRole("button")
      .click();
    await this.page
      .getByRole("button", { name: "¡Sí, elimínala!" })
      .click();
    await this.page.getByRole("button", { name: "OK" }).click();
  }

  async goToEditProfile() {
    await this.editProfileButton.click();
    return this.convertToEditProfilePage();
  }

  async convertToEditProfilePage() {
    return new EditProfilePage(this.page);
  }
}
