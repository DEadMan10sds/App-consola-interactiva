const Tarea = require("./tarea");
const colors = require("colors/safe");

class Tareas {
  _listado = {};

  get listadoArray() {
    const listado = [];

    Object.keys(this._listado).forEach((keys) =>
      listado.push(this._listado[keys])
    );

    return listado;
  }

  constructor() {
    this._listado = {};
  }

  borrarTarea(id = "") {
    if (this._listado[id]) {
      delete this._listado[id];
      console.log("Tarea borrada correctamente");
    }
  }

  crearTarea(descr = "") {
    const tarea = new Tarea(descr);
    this._listado[tarea.id] = tarea;
  }

  cargarTareasArray(tareas = []) {
    tareas.forEach((tarea) => {
      this._listado[tarea.id] = tarea;
    });
  }

  listadoCompleto() {
    this.listadoArray.forEach((tarea, index) => {
      console.log(colors.blue(`${++index}.- `) + colors.magenta(`${tarea.id}`));
      console.log(`\tDescripcion: ${tarea.descr}`);
      //Validación de completado con if
      // if (tarea.completed) console.log(`\tEstado: Completa`.green);
      // else console.log(`\tEstado: Incompleta`.red);

      //Validación de completado con lógica
      const estado = tarea.completed ? "Completa".green : "Pendiende".red;
      console.log("\t" + estado);
    });
  }

  listarSelectivas(completadas = true) {
    var tareasSeleccionadas = [];
    if (completadas)
      tareasSeleccionadas = this.listadoArray.filter(
        (tarea) => tarea.completed != null
      );
    else
      tareasSeleccionadas = this.listadoArray.filter(
        (tarea) => tarea.completed === null
      );
    if (tareasSeleccionadas.length === 0) console.log("No hay tareas".red);
    else {
      tareasSeleccionadas.forEach((tarea, index) => {
        console.log(
          colors.blue(`${++index}.- `) + colors.magenta(`${tarea.id}`)
        );
        console.log(`\tDescripcion: ${tarea.descr}`);
        //Validación de completado con if
        // if (tarea.completed) console.log(`\tEstado: Completa`.green);
        // else console.log(`\tEstado: Incompleta`.red);

        //Validación de completado con lógica
        const estado = tarea.completed ? "Completa".green : "Pendiende".red;
        console.log("\t" + estado);
      });
    }
  }

  completarTareas(tareasCambiantes = []) {
    tareasCambiantes.forEach((id) => {
      const tarea = this._listado[id];
      if (!tarea.completed) tarea.completed = new Date().toISOString();
    });
    this.listadoArray.forEach((tarea) => {
      if (!tareasCambiantes.includes(tarea.id)) {
        this._listado[tarea.id].completed = null;
      }
    });
  }
}

module.exports = Tareas;
