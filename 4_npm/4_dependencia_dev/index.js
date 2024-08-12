const _ = require('lodash');
// const chalk = require('chalk');
import chalk from "chalk";


const a = [5, 7, 8, 9]
const b = [1, 5, 9, 10]

const diff = _.difference(a, b);

console.log(diff);
