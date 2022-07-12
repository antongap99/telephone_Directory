/* eslint-disable no-unreachable */
/* eslint-disable eol-last */
'use strict';

{
/* применить setStorage вместо addContactData*/

  const getStorage = (key) => {
    let result;
    try {
      result = JSON.parse(localStorage.getItem(key));
    } catch {
      result = localStorage.getItem(key);
    }

    return result || [];
  };

  const setStorage = (key, newCont) => {
    const data = getStorage(key);
    data.push(newCont);
    window.localStorage.removeItem('data');
    window.localStorage.setItem('data', JSON.stringify(data));
  };

  const removeStorage = (phoneNumber) => {
    const data = getStorage('data');

    const newData = data.filter((elem) => phoneNumber !== elem.phone);

    window.localStorage.removeItem('data');
    window.localStorage.setItem('data', JSON.stringify(newData));
  };


  const createContainer = () => {
    const container = document.createElement('div');
    container.classList.add('container');
    return container;
  };


  const createHeader = () => {
    const header = document.createElement('header');
    header.classList.add('header');

    const headerConatainer = createContainer('div');
    header.append(headerConatainer);
    header.headerConatainer = headerConatainer;


    return header;
  };

  const creatLogo = (title) => {
    const h1 = document.createElement('h1');
    h1.classList.add('logo');
    h1.textContent = `Телефонный справочник ${title}`;
    return h1;
  };


  const createMain = () => {
    const main = document.createElement('main');
    const mainContainer = document.createElement('div');
    main.className = 'main';
    main.append(mainContainer);
    main.mainContainer = mainContainer;

    // main.classList.add();
    return main;
  };

  const createBtnGroup = (params) => {
    const btnWrapper = document.createElement('div');
    btnWrapper.classList.add('btn-wrapper');


    const btns = params.map(({className, type, text}) => {
      const button = document.createElement('button');

      button.type = type;
      button.className = className;
      button.textContent = text;
      return button;
    });

    // console.log(btns)
    btnWrapper.append(...btns);
    // console.log('btnWrapper: ', btnWrapper);
    return {
      btnWrapper,
      btns,
    };
  };

  const creatTable = () => {
    const table = document.createElement('table');
    table.classList.add('table', 'table-striped');

    const thead = document.createElement('thead');
    thead.insertAdjacentHTML('beforeend', `
        <tr>
            <th class = 'delete' ></th>
            <th class = 'thead__name'>Имя</th>
            <th class = 'thead__surname'>Фамилия</th>
            <th class = 'thead__surname'>Телефон</th>
            <th></th>
        </tr>
        `);

    const tbody = document.createElement('tbody');

    table.append(thead, tbody);
    table.tbody = tbody;
    table.thead = thead;

    return table;
  };

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
        `);

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
        }],
    );
    form.append(...buttonGroup.btns);
    overlay.append(form);
    return {
      overlay,
      form,
    };
  };

  const creatfooter = (nameGaurd) => {
    const footer = document.createElement('footer');
    footer.classList.add('footer');

    const footerContainer = document.createElement('div');
    footer.append(footerContainer);
    footer.footerContainer = footerContainer;
    footerContainer.insertAdjacentHTML('beforeend', `<p>Все права защищены &#169;${nameGaurd}</p>`);
    return footer;
  };

  const renderPhoneBook = (selectorApp, title) => {
    const header = createHeader();
    const logo = creatLogo(title);
    const main = createMain();
    const tableWrapper = createContainer();
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
        }],
    );

    const table = creatTable();
    const {form, overlay} = createForm();
    const footer = creatfooter('Антон');
    // const copyRight = creatCopyRightElem('Антон');
    tableWrapper.append(table);
    tableWrapper.table = table;
    tableWrapper.className = ' table_list';
    main.mainContainer.append(buttonGroup.btnWrapper);
    header.headerConatainer.append(logo);
    // footer.footerContainer.append(copyRight);
    selectorApp.append(header, main, tableWrapper, overlay, footer);
    return {
      list: tableWrapper.table.tbody,
      head: tableWrapper.table.thead,
      logo,
      btnAdd: buttonGroup.btns[0],
      formOverlay: overlay,
      form,
      btnDel: buttonGroup.btns[1],
    };
  };

  const creatRow = ({name: firstname, surname, phone}) => {
    const tr = document.createElement('tr');
    tr.classList.add('contact');
    // console.log( tr.className);
    const tdDel = document.createElement('td');
    tdDel.classList.add('delete');
    const btnDel = document.createElement('button');
    tdDel.append(btnDel);
    btnDel.classList.add('del-icon');

    const tdName = document.createElement('td');
    tdName.className = 'contact__name';
    tdName.textContent = firstname;

    const tdSurname = document.createElement('td');
    tdSurname.className = 'contact__surname';
    tdSurname.textContent = surname;

    const tdPhone = document.createElement('td');
    tdPhone.className = 'contact__phone';

    const tdEdit = document.createElement('td');
    tdEdit.className = 'contact__edit';
    const editBtn = document.createElement('button');
    editBtn.textContent = 'редактировать';
    editBtn.className = 'editBtn';
    tdEdit.append(editBtn);

    const phoneLink = document.createElement('a');
    tdPhone.append(phoneLink);
    phoneLink.href = `tel ${phone}`;
    phoneLink.textContent = phone;
    tr.phoneLink = phoneLink;
    tr.tdName = tdName;
    tr.tdSurname = tdSurname;
    tr.append(tdDel, tdName, tdSurname, tdPhone, tdEdit);

    return tr;
  };

  const renderContacts = (elem) => {
    const data = JSON.parse(localStorage.getItem('data'));
    const allRow = data.map(creatRow);
    elem.append(...allRow);
    return allRow;
  };

  const hoverRow = (allRow, logo) => {
    allRow.forEach(contact => {
      const text = logo.textContent;
      contact.addEventListener('mouseenter', () => {
        logo.textContent = contact.phoneLink.textContent;
      });

      contact.addEventListener('mouseleave', () => {
        logo.textContent = text;
      });
    });
  };

  const sortTable = (selec) => {
    const tbody = document.querySelector('tbody');
    const rows = tbody.querySelectorAll('tr');
    let ind = 0;
    if (selec === '.thead__name') {
      ind = 1;
    } else if (selec === '.thead__surname') {
      ind = 2;
    }

    const array = Array.from(rows);

    array.sort((rowA, rowB) => {
      const cellA = rowA.childNodes[ind].textContent;
      const cellB = rowB.childNodes[ind].textContent;

      switch (true) {
        case cellA > cellB: return 1;
        case cellA < cellB: return -1;
        case cellA === cellB: return 0;
      }
    });

    tbody.childNodes.forEach((tr) => {
      tr.remove();
    //   localStorage.removeItem('data');
    });
    const newData = [];

    array.forEach((elem) => {
      tbody.append(elem);

      newData.push({name: elem.tdName.innerHTML, surname: elem.tdSurname.innerHTML,
        phone: elem.phoneLink.innerHTML});
    });

    window.localStorage.removeItem('data');
    window.localStorage.setItem('data', JSON.stringify(newData));
  };

  const modalControl = (btnAdd, formOverlay) => {
    const openModal = () => {
      formOverlay.classList.add('is-visible');
    };
    const closeModal = () => {
      formOverlay.classList.remove('is-visible');
    };
    btnAdd.addEventListener('click', openModal);


    formOverlay.addEventListener('click', (e) => {
      const target = e.target;
      if (target === formOverlay || target.closest('.close')) {
        closeModal();
      }
    });

    return {
      closeModal,
    };
  };

  const deleteControl = (btnDel, list) => {
    btnDel.addEventListener('click', () => {
      document.querySelectorAll('.delete').forEach((del) => {
        del.classList.toggle('is-visible');
      });
    });

    list.addEventListener('click', (e) => {
      if (e.target.closest('.del-icon')) {
        e.target.closest('.contact').remove();

        const phoneData = e.target.closest('.contact').childNodes[3].textContent;

        removeStorage(phoneData);

        const text = 'Телефонный справочник Aнтон';
        const logo = document.querySelector('.logo');
        logo.textContent = text;
      }
    });
  };

  const sortControl = () => {
    const headName = document.querySelector('.thead__name');
    const headSurname = document.querySelector('.thead__surname');
    headName.addEventListener('click', () => {
      sortTable('.thead__name');
    });

    headSurname.addEventListener('click', () => {
      sortTable('.thead__surname');
    });
  };

  const addContactPage = (contact, list) => {
    list.append(creatRow(contact));
  };
  const formControl = (form, list, closeModal) => {
    form.addEventListener('submit', e => {
      e.preventDefault();

      const formData = new FormData(e.target);
      const newContact = Object.fromEntries(formData);
      addContactPage(newContact, list);
      setStorage('data', newContact);
      form.reset();
      closeModal();
    });
  };


  const init = (selectorApp, title) => {
    const app = document.querySelector(selectorApp);

    const {
      list,
      logo,
      btnAdd,
      form,
      formOverlay,
      btnDel,
    } = renderPhoneBook(app, title);

    const allRow = renderContacts(list, getStorage('data'));
    const {closeModal} = modalControl(btnAdd, formOverlay);
    // функционал
    hoverRow(allRow, logo);
    deleteControl(btnDel, list);
    sortControl();
    formControl(form, list, closeModal);
  };


  window.phoneBookInit = init;
}