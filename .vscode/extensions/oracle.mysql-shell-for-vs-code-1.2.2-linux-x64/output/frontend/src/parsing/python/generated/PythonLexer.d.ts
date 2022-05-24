import { ATN } from "antlr4ts/atn/ATN";
import { CharStream } from "antlr4ts/CharStream";
import { RuleContext } from "antlr4ts/RuleContext";
import { Vocabulary } from "antlr4ts/Vocabulary";
import { PythonLexerBase } from "../PythonLexerBase";
export declare class PythonLexer extends PythonLexerBase {
    static readonly INDENT = 1;
    static readonly DEDENT = 2;
    static readonly LINE_BREAK = 3;
    static readonly DEF = 4;
    static readonly RETURN = 5;
    static readonly RAISE = 6;
    static readonly FROM = 7;
    static readonly IMPORT = 8;
    static readonly NONLOCAL = 9;
    static readonly AS = 10;
    static readonly GLOBAL = 11;
    static readonly ASSERT = 12;
    static readonly IF = 13;
    static readonly ELIF = 14;
    static readonly ELSE = 15;
    static readonly WHILE = 16;
    static readonly FOR = 17;
    static readonly IN = 18;
    static readonly TRY = 19;
    static readonly NONE = 20;
    static readonly FINALLY = 21;
    static readonly WITH = 22;
    static readonly EXCEPT = 23;
    static readonly LAMBDA = 24;
    static readonly OR = 25;
    static readonly AND = 26;
    static readonly NOT = 27;
    static readonly IS = 28;
    static readonly CLASS = 29;
    static readonly YIELD = 30;
    static readonly DEL = 31;
    static readonly PASS = 32;
    static readonly CONTINUE = 33;
    static readonly BREAK = 34;
    static readonly ASYNC = 35;
    static readonly AWAIT = 36;
    static readonly PRINT = 37;
    static readonly EXEC = 38;
    static readonly TRUE = 39;
    static readonly FALSE = 40;
    static readonly DOT = 41;
    static readonly ELLIPSIS = 42;
    static readonly REVERSE_QUOTE = 43;
    static readonly STAR = 44;
    static readonly COMMA = 45;
    static readonly COLON = 46;
    static readonly SEMI_COLON = 47;
    static readonly POWER = 48;
    static readonly ASSIGN = 49;
    static readonly OR_OP = 50;
    static readonly XOR = 51;
    static readonly AND_OP = 52;
    static readonly LEFT_SHIFT = 53;
    static readonly RIGHT_SHIFT = 54;
    static readonly ADD = 55;
    static readonly MINUS = 56;
    static readonly DIV = 57;
    static readonly MOD = 58;
    static readonly IDIV = 59;
    static readonly NOT_OP = 60;
    static readonly LESS_THAN = 61;
    static readonly GREATER_THAN = 62;
    static readonly EQUALS = 63;
    static readonly GT_EQ = 64;
    static readonly LT_EQ = 65;
    static readonly NOT_EQ_1 = 66;
    static readonly NOT_EQ_2 = 67;
    static readonly AT = 68;
    static readonly ARROW = 69;
    static readonly ADD_ASSIGN = 70;
    static readonly SUB_ASSIGN = 71;
    static readonly MULT_ASSIGN = 72;
    static readonly AT_ASSIGN = 73;
    static readonly DIV_ASSIGN = 74;
    static readonly MOD_ASSIGN = 75;
    static readonly AND_ASSIGN = 76;
    static readonly OR_ASSIGN = 77;
    static readonly XOR_ASSIGN = 78;
    static readonly LEFT_SHIFT_ASSIGN = 79;
    static readonly RIGHT_SHIFT_ASSIGN = 80;
    static readonly POWER_ASSIGN = 81;
    static readonly IDIV_ASSIGN = 82;
    static readonly STRING = 83;
    static readonly DECIMAL_INTEGER = 84;
    static readonly OCT_INTEGER = 85;
    static readonly HEX_INTEGER = 86;
    static readonly BIN_INTEGER = 87;
    static readonly IMAG_NUMBER = 88;
    static readonly FLOAT_NUMBER = 89;
    static readonly OPEN_PAREN = 90;
    static readonly CLOSE_PAREN = 91;
    static readonly OPEN_BRACE = 92;
    static readonly CLOSE_BRACE = 93;
    static readonly OPEN_BRACKET = 94;
    static readonly CLOSE_BRACKET = 95;
    static readonly NAME = 96;
    static readonly LINE_JOIN = 97;
    static readonly NEWLINE = 98;
    static readonly WS = 99;
    static readonly COMMENT = 100;
    static readonly channelNames: string[];
    static readonly modeNames: string[];
    static readonly ruleNames: string[];
    private static readonly _LITERAL_NAMES;
    private static readonly _SYMBOLIC_NAMES;
    static readonly VOCABULARY: Vocabulary;
    get vocabulary(): Vocabulary;
    constructor(input: CharStream);
    get grammarFileName(): string;
    get ruleNames(): string[];
    get serializedATN(): string;
    get channelNames(): string[];
    get modeNames(): string[];
    action(_localctx: RuleContext, ruleIndex: number, actionIndex: number): void;
    private OPEN_PAREN_action;
    private CLOSE_PAREN_action;
    private OPEN_BRACE_action;
    private CLOSE_BRACE_action;
    private OPEN_BRACKET_action;
    private CLOSE_BRACKET_action;
    private NEWLINE_action;
    private WS_action;
    private static readonly _serializedATNSegments;
    private static readonly _serializedATNSegment0;
    private static readonly _serializedATNSegment1;
    static readonly _serializedATN: string;
    static __ATN: ATN;
    static get _ATN(): ATN;
}