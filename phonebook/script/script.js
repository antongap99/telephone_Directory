/* eslint-disable eol-last */
'use strict';
const data = [
    {
      name: 'Иван',
      surname: 'Петров',
      phone: '+79514545454',
    },
    {
      name: 'Егор',
      surname: 'Южаков',
      phone: '+79999999999',
    },
    {
      name: 'Семён',
      surname: 'Абрамов',
      phone: '+79800252525',
    },
    {
      name: 'Мария',
      surname: 'Ширяева',
      phone: '+79876543210',
    },
  ];



{
    const createContainer = () => {
        const container = document.createElement('div');
        container.classList.add('container');
        return container;
    } 



    const createHeader = () => {
        const header = document.createElement('header');
        header.classList.add('header');

        const headerConatainer = createContainer('div');
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


    const createMain = () => {
        const main = document.createElement('main');
        const mainContainer = document.createElement('div');
        
        main.append(mainContainer);
        main.mainContainer = mainContainer

        // main.classList.add();
        return main
    }


    const createBtnGroup = (params) => {
        const btnWrapper = document.createElement('div');
        btnWrapper.classList.add('btn-wrapper');


        const btns = params.map(({className, type, text}) => {
            const button = document.createElement('button');

            button.type = type;
            button.className = className;
            button.textContent = text;
            return button;
        })

        console.log(btns)
        btnWrapper.append(...btns);
        console.log('btnWrapper: ', btnWrapper);
        return {
            btnWrapper,
            btns
        }; 
    }

    const creatTable = () => {
        const table  = document.createElement('table');
        table.classList.add('table', 'table-striped');

        const thead = document.createElement('thead');
        thead.insertAdjacentHTML('beforeend', `
        <tr>
            <th class = 'delete' ></th>
            <th>Имя</th>
            <th>Фамилия</th>
            <th>Телефон</th>
            <th></th>
        </tr>
        `)

        const tbody = document.createElement('tbody');

        table.append(thead, tbody);
        table.tbody = tbody;

        return table;
    }

    const createForm = () => {
        const overlay = document.createElement('div');
        overlay.classList.add('form-overlay');

        const form = document.createElement('form');
        form.classList.add('form');
        form.insertAdjacentHTML('beforeend', `
        <button class = "close" type = "button"></button>
        <h2 class="form-title">Добавить контакт</h2>
        <div class="form-group">
            <label class="form-label" for= "name">Имя:</label>
            <input class="form-input" name = "name" id = "name" type = "text" required> 
        </div>
        <div class="form-group">
            <label class="form-label" for="surname">Фамилия:</label>
            <input class="form-input" name="surname" id ="surname" type = "text" required> 
        </div>
        <div class="form-group">
            <label class="form-label" for= "phone">Телефон</label>
            <input class="form-input" name = "phone" id = "phone" type = "number" required> 
        </div>
        `)

        const buttonGroup = createBtnGroup(
            [{
                className: 'btn btn-primary mr-4', 
                type: 'submit',
                text: 'добавить',
            },
            {
                className: 'btn btn-danger', 
                type: 'reset',
                text: 'отмена',
            }]
        );
            form.append(...buttonGroup.btns);
            overlay.append(form);
            return {
                overlay,
                form,
            }

    }

    const creatfooter = (nameGaurd) => {
        const footer = document.createElement('footer');
        footer.classList.add('footer');

        const footerContainer = document.createElement('div');
        footer.append(footerContainer);
        footer.footerContainer = footerContainer; 
        footerContainer.insertAdjacentHTML('beforeend',`<p>Все права защищены &#169;${nameGaurd}</p>`)
        return footer;
    }


    // const creatCopyRightElem = (nameGaurd) => {
    //     const copyPaste = document.createElement('p');
    //     copyPaste.textContent = `Все права защищены &#169;${nameGaurd}`;
    //     return copyPaste;
    // }


    const renderPhoneBook = (selectorApp, title) => {
        const header = createHeader();
        const logo = creatLogo(title);
        const main = createMain();
        const buttonGroup = createBtnGroup(
            [{
                className: 'btn btn-primary mr-4', 
                type: 'button',
                text: 'добавить',
            },
            {
                className: 'btn btn-danger', 
                type: 'button',
                text: 'Удалить',
            }]
        );
        
        const table = creatTable();
        const form = createForm();
        const footer = creatfooter('Антон');
        // const copyRight = creatCopyRightElem('Антон');

        main.mainContainer.append(buttonGroup.btnWrapper);
        header.headerConatainer.append(logo);
        // footer.footerContainer.append(copyRight);
        selectorApp.append(header, main, table, form.overlay , footer);

        return {
            list: table.tbody,
            logo,
            btnAdd: buttonGroup.btns[0],
            formOverlay: form.overlay,
            form: form.form,
        }
    }

    const creatRow = ({name: firstname, surname, phone}) => {
        const tr = document.createElement('tr');

        const tdDel = document.createElement('td');
        tdDel.classList.add('delete');
        const btnDel = document.createElement('button');
        tdDel.append(btnDel);   
        btnDel.classList.add('del-icon');

        const tdName = document.createElement('td');
        tdName.textContent = firstname;

        const tdSurname = document.createElement('td');
        tdSurname.textContent = surname;

        const tdPhone = document.createElement('td');

        const tdEdit = document.createElement('td');
        const editBtn = document.createElement('button');
        editBtn.textContent = 'редактировать';
        editBtn.className = 'editBtn';
        tdEdit.append(editBtn);

        const phoneLink = document.createElement('a');
        tdPhone.append(phoneLink);
        phoneLink.href = `tel ${phone}`;
        phoneLink.textContent = phone;
        tr.phoneLink = phoneLink;
        tr.append(tdDel, tdName, tdSurname, tdPhone, tdEdit);

        return tr;
    }

    const renderContacts  = (elem, data) => {
        const allRow = data.map(creatRow);
        elem.append(...allRow);
        return allRow;
    }

    const hoverRow = (allRow, logo) => {
        allRow.forEach(contact => {
            const text = logo.textContent;
            contact.addEventListener('mouseenter', () => {
                logo.textContent = contact.phoneLink.textContent;
            });

            contact.addEventListener('mouseleave', () => {
                logo.textContent = text;
            })
        });
    }

    const init = (selectorApp, title) => {
        const app = document.querySelector(selectorApp);
        const  phonebook =  renderPhoneBook(app, title);

        const {list, logo, btnAdd, formOverlay, form} = phonebook;

         const allRow = renderContacts(list, data);
        //функционал
        hoverRow(allRow, logo);

        btnAdd.addEventListener('click', () => {
            formOverlay.classList.add('is-visible')
        });

        

        formOverlay.addEventListener('click', (e) => {
            const target = e.target;
            if(target === formOverlay || target.closest('.close')){
                formOverlay.classList.remove('is-visible');
            };
        })
    }

    console.dir(Object);
    window.phoneBookInit = init;
}