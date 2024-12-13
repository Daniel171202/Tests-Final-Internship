import { test, expect } from '@playwright/test';
import { PrincipalPage } from '../pages/principalPage';

const username = "estudiante.test@ucb.edu.bo";
const password = "Estudiante123";

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
    





});
