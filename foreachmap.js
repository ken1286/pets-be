const nums = [3, 4, 5, 1, 0, 10, 10, 10];

// for (let i = 0; i < numArr.length; i++) {
//   console.log(numArr[i]);
//   console.log(i);
// }

let total = 0;
console.log('foreach');
nums.forEach(num => {
  console.log('num: ', num);
  total = total + num;
});

console.log('Total: ', total);

const newNums = nums.map(num => {
  return num + 1;
});

console.log('old nums', nums);
console.log('new nums', newNums);

const aliens = [
  {
    name: 'baby yoda',
    species: 'yoda',
    color: 'green',
    power: 'force'
  },
  {
    name: 'devoura',
    species: 'norwegian',
    color: 'yellow',
    power: 'egirl'
  },
  {
    name: 'blake',
    species: 'lambdite',
    color: 'black',
    power: 'flex'
  },
  {
    name: 'mello',
    species: 'AMERICAN',
    color: 'WHITE',
    power: 'FREEDOM'
  }
];

// const newAliens = aliens.map(alien => {
//   return { ...alien, species: 'AMERICAN' };
// });

// console.log(newAliens);

const filteredAliens = aliens.filter(alien => {
  return alien.species !== 'AMERICAN';
});

console.log(filteredAliens);
