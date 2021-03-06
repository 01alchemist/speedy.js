const fs = require("fs");
const path = require("path");
const dependencyUtils = require("../../compiler/scripts/dependency-utils");

const EMSCRIPTEN_GIT_URL = "https://github.com/kripken/emscripten.git";

// TODO Switch to emsdk if web assembly backend is included
function buildEmscripten(directory) {
    console.log("Build Emscripten");
    const emscriptenDirectory = path.join(directory, "emscripten");
    dependencyUtils.gitCloneOrPull(EMSCRIPTEN_GIT_URL, emscriptenDirectory);
    dependencyUtils.exec("git -C %s checkout incoming", emscriptenDirectory);

    return emscriptenDirectory;
}

function install(directory) {
    if (process.env.EMSCRIPTEN) {
        fs.symlinkSync(process.env.EMSCRIPTEN, path.join(directory, "emscripten"), "directory");
        return process.env.EMSCRIPTEN;
    }

    return buildEmscripten(directory);
}

module.exports = { install: install };
