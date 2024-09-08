const fs = require("fs/promises");
const path = require("node:path");

async function moveFolderContents(src, dest) {
    const entries = await fs.readdir(src, {withFileTypes: true});

    await fs.mkdir(dest, {recursive: true});

    for (const entry of entries) {
        const srcPath = path.join(src, entry.name);
        const destPath = path.join(dest, entry.name);
        if (entry.isDirectory()) {
            await moveFolderContents(srcPath, destPath);
        } else {
            await fs.rename(srcPath, destPath);
        }
    }

    await fs.rmdir(src);
}


const taskFSModules = async () => {

    try {
        const baseFolder = path.join(__dirname, "baseFolder")
        await fs.mkdir(baseFolder, {recursive: true});

        const foldersName = ["folder1", "folder2", "folder3", "folder4"]
        const filesName = ["file 1", "file 2"];

        await Promise.all(foldersName.map(async folder => {
            const folderPath = path.join(baseFolder, folder);
            await fs.mkdir(folderPath, {recursive: true});

            await Promise.all(filesName.map(async file => {
                const filePath = path.join(folderPath, file);
                await fs.writeFile(filePath, `hello from file № ${Number(file.substring(4, 6))}`)
            }))

        }))
        const data = await fs.readdir(baseFolder);
        for (const folder of data) {
            const folderPath = path.join(baseFolder, folder);
            const data = await fs.readdir(folderPath);
            for (const file of data) {
                const numberFile = Number(file.substring(4, 6))
                const filePath = path.join(folderPath, file);
                if (numberFile % 2 !== 0) {
                    await fs.appendFile(filePath, "\nSome changes in unpair files")
                }
            }
        }
        const fourthFolder = path.join(baseFolder, "folder4")
        await fs.rm(fourthFolder, {recursive: true});
        const secondFolder = path.join(baseFolder, "folder2")
        const dataSecondFolder = await fs.readdir(secondFolder)
        await Promise.all(dataSecondFolder.map(async (file) => await fs.unlink(path.join(secondFolder, file))))

        const newBaseFolderPath = path.join(__dirname, "newBaseFolder");
        await fs.mkdir(newBaseFolderPath, {recursive: true});

        const foldersInBaseFolder = await fs.readdir(baseFolder, {withFileTypes: true});
        for (const folder of foldersInBaseFolder) {
            try {
                const oldPath = path.join(baseFolder, folder.name);
                const newPath = path.join(newBaseFolderPath, folder.name);

                if (folder.isDirectory()) {
                    await moveFolderContents(oldPath, newPath);
                } else {
                    console.log(`Miss file: ${folder.name}`);
                }
            } catch (renameError) {
                console.error(`error of moving ${folder.name}:`, renameError.message);
            }
        }

        const path2FileInFolder1 = path.join(newBaseFolderPath, "folder1")
        const pathFileInFolder5 = path.join(newBaseFolderPath, "folder5")
        await fs.mkdir(pathFileInFolder5, {recursive: true});
        const filesFromNewBaseFolder = await fs.readdir(path2FileInFolder1)

        for (const file of filesFromNewBaseFolder) {
            if (file === "file 1") {
                await fs.copyFile(path.join(path2FileInFolder1, file), path.join(pathFileInFolder5, "newFile-1"))
            }
        }
        const containInFolder5 = await fs.readdir(pathFileInFolder5, {withFileTypes: true})
        for (const file of containInFolder5) {
            if (file.isFile()) {
                console.log(`${file.name} is file`)
            } else console.log(`${file.name} isn't file`)

        }


    } catch (error) {
        console.error(error.message);
    }
}

void taskFSModules()

// const fsWithoutPromises = require("fs");
// const streamers = async () => {
//     const pathToFile = path.join(__dirname, "big-file.pdf")
//     const newPathToFile = path.join(__dirname, "new-big-file.pdf");
//     const readFileSteamer = await fsWithoutPromises.createReadStream(pathToFile)
//     const writeFileSteamer = await fsWithoutPromises.createWriteStream(newPathToFile)
//     readFileSteamer.on("data", (chunk) => {
//         console.log("chunk", chunk.length)
//         writeFileSteamer.write(chunk)
//     })
//     // readFileSteamer.pipe(writeFileSteamer)
// }
//
// void streamers()

const readLine = require("readline/promises")

const readLineFunc = async () => {
    const readline = readLine.createInterface({
        input: process.stdin,
        output: process.stdout
    })
    const food = await readline.question("What your fav food?")
    console.log(`Your fav food is ${food}`)
    process.exit(0)
}

void readLineFunc()


const EventEmitter = require("events")

const emitter = new EventEmitter()

emitter.on("event", (...args) => {
    console.log(`Event happened ${args} time`)
})

for (let i = 1; i <= 5; i++) {
    emitter.emit("event", i)
}

emitter.once("event2", (...args) => {
    console.log(`I'm ${args}`);
})

emitter.on("event2", (...args) => {
    console.log(`I'm ${args}`);
})

emitter.emit("event2", 23)
emitter.emit("event2", 24)
emitter.emit("event2", 25)
emitter.emit("event2", 26)