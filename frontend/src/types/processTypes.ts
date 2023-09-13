export type Process = {
    id?: number;
    departmentId: number;
    type: string;
    updateAt?: Date;
    createdAt?: Date;
    name: string;
    parentId: number;
}