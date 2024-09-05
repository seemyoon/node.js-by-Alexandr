const path = require("node:path");
const fsPromises = require('node:fs/promises');

const createFilesAndFolders = async () => {
// code to create 5 folder, put 5 files in each

    await fsPromises.mkdir(path.join(__dirname, 'new-folder-A'), {recursive: true})
    const pathFileA1 = path.join(__dirname, '/new-folder-A', 'file1.txt')
    await fsPromises.writeFile(pathFileA1, "hello from first file/new-folder")

    const pathFileA2 = path.join(__dirname, "/new-folder-A", "file2.txt")
    await fsPromises.writeFile(pathFileA2, "hello from second file/new-folder")

    const pathFileA3 = path.join(__dirname, "/new-folder-A", "file3.txt")
    await fsPromises.writeFile(pathFileA3, "hello from third file/new-folder")

    const pathFileA4 = path.join(__dirname, "/new-folder-A", "file4.txt")
    await fsPromises.writeFile(pathFileA4, "hello from fourth file/new-folder")

    const pathFileA5 = path.join(__dirname, "/new-folder-A", "file5.txt")
    await fsPromises.writeFile(pathFileA5, "hello from third file/new-folder")

    // const pathOldNameFolder = path.join(__dirname, "/new-folder")
    // const pathNewNameFolder = path.join(__dirname, "/new-folder-A")
    // await fsPromises.rename(pathOldNameFolder, pathNewNameFolder)

    await fsPromises.mkdir(path.join(__dirname, "new-folder-B"), {recursive: true})
    const pathFileB1 = path.join(__dirname, "/new-folder-B", "file1.txt")
    await fsPromises.writeFile(pathFileB1, "hello from first file/new-folder-B")

    const pathFileB2 = path.join(__dirname, "new-folder-B", "file2.txt")
    await fsPromises.writeFile(pathFileB2, "hello from second file/new-folder")


    const pathFileB3 = path.join(__dirname, "/new-folder-B", "file3.txt")
    await fsPromises.writeFile(pathFileB3, "hello from third file/new-folder")


    const pathFileB4 = path.join(__dirname, "/new-folder-B", "file4.txt")
    await fsPromises.writeFile(pathFileB4, "hello from fourth file/new-folder")

    const pathFileB5 = path.join(__dirname, "/new-folder-B", "file5.txt")
    await fsPromises.writeFile(pathFileB5, "hello from fifth file/new-folder")

    await fsPromises.mkdir(path.join(__dirname, "new-folder-C"), {recursive: true})
    const pathDirectoryC = path.join(__dirname, "new-folder-C")

    const filesArrayC = [
        ["file1.txt", "hello from 1C file/new-folder"],
        ["file2.txt", "hello from 2C file/new-folder"],
        ["file3.txt", "hello from 3C file/new-folder"],
        ["file4.txt", "hello from 4C file/new-folder"],
        ["file5.txt", "hello from 5C file/new-folder"],
    ]


    for (const [fileName, content] of filesArrayC) {
        const filePath = path.join(pathDirectoryC, fileName);
        await fsPromises.writeFile(filePath, content);
        // console.log(` File ${fileName}C was created successfully.`);
    }

    await fsPromises.mkdir(path.join(__dirname, "new-folder-D"), {recursive: true})
    const pathDirectoryD = path.join(__dirname, "new-folder-D")

    const filesArrayD = [
        ["file1.txt", "hello from 1D file/new-folder"],
        ["file2.txt", "hello from 2D file/new-folder"],
        ["file3.txt", "hello from 3D file/new-folder"],
        ["file4.txt", "hello from 4D file/new-folder"],
        ["file5.txt", "hello from 5D file/new-folder"],
    ]
    for (const [file, content] of filesArrayD) {
        const filePath = path.join(pathDirectoryD, file);
        await fsPromises.writeFile(filePath, content);
        // console.log(` File ${file}D was created successfully.`);
    }

    const fileArrayE = [
        ["file1.txt", "hello from 1E file/new-folder"],
        ["file2.txt", "hello from 2E file/new-folder"],
        ["file3.txt", "hello from 3E file/new-folder"],
        ["file4.txt", "hello from 4E file/new-folder"],
        ["file5.txt", "hello from 5E file/new-folder"],
    ]

    await fsPromises.mkdir(path.join(__dirname, "new-folder-E"), {recursive: true});
    const pathDirectoryE = path.join(__dirname, "new-folder-E")


    for (const [file, content] of fileArrayE) {
        const filePath = path.join(pathDirectoryE, file);
        await fsPromises.writeFile(filePath, content);
        // console.log(` File ${file}E was created successfully.`);
    }
// code to read files and folder

    const data1 = await fsPromises.readFile(path.join(__dirname, "/new-folder-A", "file1.txt"), "utf-8")

    const data2 = await fsPromises.readFile(path.join(__dirname, "/new-folder-C", "file2.txt"), "utf-8")

    const data3 = await fsPromises.readFile(path.join(__dirname, "/new-folder-E", "file3.txt"), "utf-8")

    // console.log(data1, data2, data3)


// code to check, if folder or files
    const pathSomeFolder = path.join(__dirname, "/new-folder-A")
    const stat = await fsPromises.stat(pathSomeFolder);
    // console.log(stat.isFile())

    const pathSomeFile = path.join(__dirname, "/new-folder-B")
    const stat2 = await fsPromises.stat(pathSomeFile)
    // console.log(stat2.isDirectory())

    const pathSomeFolder2 = path.join(__dirname, "/new-folder-D")
    const stat3 = await fsPromises.stat(pathSomeFolder2)
    // console.log(stat3.isDirectory())

// additional , to add new-folders-A, new-folders-B, new-folders-C, new-folders-D, new-folders-E to baseFolder
    const foldersPathArray = [
        "/new-folder-A",
        "/new-folder-B",
        "/new-folder-C",
        "/new-folder-D",
        "/new-folder-E",
    ]

    await fsPromises.mkdir(path.join(__dirname, "baseFolder"), {recursive: true})
    const baseFolder = path.join(__dirname, "/baseFolder")


    for (const folderPathArray of foldersPathArray) {
        await fsPromises.rename(path.join(__dirname, folderPathArray),
            path.join(baseFolder, folderPathArray))
    }

}


void createFilesAndFolders()