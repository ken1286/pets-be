// const bcrypt = require('bcryptjs');

// const hash = bcrypt.hashSync('12345', 10); // 2 ^ n
// console.log(hash);

const oldPet = { name: 'taco', species: 'dog', age: 5, stuff: 'stuff' };
const changes = { name: 'tacos', species: 'dog', age: 4 };

const newPet = { ...oldPet, ...changes };

console.log(newPet);
