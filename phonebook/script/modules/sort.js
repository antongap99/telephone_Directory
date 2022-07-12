

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

export default sortTable;
