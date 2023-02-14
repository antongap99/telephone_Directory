import storage from './serviceStorage.js';
const { setStorage, removeStorage, getStorage } = storage;
import create from './createElement.js';
const { creatRow, createEditInput } = create;
import './sort.js';


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

const deleteControl = (btnDel, list, btnadd) => {
  btnDel.addEventListener('click', () => {
    if (!btnadd.hasAttribute("disabled")) {
      btnadd.setAttribute("disabled", "disabled");
    } else {
      btnadd.removeAttribute("disabled");
    }
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

const editControl = () => {
    const editBtns = document.querySelectorAll('.editBtn');
    const editBtnEventHandler = (e) => {
      const editBtn = e.target;
      const contact = editBtn.parentNode.parentNode;
      const contactPhone = contact.getElementsByClassName('contact__phone')[0];
      const contactName = contact.getElementsByClassName('contact__name')[0];
      const contactSurname = contact.getElementsByClassName('contact__surname')[0];


      if (!contactPhone.lastChild.matches('.edit-input')) {
        editBtn.textContent = 'сохранить'
        const inputPhone
          = createEditInput({ class: 'edit-input', name: 'phone', type: 'number', inputmode: 'tel', required: 'required' });

        const inputName
          = createEditInput({ class: "form-input", name: "name", type: "text", required: 'required' });
        const inputSurname
          = createEditInput({ class: "form-input", name: "surname", type: "text", required: 'required' });

        const contactNameValue = contactName.textContent;

        contactPhone.append(inputPhone);

        contactName.append(inputName);

        contactSurname.append(inputSurname);

        contactPhone.firstChild.style.display = 'none';
        contactName.firstChild.style.display = 'none';
        contactSurname.firstChild.style.display = 'none';

        inputPhone.addEventListener('input', () => {
          contactPhone.firstChild.textContent = inputPhone.value;
        });

        inputName.addEventListener('input', () => {
          contactName.firstChild.textContent = inputName.value;
        });

        inputSurname.addEventListener('input', () => {
          contactSurname.firstChild.textContent = inputSurname.value;
        });

        const inputChangeHandler = (itemProp, contactProp) => {
          const data = getStorage('data');

          data.forEach((item) => {
            if (contactNameValue === item.name) {
              item[itemProp] = contactProp.firstChild.textContent;
            }
          });

          localStorage.removeItem('data');
          localStorage.setItem('data', JSON.stringify(data));
        }


        inputPhone.addEventListener('change', () => {
          inputChangeHandler('phone', contactPhone)
        })

        inputName.addEventListener('change', () => {
          inputChangeHandler('name', contactName)
        })

        inputSurname.addEventListener('change', () => {
          inputChangeHandler('surname', contactSurname)
        })


      } else {
        editBtn.textContent = 'редактировать'
        contactPhone.firstChild.style.display = 'block';
        contactName.firstChild.style.display = 'block';
        contactSurname.firstChild.style.display = 'block';
        contactPhone.lastChild.remove();
        contactName.lastChild.remove();
        contactSurname.lastChild.remove();
      }
    }

    editBtns.forEach(editBtn => {
      editBtn.addEventListener('click', editBtnEventHandler);
    })
}

export default {
  modalControl,
  deleteControl,
  sortControl,
  formControl,
  editControl,
};
