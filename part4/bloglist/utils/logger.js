
function info (...param) {
    console.log(...param)
}
const error = (...params) => {
    console.error(...params)
}

module.exports = {
    info, error
}