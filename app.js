// mengambil argument dari command line
// const command = process.argv[2];
// if(command === 'add'){

// }else if( command === 'remove'){

// }else if(command === 'list'){

// }
// const { tulisPertanyaan, simpanData } = require('./contacts.js');

// async function main() {
//   const nama = await tulisPertanyaan('Masukkan Nama Anda : ');
//   const nomerHp = await tulisPertanyaan('Masukkan Nomer Hp : ');
//   const email = await tulisPertanyaan('Masukkan Email Anda : ');

//   simpanData(nama, nomerHp, email);
// }

// main();

const yargs = require('yargs');
const { simpanData, listContact, cariData, hapusDataContact } = require('./contacts');
// yargs.command(
//   'add',
//   'Menambahkan Contact Baru',
//   () => {},
//   (argv) => {
//     console.log(argv,nama);
//   }
// );

yargs
  .command({
    command: 'add',
    describe: 'Menambahkan Contact Baru',
    builder: {
      // Untuk membuat perintah --(sesuai properti yang kita buat)
      nama: {
        describe: 'Nama Lengkap',
        demandOption: true, // Agar wajib di isi
        type: 'string',
      },
      email: {
        describe: 'Email',
        demandOption: false,
        type: 'string',
      },
      noHp: {
        describe: 'Nomer Handphone',
        demandOption: true,
        type: 'string',
      },
    },
    handler(argv) {
      simpanData(argv.nama, argv.email, argv.noHp);
    },
  })
  .demandCommand(); //Untuk warning

// Menampilkan daftar semua nama contact
yargs.command({
  command: 'list',
  describe: 'Menampilkan semua list nama & nomer Hp',
  handler() {
    listContact();
  },
});

yargs.command({
  command: 'details',
  describe: 'Manampilkan detail sebuah contact berdasarkan nama',
  builder: {
    nama: {
      describe: 'Nama lengkap',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    cariData(argv.nama);
  },
});
yargs.command({
  command: 'hapus',
  describe: 'Menghapus data contact berdasarkan nama',
  builder: {
    nama: {
      describe: 'Nama lengkap',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    hapusDataContact(argv.nama);
  },
});

yargs.parse();
