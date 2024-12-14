import { test, expect } from '@playwright/test';
import { PrincipalPage } from '../pages/principalPage';

const username = "estudiante.test@ucb.edu.bo";
const password = "Estudiante123";



test.beforeEach(async ({ page }) => {
    await page.goto('https://internship.serverbb.online/');
});

async function login(page: any){
    const principalPage = new PrincipalPage(page);
    await principalPage.goto();
    const loginPage = await principalPage.goToLogin();
    return await loginPage.doLogin(username, password);
}


test('Cambiar el número celular de un estudiante', async ({ page }) => {
    const randomNumeroCelular = Math.floor(Math.random() * 10000000).toString();

    const principalPageLogged = await login(page);


    const viewProfilePage = await principalPageLogged.goToViewProfile();
    const editProfilePage = await viewProfilePage.goToEditProfile();
    await editProfilePage.fillNumeroCelular(randomNumeroCelular);
    await editProfilePage.clickGuardar();

    const viewProfilePage2 = await principalPageLogged.goToViewProfile();
    expect(await viewProfilePage2.getNumeroCelular()).toBe(randomNumeroCelular);

});



test('Cambiar la descripción de un estudiante', async ({ page }) => {
    const randomDescripcion = `Esta es una descripción aleatoria número ${Math.floor(Math.random() * 1000)}`;


    const principalPageLogged = await login(page);

    const viewProfilePage = await principalPageLogged.goToViewProfile();
    const editProfilePage = await viewProfilePage.goToEditProfile();
    await editProfilePage.fillDescripcion(randomDescripcion);
    await editProfilePage.clickGuardar();

    const viewProfilePage2 = await principalPageLogged.goToViewProfile();
    expect(await viewProfilePage2.getDescripcion()).toBe(randomDescripcion);

});


test('Cambiar el año de ingreso de un estudiante', async ({ page }) => {
    const randomAnioIngreso = (Math.floor(Math.random() * (2023 - 2000)) + 2000).toString();

    const principalPageLogged = await login(page);

    const viewProfilePage = await principalPageLogged.goToViewProfile();
    const editProfilePage = await viewProfilePage.goToEditProfile();
    await editProfilePage.fillAnioIngreso(randomAnioIngreso);
    await editProfilePage.clickGuardar();

    const viewProfilePage2 = await principalPageLogged.goToViewProfile();
    expect(await viewProfilePage2.getAnioIngreso()).toBe(randomAnioIngreso);

});