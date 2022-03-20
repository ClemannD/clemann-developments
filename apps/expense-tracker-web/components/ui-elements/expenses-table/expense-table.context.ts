import { createContext } from 'react';

export type ExpenseTableContextType = {
    focusedColumnIndex: number;
    setFocusedColumnIndex: (index: number) => void;
    focusedRowIndex: number;
    setFocusedRowIndex: (index: number) => void;
    focusCell: (rowIndex: number, columnIndex: number) => void;
};

export const ExpenseTableContext = createContext<ExpenseTableContextType>(null);
