import { test, expect } from '@playwright/test';
import { PrincipalPage } from '../pages/principalPage';

const username = "estudiante.test@ucb.edu.bo";
const password = "Estudiante123";


const randomNumeroCelular = Math.floor(Math.random() * 10000000).toString();


test.beforeEach(async ({ page }) => {
    await page.goto('https://internship.serverbb.online/');
});


test('Cambiar el número celular de un estudiante', async ({ page }) => {
    const principalPage = new PrincipalPage(page);
    await principalPage.goto();
    const loginPage = await principalPage.goToLogin();
    const principalPageLogged= await loginPage.doLogin(username, password);
    const viewProfilePage = await principalPageLogged.goToViewProfile();
    const editProfilePage = await viewProfilePage.goToEditProfile();
    await editProfilePage.fillNumeroCelular(randomNumeroCelular);
    await editProfilePage.clickGuardar();

    const viewProfilePage2 = await principalPageLogged.goToViewProfile();
    expect(await viewProfilePage2.getNumeroCelular()).toBe(randomNumeroCelular);
    








});
