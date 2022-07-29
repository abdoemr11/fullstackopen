
function info (...param) {
    if(process.env.NODE_ENV !== 'test')
        console.log(...param)
}
const error = (...params) => {
    if(process.env.NODE_ENV !== 'test')
        console.error(...params)
}

module.exports = {
    info, error
}