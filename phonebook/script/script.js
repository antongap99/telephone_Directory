
import getStorage from './modules/serviceStorage.js';
import hoverRow from './modules/createElement.js';
import renderPhoneBook from './modules/render.js';
import renderContacts from './modules/render.js';
import modalControl from "./modules/control.js"
import deleteControl from "./modules/control.js"
import sortControl from "./modules/control.js"
import formControl from "./modules/control.js"



export const init = (selectorApp, title) => {
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



