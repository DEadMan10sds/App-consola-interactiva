require("colors");

const { guardarDB, leerDB } = require("./helpers/guardarArchivo");
//const {mostrarMenu, pausa} = require('./helpers/mensajes');
const {
  inquirerMenu,
  pausa,
  leerInput,
  mostarListadoChecklist,
  listadoTareaBorrar,
  confirmar,
} = require("./helpers/inquirer");
const Tareas = require("./models/tareas");

const main = async () => {
  console.clear();
  const tareas = new Tareas();
  const DB = leerDB();
  if (DB) tareas.cargarTareasArray(DB);
  else {
    console.log("Error al cargar la Base de datos");
    await pausa();
  }

  let option = "";
  do {
    /*const tarea = new Tarea("Terminar curso");
        tareas._listado[tarea.id] = tarea;*/
    //console.log(tareas);
    //if(option !== '0')await pausa();
    option = await inquirerMenu();
    switch (option) {
      case "1":
        //Crear tarea
        const descr = await leerInput(
          "Ingrese la descripcion de la nueva tarea: "
        );
        tareas.crearTarea(descr);
        break;
      case "2":
        //Listar tareas
        //console.log(tareas.listadoArray);
        tareas.listadoCompleto();
        break;
      case "3":
        tareas.listarSelectivas(true);
        break;
      case "4":
        tareas.listarSelectivas(false);
        break;
      case "5":
        const ids = await mostarListadoChecklist(tareas.listadoArray);
        tareas.completarTareas(ids);
        break;
      case "7":
        //Obtener id de tarea a eliminar
        const id = await listadoTareaBorrar(tareas.listadoArray);
        if (id !== "0") {
          //Solicitar confirmación de borrado
          const confirmacion = await confirmar(`Desea borrar la tarea? `);
          if (confirmacion) tareas.borrarTarea(id);
        }
        break;
    }

    //Guarda el arreglo en la "Base de datos"
    guardarDB(tareas.listadoArray);

    await pausa();
  } while (option !== "0");
};

main();
