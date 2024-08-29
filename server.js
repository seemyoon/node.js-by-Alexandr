const {greeting} = require("./helper")

greeting()
const path = require('path')
const namePerson = path.join(__dirname, "txtFiles")

const pathNormalize = path.normalize("////////aboutMe///////born")
const namePersonWithPathNormalize = path.join(namePerson, pathNormalize)
// console.log(namePersonWithPathNormalize)

// os modules
const os = require('os')
// console.log(os.userInfo())
// console.log(os.arch())
// console.log(os.cpus())

// fs modules
const fs = require('fs')

fs.readFile(path.join(namePersonWithPathNormalize, "town"), {encoding: "utf-8"}, (err, data) => {
    if (err) throw new Error()
    console.log(data)
})

fs.writeFile(path.join(__dirname, "txtFiles", "aboutMe", "hobby.txt"), "My hobby is coding", (err) => {
    if (err) throw err
})