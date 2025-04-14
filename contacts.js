const fs = require('fs');

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

const simpanData = (nama, nomerHp, email) => {
  const contact = { nama, nomerHp, email };
  const fileBuffer = fs.readFileSync('./data/contacts.json', 'utf-8');
  const data = JSON.parse(fileBuffer);
  data.push(contact);

  const duplikat = data.find(({ nama }) => nama === nama);
  if (duplikat) {
    console.log('Contacts sudah terdaftar, gunakan nama lain');
    return;
  }

  fs.writeFileSync('./data/contacts.json', JSON.stringify(data, '', 2));
  console.log('Berhasil di simpan');
};

module.exports = { simpanData };
