import * as codicon from "../components/ui/Codicon";
export interface IDictionary {
    [key: string]: unknown;
}
export declare enum DBDataType {
    Unknown = 0,
    TinyInt = 1,
    SmallInt = 2,
    MediumInt = 3,
    Int = 4,
    Bigint = 5,
    UInteger = 6,
    Float = 7,
    Real = 8,
    Double = 9,
    Decimal = 10,
    Binary = 11,
    Varbinary = 12,
    Char = 13,
    Nchar = 14,
    Varchar = 15,
    Nvarchar = 16,
    String = 17,
    TinyText = 18,
    Text = 19,
    MediumText = 20,
    LongText = 21,
    TinyBlob = 22,
    Blob = 23,
    MediumBlob = 24,
    LongBlob = 25,
    DateTime = 26,
    DateTime_f = 27,
    Date = 28,
    Time = 29,
    Time_f = 30,
    Year = 31,
    Timestamp = 32,
    Timestamp_f = 33,
    Geometry = 34,
    Point = 35,
    LineString = 36,
    Polygon = 37,
    GeometryCollection = 38,
    MultiPoint = 39,
    MultiLineString = 40,
    MultiPolygon = 41,
    Numeric = 42,
    Json = 43,
    Bit = 44,
    Boolean = 45,
    Enum = 46,
    Set = 47
}
export declare enum ParameterFormatType {
    None = 0,
    One = 1,
    OneOrZero = 2,
    Two = 3,
    TwoOrOne = 4,
    TwoOrZero = 5,
    TwoOrOneOrZero = 6,
    List = 10
}
export interface IDBCharacterSet {
    collations: string[];
    defaultCollation: string;
    description: string;
}
export interface IDBDataTypeDetails {
    type: DBDataType;
    characterMaximumLength?: number;
    characterOctetLength?: number;
    dateTimePrecision?: number;
    flags?: string[];
    numericPrecision?: number;
    numericPrecisionRadix?: number;
    numericScale?: number;
    needsQuotes?: boolean;
    parameterFormatType?: ParameterFormatType;
    synonyms?: string[];
}
export interface IColumnInfo {
    name: string;
    dataType: IDBDataTypeDetails;
}
export declare enum MessageType {
    Error = 0,
    Warning = 1,
    Info = 2,
    Interactive = 3,
    Response = 4
}
export interface IExecutionInfo {
    type?: MessageType;
    text: string;
}
export declare enum DialogType {
    Prompt = "prompt",
    MrsService = "mrsService",
    MrsSchema = "mrsSchema"
}
export interface IDialogRequest extends IDictionary {
    type: DialogType;
    id?: string;
    title?: string;
    parameters?: IDictionary;
    values?: IDictionary;
    data?: IDictionary;
}
export interface IDialogResponse extends IDictionary {
    type: DialogType;
    accepted: boolean;
    values?: IDictionary;
    data?: IDictionary;
}
export interface IStatusbarInfo {
    id: string;
    text?: string;
    icon?: string | codicon.Codicon;
    choices?: Array<{
        label: string;
        data: IDictionary;
    }>;
    visible?: boolean;
    standout?: boolean;
}
export interface IServicePasswordRequest {
    requestId: string;
    caption?: string;
    description?: string;
    service?: string;
    user?: string;
    payload?: unknown;
}
