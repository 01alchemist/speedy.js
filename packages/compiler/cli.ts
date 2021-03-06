#!/usr/bin/env node

import * as path from "path";
import * as ts from "typescript";
import * as program from "commander";

const packageJson = require("./package.json");
import {reportDiagnostics} from "./src/util/diagnostics";
import {Compiler} from "./src/compiler";
import {IExportedCommand} from "commander";
import {initializeCompilerOptions, UninitializedSpeedyJSCompilerOptions} from "./src/speedyjs-compiler-options";

interface CommandLineArguments extends IExportedCommand {
    files: string[],
    config?: string,
    unsafe?: boolean;
    emitLlvm?: boolean;
    binaryenOpt?: boolean;
    disableHeapNukeOnExit?: boolean;
    exposeGc?: boolean;
    exportGc?: boolean;
    optimization?: boolean;
    settings: {
        TOTAL_MEMORY?: number;
        TOTAL_STACK?: number;
        GLOBAL_BASE?: number;
    };
}

function parseCommandLine(): CommandLineArguments {
    function parseSettings(setting: string, memo: any) {
        const [key, value] = setting.split("=");
        memo[key] = parseInt(value);
        return memo;
    }

    program
        .version(packageJson.version)
        .usage("[options] [files ...]")
        .option("-c --config <configFile>", "The path to the tsconfig.json")
        .option("--unsafe", "Use the unsafe runtime system")
        .option("--emit-llvm", "Emit LLVM Assembly Code instead of WASM files")
        .option("--binaryen-opt", "Optimize using Binaryen opt")
        .option("--expose-gc", "Exposes the speedy js garbage collector in the module as speedyJsGc")
        .option("--export-gc", "Exposes and exports the speedy js garbage collector as the symbol speedyJsGc")
        .option("--disable-heap-nuke-on-exit", "Disables nuking of the heap prior to the exit of the entry function (its your responsible to call the gc in this case!)")
        .option("--no-optimization")
        .option("-s --settings [value]", "additional settings", parseSettings, {})
        .parse(process.argv);

    return program as CommandLineArguments;
}

function parseConfigFile(configFileName: string): ts.ParsedCommandLine {
    const configurationFileText = ts.sys.readFile(configFileName);
    const jsonConfig = ts.parseConfigFileTextToJson(configFileName, configurationFileText);
    if (jsonConfig.error) {
        reportDiagnostics([jsonConfig.error]);
        ts.sys.exit(ts.ExitStatus.DiagnosticsPresent_OutputsSkipped);
    }

    const parsedConfiguration = ts.parseJsonConfigFileContent(jsonConfig.config, ts.sys, path.dirname(configFileName), undefined, configFileName);
    if (parsedConfiguration.errors.length > 0) {
        reportDiagnostics(parsedConfiguration.errors);
        ts.sys.exit(ts.ExitStatus.DiagnosticsPresent_OutputsSkipped);
    }

    return parsedConfiguration;
}

function getCompilerOptions(commandLine: CommandLineArguments, tsConfigFileName: string) {
    let rootFileNames: string[] = [];
    let compilerOptions: UninitializedSpeedyJSCompilerOptions;

    if (tsConfigFileName) {
        const configuration = parseConfigFile(tsConfigFileName);
        rootFileNames = configuration.fileNames;
        compilerOptions = configuration.options;
    } else {
        rootFileNames = commandLine.files;
        compilerOptions = ts.getDefaultCompilerOptions();
    }

    compilerOptions.unsafe = commandLine.unsafe;
    compilerOptions.binaryenOpt = commandLine.binaryenOpt;
    compilerOptions.emitLLVM = commandLine.emitLlvm;
    compilerOptions.globalBase = commandLine.settings.GLOBAL_BASE;
    compilerOptions.totalMemory = commandLine.settings.TOTAL_MEMORY;
    compilerOptions.totalStack = commandLine.settings.TOTAL_STACK;
    compilerOptions.exposeGc = commandLine.exposeGc;
    compilerOptions.exportGc = commandLine.exportGc;
    compilerOptions.disableHeapNukeOnExit = commandLine.disableHeapNukeOnExit;
    compilerOptions.optimizationLevel = !commandLine.optimization ? "0" : undefined;

    return { rootFileNames, compilerOptions: initializeCompilerOptions(compilerOptions) };
}

function run() {
    const commandLine = parseCommandLine();

    const configFileName = commandLine.config || ts.findConfigFile(ts.sys.getCurrentDirectory(), ts.sys.fileExists);

    if (commandLine.args.length === 0 && !configFileName) {
        ts.sys.write("Pass either a config file or the files to use");
        commandLine.outputHelp();
        ts.sys.exit(ts.ExitStatus.DiagnosticsPresent_OutputsSkipped);
    }

    const { compilerOptions, rootFileNames } = getCompilerOptions(commandLine, configFileName);
    const compilerHost = ts.createCompilerHost(compilerOptions);
    const compiler = new Compiler(compilerOptions, compilerHost);

    const { diagnostics, exitStatus } = compiler.compile(rootFileNames);
    if (diagnostics.length > 0) {
        reportDiagnostics(diagnostics);
    }

    return ts.sys.exit(exitStatus);
}

run();
