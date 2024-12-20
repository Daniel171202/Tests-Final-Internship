import { expect, Locator, Page } from '@playwright/test';

import { NavbarComponent } from './components/navbarComponent';
import { ViewProfilePage } from './viewProfilePage';

export class EditProfilePage{
   
    readonly url = 'https://internship.serverbb.online/perfil/estudiante/editar';
    readonly page: Page;

    readonly navbar: NavbarComponent;

    readonly numeroCelularInput: Locator;
    readonly carreraSelect: Locator;
    readonly anioIngresoInput: Locator;
    readonly descripcionInput: Locator;

    readonly guardarButton: Locator;


    




    constructor(page: Page){
        this.page = page;
        this.navbar = new NavbarComponent(page);
        this.numeroCelularInput = this.page.getByPlaceholder('Número Celular');
        this.carreraSelect = this.page.getByRole('combobox');
        this.anioIngresoInput = this.page.getByPlaceholder('Año de Ingreso a la Universidad');
        this.descripcionInput = this.page.getByPlaceholder('Descripción :');

        this.guardarButton = this.page.getByRole('button', { name: 'Guardar' });
    }

    async goto(){
        await this.page.goto(this.url);
    }

    async fillNumeroCelular(numeroCelular: string){
        await this.numeroCelularInput.click();
        await this.numeroCelularInput.fill("");
        await this.numeroCelularInput.fill(numeroCelular);

    }

    async fillCarrera(carrera: string){
        await this.carreraSelect.selectOption({label: carrera});
    }


    async fillAnioIngreso(anioIngreso: string){
        await this.anioIngresoInput.click();
        await this.anioIngresoInput.fill(anioIngreso);
    }

    async fillDescripcion(descripcion: string){
        await this.descripcionInput.click();
        await this.descripcionInput.fill(descripcion);
    }


    async clickGuardar(){
        await this.guardarButton.click();
        await this.page.waitForLoadState("networkidle");

    }



    async goToViewProfile(){
        await this.page.goto('https://internship.serverbb.online/perfil/estudiante');
        return this.convertToViewProfilePage();
    }

    async convertToViewProfilePage(){
        return new ViewProfilePage(this.page);
    }


    



 
    


}
