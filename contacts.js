const fs = require('fs');
const chalk = require('chalk');
var validator = require('validator');

// Membuat Folder Data
const dirPath = './data';
if (!fs.existsSync(dirPath)) {
  fs.mkdirSync(dirPath);
  console.log('Folder Berhasil Dibuat');
}

// Membuat File contacts.json
const filePath = './data/contacts.json';
if (!fs.existsSync(filePath)) {
  fs.writeFileSync(filePath, '[]', 'utf-8');
  console.log('File Path Berhasil Dibuat');
}

const loadContact = function () {
  const fileBuffer = fs.readFileSync('./data/contacts.json', 'utf-8');
  const data = JSON.parse(fileBuffer);
  return data;
};

const simpanData = (nama, email, nomerHp) => {
  const contact = { nama, email, nomerHp };

  const data = loadContact();

  //Cek terlebih dahulu
  const duplikat = data.find((element) => element.nama === nama);
  if (duplikat !== undefined) {
    console.log(`${chalk.red.inverse.bold('Contacts sudah terdaftar, gunakan nama lain')}`);
    return false;
  }

  // Cek Email
  const emailValid = validator.isEmail(email);
  // Mengecek lebih dulu kalo ada emailnya atau tidak karena konteks di project ini email tidak wajib di isi
  if (email) {
    if (!emailValid) {
      console.log(chalk.red.inverse.bold('Format Email anda salah'));
      return false;
    }
  }

  // Cek Nomer HP
  const nomer = validator.isMobilePhone(nomerHp, 'id-ID');
  if (!nomer) {
    return console.log(chalk.red.inverse.bold('Nomor Hp Tidak Valid!'));
  }

  data.push(contact);

  fs.writeFileSync('./data/contacts.json', JSON.stringify(data, '', 2));
  console.log(chalk.green.inverse.bold('Contact Berhasil di simpan'));
};

const listContact = function () {
  const contacts = loadContact();
  console.log(chalk.green.inverse.bold('Daftar Kontak: '));
  contacts.forEach((element, i) => {
    console.log(`${i + 1}. ${element.nama} - ${element.nomerHp}`);
  });
};

const cariData = function (nama) {
  const contacts = loadContact();
  const result = contacts.find((element) => {
    // element.nama == nama;
    return element.nama.toLowerCase() === nama.toLowerCase();
  });
  if (!result) {
    console.log(chalk.red.inverse.bold(`${nama} Data tidak ditemukan`));
  } else {
    console.log(chalk.green.inverse.bold(result.nama));
    console.log(result.nomerHp);
    if (result.email) {
      console.log(result.email);
    }
  }
};

const hapusDataContact = function (nama) {
  const contacts = loadContact();
  const newContacts = contacts.filter((element) => {
    // element.nama == nama;
    return element.nama.toLowerCase() !== nama.toLowerCase();
  });

  if (contacts.length === newContacts.length) {
    console.log(chalk.red.inverse.bold(`${nama} Data tidak ada`));
  } else {
    fs.writeFileSync('./data/contacts.json', JSON.stringify(newContacts, '', 2));
    console.log(chalk.green.inverse.bold('Contact Berhasil di Hapus'));
  }
};

module.exports = { simpanData, listContact, cariData, hapusDataContact };
