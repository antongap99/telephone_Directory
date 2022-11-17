
import storage from './modules/serviceStorage';
const { getStorage,} = storage;
import hover from './modules/createElement';
const {hoverRow} = hover;
import render from './modules/render';
const {renderPhoneBook, renderContacts,} = render;
import control from "./modules/control";
const {modalControl, deleteControl, sortControl, formControl, editControl} = control;

// для отслеживания файла в режиме development
// import '../index.html'; 

import '../scss/index.scss';



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
  deleteControl(btnDel, list, btnAdd);
  sortControl();
  formControl(form, list, closeModal);
  editControl();
  };



  document.addEventListener('DOMContentLoaded', () => {
    init("#app", 'Aнтон');
  });



