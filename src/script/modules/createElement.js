import image from '../../img/icon.svg';

 const createImgLogo = () => {
  const img = document.createElement('img');
  img.src = image;
  return img
}


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
            <input class="form-input" name = "phone" id = "phone" type = "number" inputmode="tel"  required>
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


const createSpan = (value, className) => {
  const span = document.createElement('span');
  span.className = className;
  span.textContent = value;
  
  return span;
}
const creatRow = ({name: firstname, surname, phone}) => {
  const tr = document.createElement('tr');
  tr.classList.add('contact');

  const tdDel = document.createElement('td');
  tdDel.classList.add('delete');

  const btnDel = document.createElement('button');
  btnDel.classList.add('del-icon');
  tdDel.append(btnDel);

  const tdName = document.createElement('td');
  tdName.append(createSpan(firstname, 'name'));
  tdName.className = 'contact__name';

  const tdSurname = document.createElement('td');
  tdSurname.append(createSpan(surname, 'surname'));
  tdSurname.className = 'contact__surname';

  const tdPhone = document.createElement('td');
  tdPhone.className = 'contact__phone';

  const tdEdit = document.createElement('td');
  tdEdit.className = 'contact__edit';

  const editBtn = document.createElement('button');
  editBtn.textContent = 'редактировать';
  editBtn.className = 'editBtn';
  tdEdit.append(editBtn);

  const phoneLink = document.createElement('a');
  phoneLink.className = 'phoneLink';
  phoneLink.href = `tel ${phone}`;
  phoneLink.textContent = phone;
  tdPhone.append(phoneLink);

  tr.phoneLink = phoneLink;
  tr.tdName = tdName;
  tr.tdSurname = tdSurname;
  tr.append(tdDel, tdName, tdSurname, tdPhone, tdEdit);

  return tr;
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

const createEditInput = (attrs) => {
  const input = document.createElement('input');
  const attr = Object.entries(attrs);
 
  for (const key of attr) {
    input.setAttribute(key[0], key[1]);
  }

  return input;
}

export default {
  createImgLogo,
  createContainer,
  createHeader,
  creatLogo,
  createMain,
  createBtnGroup,
  creatTable,
  createForm,
  creatfooter,
  creatRow,
  hoverRow,
  createEditInput,
};
