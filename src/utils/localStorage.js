const low = require("lowdb")
const LocalStorage = require("lowdb/adapters/LocalStorage")

const adapter = new LocalStorage("storage")
const storage = low(adapter)

const initialState = {
  name: "bonjour"
}

/**
 * Save data on localStorage
 * @param {String} type
 * @param {String} data
 * @param {String} key
 */
storage.save = (type, data, key) => {
  if (key) {
    if (!storage.has(type).value()) {
      storage.set(type, {}).write()
    }

    storage
      .get(type)
      .set(key, data)
      .write()
  } else {
    storage.set(type, data).write()
  }
}

storage.reset = ({ name, version, buildFromTmp } = initialState) => {
  storage.setState({ name, version, buildFromTmp })
}

storage.clear = () => {
  window.localStorage.clear()
}

storage.initialState = initialState

export default storage
