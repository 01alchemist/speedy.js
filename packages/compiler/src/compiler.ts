import * as ts from "typescript";
import * as llvm from "llvm-node";
import * as debug from "debug";
import {DefaultCodeGenerationContextFactory} from "./code-generation/default-code-generation-context-factory";
import {PerFileCodeGenerator} from "./code-generation/per-file/per-file-code-generator";
import {NotYetImplementedCodeGenerator} from "./code-generation/not-yet-implemented-code-generator";
import {LogUnknownTransformVisitor} from "./transform/log-unknown-transform-visitor";
import {SpeedyJSTransformVisitor} from "./transform/speedyjs-transform-visitor";
import {createTransformVisitorFactory} from "./transform/transform-visitor";
import {BuiltInSymbols} from "./built-in-symbols";
import {CompilationContext} from "./compilation-context";
import {CodeGenerationError} from "./code-generation/code-generation-error";
import {SpeedyJSCompilerOptions} from "./speedyjs-compiler-options";
import {TypeScriptTypeChecker} from "./typescript-type-checker";

const LOG = debug("compiler");

export class Compiler {
    constructor(private compilerOptions: SpeedyJSCompilerOptions, private compilerHost: ts.CompilerHost) {
    }

    compile(rootFileNames: string[]): { exitStatus: ts.ExitStatus, diagnostics: ts.Diagnostic[] } {
        LOG("Start Compiling");
        Compiler.initLLVM();
        const program: ts.Program = ts.createProgram(rootFileNames, this.compilerOptions, this.compilerHost);
        const diagnostics = [...program.getSyntacticDiagnostics(), ...program.getOptionsDiagnostics(), ...program.getGlobalDiagnostics(), ...program.getSemanticDiagnostics() ];

        if (diagnostics.length > 0) {
            return { diagnostics, exitStatus: ts.ExitStatus.DiagnosticsPresent_OutputsSkipped };
        }

        const context = new llvm.LLVMContext();
        const builtIns = BuiltInSymbols.create(program, this.compilerHost, this.compilerOptions);
        const compilationContext: CompilationContext = {
            builtIns,
            compilerHost: this.compilerHost,
            compilerOptions: this.compilerOptions,
            llvmContext: context,
            typeChecker: new TypeScriptTypeChecker(program.getTypeChecker()),
            rootDir: (program as any).getCommonSourceDirectory()
        };

        return Compiler.emit(program, compilationContext);
    }

    private static initLLVM() {
        llvm.initializeAllTargets();
        llvm.initializeAllTargetInfos();
        llvm.initializeAllAsmPrinters();
        llvm.initializeAllTargetMCs();
        llvm.initializeAllAsmParsers();
    }

    private static emit(program: ts.Program, compilationContext: CompilationContext) {
        const codeGenerator = new PerFileCodeGenerator(compilationContext.llvmContext, new DefaultCodeGenerationContextFactory(new NotYetImplementedCodeGenerator()));

        const logUnknownVisitor = new LogUnknownTransformVisitor();
        const speedyJSVisitor = new SpeedyJSTransformVisitor(compilationContext, codeGenerator);

        try {
            const emitResult = program.emit(undefined, undefined, undefined, undefined, { before: [
                createTransformVisitorFactory(logUnknownVisitor),
                createTransformVisitorFactory(speedyJSVisitor)
            ]});

            let exitStatus;
            if (emitResult.emitSkipped) {
                exitStatus = ts.ExitStatus.DiagnosticsPresent_OutputsSkipped;
            } else {
                codeGenerator.completeCompilation();
                exitStatus = ts.ExitStatus.Success;
            }

            LOG("Program compiled");

            return { exitStatus, diagnostics: emitResult.diagnostics };
        } catch (ex) {
            if (ex instanceof CodeGenerationError) {
                return { exitStatus: ts.ExitStatus.DiagnosticsPresent_OutputsSkipped, diagnostics: [ ex.toDiagnostic() ]};
            } else {
                LOG(`Compilation failed`, ex);
                throw ex;
            }
        }
    }
}
