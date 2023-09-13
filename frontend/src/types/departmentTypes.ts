import { Process } from '@/types/processTypes';

export type Department = {
    id: string | null;
    name: string;
    processCount?: number | null;
    processes?: Process[] | null;
};

export type DepartmentFormFieldErrorsType = {
    name?: string;
};