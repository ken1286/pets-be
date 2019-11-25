const bcrypt = require('bcryptjs');

const hash = bcrypt.hashSync('12345', 10); // 2 ^ n
console.log(hash);
