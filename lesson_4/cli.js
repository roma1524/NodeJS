const fs = require('fs/promise');
const {lstatSync} = require('fs');
const inquirer = require('inquirer');
const yargs = require('yargs');
const path = require('path');

let currentDirectory = process.cwd();
const options = yargs
  .positional('d', {
    describe: 'Path to directory',
    default: process.cwd(),
  })
  .positional('p', {
    describe: 'Pattern',
    default: '',
  }).argv;
console.log(options);

class ListItem {
  constructor(path, filename) {
    this.path = path;
    this.filename = filename;
  }

  get isDir() {
    return lstatSync(this.path).isDirectory();
  }
}

const run = async () => {
  const list = await fs.readdir(currentDirectory);
  const items = list.map(fileName =>
    new ListItem(path.join(currentDirectory, fileName), fileName));

  const item = await inquirer.prompt([
    {
      name: 'fileName',
      type: 'List',
      message: `Choose: ${currentDirectory}`,
      choices: items.map(item => ({name: item.filename, value: item})),
    }
  ])
    .then(answer => answer.fileName);

  if (item.isDir) {
    currentDirectory = item.path;
    return await run();
  } else {
    const data = await fs.readFile(item.path, 'utf-8');

    if (options.p == null) console.log(data);
    else {
      const regEXP = new RegExp(options.p, 'utf-8');
      console.log(data.match(regEXP));
    }
  }
}

run();