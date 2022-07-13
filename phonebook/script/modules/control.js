import storage from './serviceStorage.js';
const {setStorage, removeStorage,} = storage;
import create from './createElement.js';
const {creatRow} = create;
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

export default {
  modalControl,
  deleteControl,
  sortControl,
  formControl,
};
