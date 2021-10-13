const load = require("../../app/dummy/load")
const unload = require("../../app/dummy/unload")

module.exports.SESSION_ADMIN_TRAINER = load.SESSION_ADMIN_TRAINER
module.exports.SESSION_ADMIN = load.SESSION_ADMIN
module.exports.SESSION_TRAINER = load.SESSION_TRAINER
module.exports.SESSION_TRAINER_ALT_1 = load.SESSION_TRAINER_ALT_1
module.exports.SESSION_TRAINER_ALT_2 = load.SESSION_TRAINER_ALT_2
module.exports.SESSION_TRAINER_ALT_3 = load.SESSION_TRAINER_ALT_3
module.exports.SESSION_LEARNER = load.SESSION_LEARNER
module.exports.SESSION_LEARNER_ALT_1 = load.SESSION_LEARNER_ALT_1
module.exports.SESSION_LEARNER_ALT_2 = load.SESSION_LEARNER_ALT_2
module.exports.SESSION_LEARNER_ALT_3 = load.SESSION_LEARNER_ALT_3

module.exports.SESSION_INVALID_USER = load.SESSION_INVALID_USER
module.exports.SESSION_INVALID_SESSION = load.SESSION_INVALID_SESSION

module.exports.reload = () => {
    return new Promise((resolve, _) => {
        unload.unload().then(() => { 
            load.load().then(() => { resolve() })
        })
    });
}
