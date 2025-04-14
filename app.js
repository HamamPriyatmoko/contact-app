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
const { simpanData } = require('./contacts');
// yargs.command(
//   'add',
//   'Menambahkan Contact Baru',
//   () => {},
//   (argv) => {
//     console.log(argv,nama);
//   }
// );

yargs.command({
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
});

yargs.parse();
