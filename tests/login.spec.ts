import { test, expect } from '@playwright/test';
import { PrincipalPage } from '../pages/principalPage';

const username = "estudiante.test@ucb.edu.bo";
const password = "Estudiante123";

test.beforeEach(async ({ page }) => {
    await page.goto('https://internship.serverbb.online/');
});

test('Iniciar Sesión con usuario existente', async ({ page }) => {
    const principalPage = new PrincipalPage(page);
    await principalPage.goto();
    const loginPage = await principalPage.goToLogin();
    await loginPage.doLogin(username, password);

});

test('Iniciar Sesión con usuario inexistente', async ({ page }) => {
    const principalPage = new PrincipalPage(page);
    await principalPage.goto();
    const loginPage = await principalPage.goToLogin();
    await expect(async () => {
        await loginPage.doLogin("as", "as");
    }
    ).rejects.toThrowError('Error en el login');
}
);