import { expect, Locator, Page } from '@playwright/test';

import { NavbarComponent } from './components/navbarComponent';
import { EditProfilePage } from './editProfilePage';

export class ViewProfilePage{
   
    readonly url = 'https://internship.serverbb.online/perfil/estudiante';
    readonly page: Page;

    readonly navbar: NavbarComponent;

    readonly editProfileButton: Locator;




    constructor(page: Page){
        this.page = page;
        this.navbar = new NavbarComponent(page);
        this.editProfileButton = this.page.locator('a[href="/perfil/estudiante/editar"]').nth(1);
    }

    async goto(){
        await this.page.goto(this.url);
    }



    async getNumeroCelular(){
        const numeroCelular = await this.page.locator('text=+591 12345678').first();
        return numeroCelular;
    }


    async goToEditProfile(){

        await this.editProfileButton.click();
        return this.convertToEditProfilePage();
    }

    async convertToEditProfilePage(){
        return new EditProfilePage(this.page);
    }



    


}
