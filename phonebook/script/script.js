/* eslint-disable eol-last */
'use strict';

{
    const createContainer = () => {
        const container = document.createElement('div');
        container.classList.add('container');
        return container;
    } 



    const createHeader = () => {
        const header = document.createElement('header');
        header.classList.add('header');

        const headerConatainer = createContainer();
        header.append(headerConatainer);

        header.headerConatainer = headerConatainer;

        return header;
    }

    const creatLogo = (title) => {
        const h1 = document.createElement('h1');
        h1.classList.add('logo');
        h1.textContent =`Телефонный справочник ${title}`;
        return h1
    } 


    const init = (selectorApp, title) => {
        const app = document.querySelector(selectorApp);
        const header = createHeader();
        const logo = creatLogo('Aнтон');

        header.append(logo);
        app.append(header);

    }


    window.phoneBookInit = init;
}