import { test, expect } from '@playwright/test';
import { PrincipalPage } from '../pages/principalPage';


//duuuuudaaaaaaa si estan bien los nombres de los test



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


 test('Agregar un curriculum', async ({ page }) => {
  
    const principalPageLogged = await login(page);


    const viewProfilePage = await principalPageLogged.goToViewProfile();

    await viewProfilePage.clickAgregarCurriculums();
    const cvName = await viewProfilePage.agregarCurriculums();
    //check if the cv is added
    expect(await viewProfilePage.getCurriculum(cvName)).toBe(cvName);

    //delete the cv
    await viewProfilePage.deleteCurriculum(cvName);

    //check if the cv is deleted
    expect(await viewProfilePage.getCurriculum(cvName)).toBe(null);

});

test('Borrar un curriculum', async ({ page }) => {
  
    const principalPageLogged = await login(page);


    const viewProfilePage = await principalPageLogged.goToViewProfile();

    await viewProfilePage.clickAgregarCurriculums();

    const cvName = await viewProfilePage.agregarCurriculums();

    //check if the cv is added
    expect(await viewProfilePage.getCurriculum(cvName)).toBe(cvName);

    //delete the cv
    await viewProfilePage.deleteCurriculum(cvName);

    //check if the cv is deleted
    expect(await viewProfilePage.getCurriculum(cvName)).toBe(null);

});


test('Verificar la visualización de un curriculum', async ({ page }) => {
      
     const principalPageLogged = await login(page);


    const viewProfilePage = await principalPageLogged.goToViewProfile();

    await viewProfilePage.clickAgregarCurriculums();

    const cvName = await viewProfilePage.agregarCurriculums();

    //check if the cv is added
    expect(await viewProfilePage.getCurriculum(cvName)).toBe(cvName);

    //view the cv
    expect(await viewProfilePage.viewCurriculum(cvName)).toBe(true);

    //delete the cv
    await viewProfilePage.deleteCurriculum(cvName);

    //check if the cv is deleted
    expect(await viewProfilePage.getCurriculum(cvName)).toBe(null);

});



