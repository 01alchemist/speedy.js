import * as ts from "typescript";
import * as util from "util";
import * as assert from "assert";

/**
 * Error thrown if the code generation fails. Stores the node to show the node that  caused the error
 * in the users code.
 */
export class CodeGenerationError extends Error {
    constructor(public node: ts.Node, public code: number, message: string) {
        super(message);
        assert(node, "Node is not defined");
        assert(code, "code is not defined");
        assert(message, "message is not defined");

        // https://github.com/Microsoft/TypeScript-wiki/blob/master/Breaking-Changes.md#extending-built-ins-like-error-array-and-map-may-no-longer-work
        Object.setPrototypeOf(this, CodeGenerationError.prototype);
    }

    toDiagnostic(): ts.Diagnostic {
        return {
            code: this.code,
            messageText: this.message,
            start: this.node.getFullStart(),
            length: this.node.getFullWidth(),
            category: ts.DiagnosticCategory.Error,
            file: this.node.getSourceFile()
        }
    }

    static builtInMethodNotSupported(propertyAccessExpression: ts.PropertyAccessExpression, objectName: string, methodName: string) {
        return CodeGenerationError.createException(propertyAccessExpression, diagnostics.BuiltInMethodNotSupported, methodName, objectName)
    }

    static builtInPropertyNotSupported(property: ts.PropertyAccessExpression, objectName: string) {
        return CodeGenerationError.createException(property, diagnostics.BuiltInPropertyNotSupported, property.name.text, objectName);
    }

    static builtInDoesNotSupportElementAccess(element: ts.ElementAccessExpression, objectName: string) {
        return CodeGenerationError.createException(element, diagnostics.BuiltInObjectDoesNotSupportElementAccess, objectName);
    }

    private static createException(node: ts.Node, diagnostic: { message: string, code: number }, ...args: (string | number)[]) {
        const message = util.format(diagnostic.message, ...args);
        return new CodeGenerationError(node, diagnostic.code, message);
    }

    static unsupportedLiteralType(node: ts.LiteralLikeNode, typeName: string) {
        return CodeGenerationError.createException(node, diagnostics.UnsupportedLiteralType, typeName);
    }

    static unsupportedType(node: ts.Declaration, typeName: string) {
        return CodeGenerationError.createException(node, diagnostics.UnsupportedType, typeName);
    }

    static unsupportedIdentifier(identifier: ts.Identifier) {
        return CodeGenerationError.createException(identifier, diagnostics.UnsupportedIdentifier, identifier.text);
    }

    static unsupportedBinaryOperation(binaryExpression: ts.BinaryExpression, leftType: string, rightType: string) {
        return CodeGenerationError.createException(binaryExpression, diagnostics.UnsupportedBinaryOperation, ts.SyntaxKind[binaryExpression.operatorToken.kind], leftType, rightType);
    }

    static unsupportedUnaryOperation(node: ts.PrefixUnaryExpression, type: string) {
        return CodeGenerationError.createException(node, diagnostics.UnsupportedUnaryOperation, ts.SyntaxKind[node.operand.kind], type);
    }

    static anonymousEntryFunctionsNotSupported(fun: ts.FunctionDeclaration) {
        return CodeGenerationError.createException(fun, diagnostics.AnonymousEntryFunctionsUnsupported);
    }

    static optionalParametersInEntryFunctionNotSupported(optionalParameter: ts.ParameterDeclaration) {
        return CodeGenerationError.createException(optionalParameter, diagnostics.OptionalParametersNotSupportedForEntryFunction);
    }

    static genericEntryFunctionNotSupported(fun: ts.FunctionDeclaration) {
        return CodeGenerationError.createException(fun, diagnostics.GenericEntryFunctionNotSuppoorted);
    }

    static unsupportedClassReferencedBy(identifier: ts.Identifier) {
        return CodeGenerationError.createException(identifier, diagnostics.UnsupportedBuiltInClass);
    }

    static referenceToNonSpeedyJSEntryFunctionFromJS(identifier: ts.Identifier, speedyJSFunctionSymbol: ts.Symbol) {
        return CodeGenerationError.createException(identifier, diagnostics.ReferenceToNonEntrySpeedyJSFunctionFromJS, speedyJSFunctionSymbol.name);
    }

    static overloadedEntryFunctionNotSupported(fun: ts.FunctionDeclaration) {
        return CodeGenerationError.createException(fun, diagnostics.OverloadedEntryFunctionNotSupported);
    }

    static unsupportedSyntaxKind(node: ts.Node) {
        return CodeGenerationError.createException(node, diagnostics.UnsupportedSyntaxKind, ts.SyntaxKind[node.kind]);
    }
}

const diagnostics = {
    "BuiltInMethodNotSupported": {
        message: "The method '%s' of the built in object '%s' is not supported",
        code: 100000
    },
    "BuiltInPropertyNotSupported": {
        message: "The property '%s' of the built in object '%s' is not supported",
        code: 100001
    },
    "BuiltInObjectDoesNotSupportElementAccess": {
        message: "The built in object '%s' does not support element access (%s[index] or $s[index]=value)",
        code: 100002
    },
    UnsupportedBuiltInClass: {
        message: "The class referenced by this identifier is not supported",
        code: 100003,
    },
    "UnsupportedLiteralType": {
        message: "The literal type '%s' is not supported",
        code: 100004
    },
    "UnsupportedType": {
        message: "The type '%s' is not supported",
        code: 100005
    },
    "UnsupportedIdentifier": {
        message: "Unsupported type or kind of identifier '%s'",
        code: 100006
    },
    "UnsupportedBinaryOperation": {
        message: "The binary operator %s is not supported for the left and right hand side types '%s' '%s'",
        code: 100007
    },
    UnsupportedUnaryOperation: {
        message: "The unary operator %s is not supported for the type '%s'",
        code: 100008
    },
    AnonymousEntryFunctionsUnsupported: {
        message: "SpeedyJS entry functions need to have a name",
        code: 100009
    },
    ReferenceToNonEntrySpeedyJSFunctionFromJS: {
        message: "SpeedyJS functions referenced from 'normal' JavaScript code needs to be async (the async modifier is missing on the declaration of '%s').",
        code: 100010
    },
    OptionalParametersNotSupportedForEntryFunction: {
        message: "Optional parameters or variadic parameters are not supported for SpeedyJS entry functions",
        code: 100011
    },
    GenericEntryFunctionNotSuppoorted: {
        message: "Generic SpeedyJS entry functions are not supported",
        code: 100012
    },
    OverloadedEntryFunctionNotSupported: {
        message: "SpeedyJS entry function cannot be overloaded",
        code: 100013
    },
    UnsupportedSyntaxKind: {
        message: "The syntax kind '%s' is not yet supported.",
        code: 100014
    }
};
