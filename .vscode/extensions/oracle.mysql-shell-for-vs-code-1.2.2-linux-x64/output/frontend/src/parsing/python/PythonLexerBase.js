"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PythonLexerBase = void 0;
const antlr4ts_1 = require("antlr4ts");
const PythonLexer_1 = require("./generated/PythonLexer");
class PythonLexerBase extends antlr4ts_1.Lexer {
    constructor(input) {
        super(input);
        this.opened = 0;
        this.indents = [];
        this.buffer = [];
    }
    handleNewLine() {
    }
    handleSpaces() {
    }
    incIndentLevel() {
        this.opened++;
    }
    decIndentLevel() {
        if (this.opened > 0) {
            --this.opened;
        }
    }
    isNotNewLineOrComment(next) {
        return this.opened === 0 && next !== "\r" && next !== "\n" && next !== "\f" && next !== "#";
    }
    processNewLine(indent) {
        this.emitToken(PythonLexer_1.PythonLexer.LINE_BREAK);
        const previous = this.indents.length === 0 ? 0 : this.indents[0];
        if (indent > previous) {
            this.indents.push(indent);
            this.emitToken(PythonLexer_1.PythonLexer.INDENT);
        }
        else {
            while (this.indents.length !== 0 && this.indents[0] > indent) {
                this.emitToken(PythonLexer_1.PythonLexer.DEDENT);
                this.indents.pop();
            }
        }
    }
    emitToken(tokenType, channel = PythonLexerBase.DEFAULT_TOKEN_CHANNEL, text = "") {
        const charIndex = this.charIndex;
        const token = new antlr4ts_1.CommonToken(tokenType, text, this._tokenFactorySourcePair, channel, charIndex - text.length, charIndex);
        token.line = this.line;
        if (tokenType !== PythonLexer_1.PythonLexer.NEWLINE) {
            token.charPositionInLine = this.charPositionInLine - text.length;
        }
        this.emit(token);
    }
}
exports.PythonLexerBase = PythonLexerBase;
PythonLexerBase.tabSize = 8;
//# sourceMappingURL=PythonLexerBase.js.map