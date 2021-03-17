const data = document.querySelector('.data');
const solve = document.querySelector('.solve');
const mean = document.querySelector('.mean');
const median = document.querySelector('.median');
const modus = document.querySelector('.modus');
const dataTable = document.querySelector('.data-table');
const harmonik = document.querySelector('.harmonik');
const radioBtn = document.querySelectorAll('input[name="flexRadioDefault"]');
const radioChecked = document.querySelector(
  'input[name="flexRadioDefault"]:checked'
);
let checkedRadio;

data.addEventListener('change', (e) => {
  data.value = e.target.value;
});

radioBtn.forEach((btn) => {
  btn.addEventListener('click', (e) => {
    checkedRadio = btn.value;
  });
});

solve.addEventListener('click', () => {
  const arr = splitArr(data.value, checkedRadio).map((x) => +x);
  mean.innerText = meanCal(arr);
  median.innerText = medianCal(arr);
  modus.innerText = modusCal(arr);
  harmonik.innerText = harmonikCal(arr);
  tabelFrekuensi(arr);
});

function meanCal(arr) {
  return arr.reduce((a, b) => a + b) / arr.length;
}

function medianCal(arr) {
  const length = arr.length;
  if (length % 2 == 1) {
    return arr[(length - 1) / 2];
  } else {
    return (arr[length / 2 - 1] + arr[length / 2]) / 2;
  }
}

function harmonikCal(arr) {
  const length = arr.length;
  let num = 0;
  arr.forEach((x) => {
    num += 1 / x;
  });
  return arr.length / num;
}

function modusCal(arr) {
  const obj = {};
  arr.forEach((x) => {
    if (obj[x] == undefined) {
      obj[x] = 0;
    }
    obj[x]++;
  });
  let max = 0;
  Object.keys(obj).forEach((key) => {
    if (obj[key] > max) {
      max = obj[key];
    }
  });
  return Object.keys(obj)
    .filter((key) => obj[key] == max)
    .join(' dan ');
}

function splitArr(str, radio) {
  switch (radio) {
    case 'spasi':
      return str.split(' ');

    case 'koma':
      return str.split(',');

    case 'koma-spasi':
      return str.split(', ');
  }
}

function tabelFrekuensi(arr) {
  const length = arr.length;
  const sorted = arr.sort((a, b) => a - b);
  const max = sorted[length - 1];
  const min = sorted[0];
  const rentangan = max - min;
  const jumlahKelas = Math.ceil(1 + 3.3 * Math.log10(40));
  const panjangKelas = Math.ceil(rentangan / jumlahKelas);
  renderTable(panjangKelas, jumlahKelas, min, arr);
}

function renderTable(panjangKelas, jumlahKelas, min, arr) {
  let tabel = '';
  let batasBawah = min;
  for (let i = 0; i < panjangKelas; i++) {
    const frekuensi = arr.filter(
      (x) => x >= batasBawah && x <= batasBawah + jumlahKelas - 1
    );
    tabel += `
  <tr>
     <th scope="row">${batasBawah} - ${batasBawah + jumlahKelas - 1}</th>
     <td>${frekuensi.length}</td>
   </tr>
   `;
    batasBawah += jumlahKelas;
  }
  dataTable.innerHTML = `
  <table class="table table-hover table-dark">
    <thead>
       <tr>
          <th scope="col">Nilai Interval</th>
          <th scope="col">Frekuensi</th>
       </tr>
    </thead>
    <tbody class="table-light">
      ${tabel}
      <tr class="table-dark">
        <th scope="row">Jumlah</th>
        <td>${arr.length}</td>
      </tr>
    </tbody>
  </table>`;
}
