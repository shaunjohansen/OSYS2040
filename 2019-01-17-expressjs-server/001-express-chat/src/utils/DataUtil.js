const fs = require('fs')
const path = require('path')

function getFilename(name) {
  return path.join(__dirname, '../../data', `${name}.json`)
}

function readDataFile(name) {
  try {
    const filename = getFilename(name)
    const json = fs.readFileSync(filename)
    return JSON.parse(json)
  } catch(exception) {
    return {}
  }
}

function writeDataFile(name, data) {
  const filename = getFilename(name)
  fs.writeFileSync(filename, JSON.stringify(data, null, 2))
}

module.exports = {
  readUsers: () => readDataFile('users'),
  writeUsers: (data) => writeDataFile('users', data),

  readRooms: () => readDataFile('chat-rooms'),
  writeRooms: (data) => writeDataFile('chat-rooms', data),
}
