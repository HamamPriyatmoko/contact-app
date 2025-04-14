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

const simpanData = (nama, email, nomerHp) => {
  const contact = { nama, email, nomerHp };
  const fileBuffer = fs.readFileSync('./data/contacts.json', 'utf-8');
  const data = JSON.parse(fileBuffer);

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
  const nomer = validator.isMobilePhone(nomerHp, ['id-ID']);
  if (!nomer) {
    return console.log(chalk.red.inverse.bold('Format Nomer Salah'));
  }

  data.push(contact);

  fs.writeFileSync('./data/contacts.json', JSON.stringify(data, '', 2));
  console.log(chalk.green.bold('Contact Berhasil di simpan'));
};

module.exports = { simpanData };
