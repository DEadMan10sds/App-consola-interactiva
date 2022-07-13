const { rejects } = require('assert');

require('colors');

const mostrarMenu = () => {

    return new Promise((resolve, reject) => {
        
        console.clear();
        console.log('==========================='.cyan);
        console.log('   Seleccione una opcion'.cyan);
        console.log('===========================\n'.cyan);
    
        console.log(`${`1.`.green} Crear tarea`);
        console.log(`${`2.`.green} Mostrar tareas`);
        console.log(`${`3.`.green} Mostrar tareas completadas`);
        console.log(`${`4.`.green} Mostrar tareas pendientes`);
        console.log(`${`5.`.green} Completar tarea(s)`);
        console.log(`${`6.`.green} Borrar tarea`);
        console.log(`${`7.`.green} Editar tarea`);
        console.log(`${`0.`.green} Salir \n`);
    
        const readLine = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        });
    
        readLine.question('Seleccione una opcion: ', (option) => {
            //console.log({option});
            readLine.close();
            resolve(option);
        });
    });

}

const pausa = () => {

    return new Promise((resolve) => {
        
        const readLine = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        });
    
        readLine.question(`\n Presione ${'ENTER'.magenta} para continuar \n`, (option) => {
            readLine.close();
            resolve();
        });
    });

}


module.exports = 
{
    mostrarMenu,
    pausa,
}