import { expect, Locator, Page } from '@playwright/test';

import { NavbarComponent } from './components/navbarComponent';

export class EditProfilePage{
    readonly url = 'https://internship.serverbb.online/perfil/estudiante/editar';
    readonly page: Page;

    readonly navbar: NavbarComponent;

    readonly numeroCelularInput: Locator;
    readonly carreraInput: Locator;
    readonly anioIngresoInput: Locator;
    readonly descripcionInput: Locator;

    readonly guardarButton: Locator;


    




    constructor(page: Page){
        this.page = page;
        this.navbar = new NavbarComponent(page);
        this.numeroCelularInput = this.page.getByPlaceholder('Número de Celular');
        this.carreraInput = this.page.getByPlaceholder('Carrera');
        this.anioIngresoInput = this.page.getByPlaceholder('Año de Ingreso a la Universidad');
        this.descripcionInput = this.page.getByPlaceholder('Descripción');

        this.guardarButton = this.page.locator('button:has-text("Guardar")');
    }

    async goto(){
        await this.page.goto(this.url);
    }

    async fillNumeroCelular(numeroCelular: string){
        await this.numeroCelularInput.fill(numeroCelular);
    }

    async fillCarrera(carrera: string){
        await this.carreraInput.fill(carrera);
    }


    async fillAnioIngreso(anioIngreso: string){
        await this.anioIngresoInput.fill(anioIngreso);
    }

    async fillDescripcion(descripcion: string){
        await this.descripcionInput.fill(descripcion);
    }


    async clickGuardar(){
        await this.guardarButton.click();
    }




 
    


}
