import { IShellInterface } from ".";
import { IShellDbConnection } from "../../communication";
export declare type RoutineType = "function" | "procedure";
export declare class ShellInterfaceDb implements IShellInterface {
    protected moduleSessionLookupId: string;
    get id(): string;
    startSession(id: string, connection: number | IShellDbConnection): Promise<void>;
    closeSession(): Promise<void>;
    getCatalogObjects(type: string, filter?: string): Promise<string[]>;
    getSchemaObjects(schema: string, type: string, routineType?: RoutineType, filter?: string): Promise<string[]>;
    getTableObjects(schema: string, table: string, type: string, filter?: string): Promise<string[]>;
    protected get moduleSessionId(): string | undefined;
}
