const load = require("../../app/dummy/load")
const unload = require("../../app/dummy/unload")

module.exports.reload = () => {
    return new Promise((resolve, _) => {
        unload.unload().then(() => { 
            load.load().then(() => { resolve() })
        })
    });
}
