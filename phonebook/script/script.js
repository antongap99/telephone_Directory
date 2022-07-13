
import storage from './modules/serviceStorage.js';
const {setStorage,removeStorage, getStorage,} = storage;
import hover from './modules/createElement.js';
const {hoverRow} = hover;
import render from './modules/render.js';
const {renderPhoneBook, renderContacts,} = render;
import control from "./modules/control.js";
const {modalControl, deleteControl, sortControl, formControl,} = control;



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

//window.phoneBookInit = init;





