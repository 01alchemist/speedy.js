import * as llvm from "llvm-node";
import {CodeGenerationContext} from "./code-generation-context";
import {CompilationContext} from "../compilation-context";

/**
 * Factory that creates the code generation context
 */
export interface CodeGenerationContextFactory {

    /**
     * Creates a new code generation context
     * @param compilationContext the compilation context
     * @param module the llvm module
     * @return the code generation context
     */
    createContext(compilationContext: CompilationContext, module: llvm.Module): CodeGenerationContext;
}
