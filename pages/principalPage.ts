import { expect, Locator, Page } from '@playwright/test';

import { NavbarComponent } from './components/navbarComponent';
import { LoginPage } from './loginPage';
import { ViewProfilePage } from './viewProfilePage';

export class PrincipalPage{
    readonly url = 'https://internship.serverbb.online/';
    readonly page: Page;

    readonly navbar: NavbarComponent;

    constructor(page: Page){
        this.page = page;
        this.navbar = new NavbarComponent(page);
    }

    async goto(){
        await this.page.goto(this.url);
    }

    async goToLogin(){
        await this.navbar.clickIniciarSesion();
        return this.convertToLoginPage();
    }

    async convertToLoginPage(){
        return new LoginPage(this.page);
    }



    async goToViewProfile(){
        await this.navbar.clickUserProfile();
        return this.convertToViewProfilePage();
    }

    async convertToViewProfilePage(){
        return new ViewProfilePage(this.page);
    }




}
