import { expect, Locator, Page } from '@playwright/test';

import { PrincipalPage } from './principalPage';



export class LoginPage{
    readonly page: Page;
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly iniciarSesionButton: Locator;
    readonly googleButton: Locator;
    readonly inputError: Locator;


  

    constructor(page: Page){
        this.page = page;



        this.usernameInput = this.page.getByPlaceholder('Nombre de usuario');
        
        this.passwordInput =  this.page.getByPlaceholder('Contraseña:');

        this.iniciarSesionButton = this.page.getByRole('button', { name: 'Iniciar sesión' });

        this.inputError = this.page.locator('#input-error');


    
    }


    async doLogin(username: string, password: string){
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.iniciarSesionButton.click();
        if (await this.inputError.isVisible()){
            throw new Error('Error en el login');
        }
        return this.convertToPrincipalLoggedPage();
    }

    async convertToPrincipalLoggedPage(){
        return new PrincipalPage(this.page);
    }



 

    


}
