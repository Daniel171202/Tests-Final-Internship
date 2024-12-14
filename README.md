# Internship by Cato: Automated Testing

Bienvenido al repositorio de pruebas automatizadas del sistema **Internship by Cato**. Este proyecto representa el resultado del examen final de la materia *Gestión de Calidad*. Aquí encontrarás los recursos y comandos necesarios para ejecutar tanto pruebas automatizadas de interfaz como pruebas de endpoints del sistema.

---

## Introducción

El sistema **Internship by Cato** es una solución diseñada para facilitar la gestión de pasantías, desarrollado por estudiantes de la universidad. Como parte del proceso de evaluación final, se han implementado dos tipos de pruebas automatizadas:

1. **Pruebas de interfaz** con **Playwright**, enfocadas en validar la interacción y el comportamiento del sistema desde el punto de vista del usuario.
2. **Pruebas de endpoints** con **Newman** para garantizar la correcta funcionalidad de la API del sistema.

Estas pruebas aseguran que el sistema funcione según lo esperado, contribuyendo a su robustez y confiabilidad.

---

## Requisitos previos

Antes de ejecutar las pruebas, asegúrate de cumplir con los siguientes requisitos:

- Node.js instalado en tu sistema.
- Playwright instalado globalmente o como dependencia de tu proyecto.
- Newman instalado para ejecutar pruebas de Postman desde la línea de comandos.

---

## Comandos para ejecutar las pruebas

### Pruebas de interfaz con Playwright

Para ejecutar las pruebas automatizadas de interfaz, utiliza los siguientes comandos:

```bash
npx playwright test
```

Este comando ejecutará todas las pruebas de interfaz definidas en el proyecto.

Una vez completadas las pruebas, puedes visualizar el reporte generado con:

```bash
npx playwright show-report
```

### Pruebas de endpoints con Newman

Navega al directorio de pruebas de endpoints:

```bash
cd ENDPOINTS-TESTS
```

Y ejecuta las pruebas utilizando el siguiente comando:

```bash
newman run INTERNSHIP-API-TEST.postman_collection.json -e INTERNSHIP-API-TEST-ENVIROMENT.postman_environment.json
```

Este comando validará la funcionalidad de los endpoints del sistema, basándose en los casos de prueba definidos en la colección de Postman.

---

## Resultados

Al finalizar las pruebas:

- **Playwright** generará un reporte detallado con el estado de cada caso de prueba, permitiéndote identificar posibles problemas en la interfaz del sistema.
- **Newman** proporcionará un resumen del desempeño de los endpoints, destacando cualquier fallo o discrepancia con las especificaciones.





