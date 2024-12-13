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
    this.editProfileButton = this.page
      .locator('a[href="/perfil/estudiante/editar"]')
      .nth(1);
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
    const numeroCelular = await this.numeroCelular.innerText();
    return numeroCelular;
  }

  async getCarrera() {
    const carrera = await this.carrera.innerText();
    return carrera;
  }

  async getAnioIngreso() {
    const anioIngreso = await this.anioIngreso.innerText();
    return anioIngreso;
  }

  async getDescripcion() {
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
    const page7Promise = this.page.waitForEvent('popup');
    await this.page.locator('li').filter({ hasText: cvName }).locator('a').click();
    const page7 = await page7Promise;
    //quitar la extension del nombre del cv
    var cvNameAux = cvName.split(".");
    cvName = cvNameAux[0];
    if(page7.url().includes(cvName)){
        page7.close();
        return true;
    }else{
        page7.close();
        return false;
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
