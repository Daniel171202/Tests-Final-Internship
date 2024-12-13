import { expect, Locator, Page } from '@playwright/test';

export class NavbarComponent{
    readonly url = 'https://internship.serverbb.online/';
    readonly page: Page;

    readonly pasantiasButton: Locator;
    readonly empresasButton: Locator;
    readonly solicitudesButton: Locator;



    readonly iniciarSesionButton: Locator;
    readonly userProfileBubble: Locator;
    readonly userProfileButton: Locator;
    readonly cerrarSesionButton: Locator;

    constructor(page: Page){
        this.page = page;
        //await page.getByText('Iniciar Sesión').click();
        this.pasantiasButton = this.page.locator('text=Pasantías');
        this.empresasButton = this.page.locator('text=Empresas');
        this.solicitudesButton = this.page.locator('text=Solicitudes');

        this.iniciarSesionButton = this.page.locator('text=Iniciar Sesión');

        this.userProfileBubble = this.page.locator('#topnav').getByRole('button');
        this.userProfileButton = this.page.getByRole('link', { name: 'Perfil' });
        this.cerrarSesionButton = this.page.getByText('Salir');


    }

    async goto(){
        await this.page.goto(this.url);
    }

    async clickPasantias(){
        await this.pasantiasButton.click();
    }

    async clickEmpresas(){
        await this.empresasButton.click();
    }

    async clickSolicitudes(){
        await this.solicitudesButton.click();
    }

    async clickIniciarSesion(){
        await this.iniciarSesionButton.click();
    }

    async clickUserProfile(){
        await this.userProfileBubble.hover();
        await this.userProfileBubble.click();
        await this.userProfileButton.click();
    }

    async clickCerrarSesion(){
        await this.userProfileBubble.hover();
        await this.userProfileBubble.click();
        await this.cerrarSesionButton.click();
    }

    async isLoggedIn(){
        return await this.userProfileBubble.isVisible();
    }

    async isLoggedOut(){
        return await this.iniciarSesionButton.isVisible();
    }

    async isUserProfileVisible(){
        return await this.userProfileButton.isVisible();
    }

    async isCerrarSesionVisible(){
        return await this.cerrarSesionButton.isVisible();
    }



}