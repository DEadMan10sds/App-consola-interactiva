const { v4: uuidv4 } = require("uuid");

class Tarea {
  id = "";
  descr = "";
  completed = null;

  constructor(descr) {
    this.id = uuidv4();
    this.descr = descr;
  }
}

module.exports = Tarea;
