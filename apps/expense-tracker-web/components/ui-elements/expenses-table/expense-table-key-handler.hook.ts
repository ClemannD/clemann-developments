import { useEffect, useState } from 'react';

export function useExpenseTableKeyHandler(rowLength = 0) {
    const [focusedColumnIndex, setFocusedColumnIndex] = useState<number>(0);
    const [focusedRowIndex, setFocusedRowIndex] = useState<number>(
        rowLength - 1
    );

    const focusCell = (rowIndex: number, columnIndex: number) => {
        setFocusedRowIndex(rowIndex);
        setFocusedColumnIndex(columnIndex);
        document
            .getElementById(`expense-table-cell-${rowIndex}-${columnIndex}`)
            ?.focus();
    };

    const handleSetFocusedColumnIndex = (index: number) => {
        if (index !== undefined) {
            setFocusedColumnIndex(index);
        }
    };

    const handleSetFocusedRowIndex = (index: number) => {
        if (index !== undefined) {
            setFocusedRowIndex(index);
        }
    };

    // Focus on new row when new row is added or table loaded.
    useEffect(() => {
        setFocusedColumnIndex(0);
        setFocusedRowIndex(rowLength);
        document.getElementById(`expense-table-cell-${rowLength}-0`)?.focus();
    }, [rowLength]);

    const handleKeyDownTable = (
        event: React.KeyboardEvent<HTMLTableElement>
    ) => {
        if (event.key === 'ArrowUp') {
            let prevRowIndex = focusedRowIndex - 1;

            if (prevRowIndex < 0) {
                prevRowIndex = rowLength;
            }

            let prevElement = document.getElementById(
                `expense-table-cell-${prevRowIndex}-${focusedColumnIndex}`
            );
            while (!prevElement) {
                if (prevRowIndex === 0) {
                    prevRowIndex = rowLength;
                } else {
                    prevRowIndex--;
                }
                prevElement = document.getElementById(
                    `expense-table-cell-${prevRowIndex}-${focusedColumnIndex}`
                );
            }
            prevElement.focus();
        }

        if (event.key === 'ArrowDown') {
            let nextRowIndex = focusedRowIndex + 1;

            if (nextRowIndex > rowLength) {
                nextRowIndex = 0;
            }

            let nextElement = document.getElementById(
                `expense-table-cell-${nextRowIndex}-${focusedColumnIndex}`
            );

            while (!nextElement) {
                if (nextRowIndex === rowLength) {
                    nextRowIndex = 0;
                } else {
                    nextRowIndex++;
                }

                nextElement = document.getElementById(
                    `expense-table-cell-${nextRowIndex}-${focusedColumnIndex}`
                );
            }
            nextElement.focus();
        }

        if (event.key === 'ArrowLeft') {
            let prevElementColumnIndex = focusedColumnIndex - 1;

            if (prevElementColumnIndex < 0) {
                prevElementColumnIndex = 11;
            }

            let prevElement = document.getElementById(
                `expense-table-cell-${focusedRowIndex}-${prevElementColumnIndex}`
            );

            while (!prevElement) {
                if (prevElementColumnIndex === 0) {
                    prevElementColumnIndex = 11;
                } else {
                    prevElementColumnIndex--;
                }
                prevElement = document.getElementById(
                    `expense-table-cell-${focusedRowIndex}-${prevElementColumnIndex}`
                );
            }

            prevElement.focus();
        }

        if (event.key === 'ArrowRight') {
            if (focusedColumnIndex === 11) {
                document
                    .getElementById(`expense-table-cell-${focusedRowIndex}-0`)
                    ?.focus();
            } else {
                let nextElementColumnIndex = focusedColumnIndex + 1;
                console.log('nextElementColumnIndex', nextElementColumnIndex);
                let nextElement = document.getElementById(
                    `expense-table-cell-${focusedRowIndex}-${nextElementColumnIndex}`
                );

                while (!nextElement) {
                    console.log('nextElement', nextElement);
                    if (nextElementColumnIndex === 11) {
                        nextElementColumnIndex = 0;
                    } else {
                        nextElementColumnIndex++;
                    }
                    nextElement = document.getElementById(
                        `expense-table-cell-${focusedRowIndex}-${nextElementColumnIndex}`
                    );
                    console.log('nextElement2', nextElement);
                }

                nextElement.focus();
            }
        }

        if (event.key === 'Enter') {
            focusCell(focusedRowIndex + 1, 0);
        }
    };

    return {
        focusedColumnIndex,
        focusedRowIndex,
        setFocusedColumnIndex: handleSetFocusedColumnIndex,
        setFocusedRowIndex: handleSetFocusedRowIndex,
        focusCell,
        handleKeyDownTable
    };
}
