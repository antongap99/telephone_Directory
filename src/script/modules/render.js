

import elements from './createElement';

const {
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
} = elements;

  const renderPhoneBook = (selectorApp, title) => {
  const header = createHeader();
  const imageLogo = createImgLogo();
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
  header.headerConatainer.append(imageLogo, logo);
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

  const renderContacts = (elem, data) => {

  const allRow = data.map(creatRow);
  elem.append(...allRow);
  return allRow;
};


export default{
  renderPhoneBook,
  renderContacts,
}