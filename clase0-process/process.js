// console.log(process.cwd())
// console.log(process.pid)
// console.log(process.memoryUsage())
// console.log(process.version)
// console.log(process.cwd())
// console.log(process.cwd())

// console.log(process.argv.slice(2))
// console.log(process.argv)

// node .\process.js 1 2 3


process.on('exit', code => {
    console.log(`ESte cód se ejecutara justo antes de salir del proceso ${code}`)
    
})
process.on('uncaughtException', exception => {
    console.log(`Este cód atrapa todas las excepciones no controladas ${exception}`)
    
})

console.log('inicio del proceso')

// error
console()

console.log('fil del proceso')

