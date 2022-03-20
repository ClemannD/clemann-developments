import {
    ActiveCategoryDto,
    ActivePaymentMethodDto,
    ActiveTagDto
} from '@clemann-developments/dtos/expense-tracker-dtos';
import { createContext } from 'react';

export type ActiveOptionsContextType = {
    activeCategories: ActiveCategoryDto[];
    activeTags: ActiveTagDto[];
    activePaymentMethods: ActivePaymentMethodDto[];
    fetchActiveOptions: () => void;
};

const ActiveOptionsContext = createContext<ActiveOptionsContextType>({
    activeCategories: null,
    activeTags: null,
    activePaymentMethods: null,
    fetchActiveOptions: () => {}
});
export default ActiveOptionsContext;
