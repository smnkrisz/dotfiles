import { CharStream, Lexer } from "antlr4ts";
export declare abstract class PythonLexerBase extends Lexer {
    static tabSize: number;
    private opened;
    private indents;
    private buffer;
    private lastToken?;
    constructor(input: CharStream);
    protected handleNewLine(): void;
    protected handleSpaces(): void;
    protected incIndentLevel(): void;
    protected decIndentLevel(): void;
    private isNotNewLineOrComment;
    private processNewLine;
    private emitToken;
}
