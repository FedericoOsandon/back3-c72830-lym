const { Command } = require('commander')

const program = new Command()

program
    .option('-d', 'Variable para debug', false)
    .option('-p <port>', 'Puerto que va a usar nuestro servidor', 8080)
    .option('--mode <mode>', 'Modo de trabajo en nuestro servidor', 'production')
    .requiredOption('-u <user>', 'USuarion utilizando el aplicativo', 'No se ha declarado un usuario')
    .option('-l, --letters [letters...]', 'letras especificas' )
    .parse()

console.log('opciones: ', program.opts())
console.log(program.args)

// node commander.js -d -p 3000 --mode development -u root --letters a b c
// node commander.js  -p 3000 -u root 2 a 5 --letters a b c