import { Button } from '@clemann-developments/react/components/interaction/button';
import { useContext, useEffect, useState } from 'react';
import styles from './paste-expenses.module.scss';
import { parse } from 'csv-parse/sync';
import {
    ActiveCategoryDto,
    CategoryDto,
    ExpenseDto
} from '@clemann-developments/dtos/expense-tracker-dtos';
import useCreateOrUpdateExpense from '../../../api-services/month/createOrUpdateExpense.service';
import { MonthPageContext } from '../month-page.context';
import ActiveOptionsContext from '../../../context/active-options.context';

export default function PasteExpensesSection() {
    const [showPasteExpenses, setShowPasteExpenses] = useState(false);

    const [pasteValue, setPasteValue] = useState('');

    const [parsedExpenses, setParsedExpenses] = useState([]);
    const [expenseDtos, setExpenseDtos] = useState<ExpenseDto[]>([]);

    const createOrUpdateExpenseService = useCreateOrUpdateExpense();
    const { activeCategories } = useContext(ActiveOptionsContext);

    const { monthDto } = useContext(MonthPageContext);

    useEffect(() => {
        try {
            const parsed = parse(pasteValue, {
                columns: false,
                skip_empty_lines: true
            });
            setParsedExpenses(parsed);
        } catch {}
    }, [pasteValue]);

    useEffect(() => {
        if (parsedExpenses) {
            const expenseDtos: ExpenseDto[] = parsedExpenses.map((expense) => {
                console.log('expense', expense);
                const expenseDto: ExpenseDto = {
                    amountCents: Math.round(parseFloat(expense[1]) * 100),
                    name: expense[2],
                    day: new Date(expense[0]).getDate(),
                    split: (expense[2] as string)
                        .toLocaleLowerCase()
                        .includes('split')
                        ? 2
                        : null,
                    category: getCategory(expense[3], activeCategories)
                };

                return expenseDto;
            });
            console.log('expenseDtos', expenseDtos);
            setExpenseDtos(expenseDtos);
        }
    }, [parsedExpenses]);

    const createExpenses = () => {
        expenseDtos.forEach(async (expenseDto) => {
            await createOrUpdateExpenseService.mutateAsync({
                expense: expenseDto,
                monthId: monthDto.monthId
            });
        });
    };

    return (
        <div className={styles.pasteExpensesSection}>
            <Button
                clickHandler={() => setShowPasteExpenses(!showPasteExpenses)}
            >
                Paste CSV Expenses
            </Button>

            {showPasteExpenses && (
                <div className={styles.pasteExpenses}>
                    <textarea
                        className={styles.pasteExpensesTextArea}
                        value={pasteValue}
                        onChange={(e) => setPasteValue(e.target.value)}
                    />
                </div>
            )}

            <Button clickHandler={() => createExpenses()}>
                Create Expenses
            </Button>
        </div>
    );
}

const getCategory = (
    oldCategory: string,
    activeCategories: ActiveCategoryDto[]
): ActiveCategoryDto => {
    if (
        oldCategory.toLocaleLowerCase().includes('groceries') ||
        oldCategory.toLocaleLowerCase().includes('eating out')
    ) {
        return activeCategories.find((category) => category.name === 'Food');
    }
    if (
        oldCategory.toLocaleLowerCase().includes('gas') ||
        oldCategory.toLocaleLowerCase().includes('tolls') ||
        oldCategory.toLocaleLowerCase().includes('insurance') ||
        oldCategory.toLocaleLowerCase().includes('car maintenance')
    ) {
        return activeCategories.find(
            (category) => category.name === 'Transportation'
        );
    }
    if (oldCategory.toLocaleLowerCase().includes('social')) {
        return activeCategories.find((category) => category.name === 'Social');
    }
    if (oldCategory.toLocaleLowerCase().includes('personal')) {
        return activeCategories.find(
            (category) => category.name === 'Personal'
        );
    }
    if (oldCategory.toLocaleLowerCase().includes('business')) {
        return activeCategories.find(
            (category) => category.name === 'Business'
        );
    }
    if (oldCategory.toLocaleLowerCase().includes('gifts')) {
        return activeCategories.find((category) => category.name === 'Gifts');
    }
    if (oldCategory.toLocaleLowerCase().includes('travel')) {
        return activeCategories.find((category) => category.name === 'Travel');
    }
    if (oldCategory.toLocaleLowerCase().includes('phone')) {
        return activeCategories.find(
            (category) => category.name === 'Subscriptions'
        );
    }
    if (oldCategory.toLocaleLowerCase().includes('health/gym')) {
        return activeCategories.find((category) => category.name === 'Health');
    }
    if (
        oldCategory.toLocaleLowerCase().includes('home') ||
        oldCategory.toLocaleLowerCase().includes('utilities')
    ) {
        return activeCategories.find((category) => category.name === 'Housing');
    }

    return null;
};
