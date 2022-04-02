import Layout from '../../components/layout/layout.component';
import ConfigurationCategoriesSection from './categories/configuration-categories.section';
import ConfigurationPaymentMethodsSection from './payment-methods/configuration-payment-methods.section';
import ConfigurationRecurringExpensesSection from './recurring-expenses/recurring-expenses.section';
import ConfigurationTagsSection from './tags/configuration-tags.section';

export default function ConfigurationPage() {
    return (
        <Layout>
            <div className="container">
                <div className="header">
                    <h2>Configuration</h2>
                </div>

                <div className="row">
                    <div className="col-12">
                        <ConfigurationRecurringExpensesSection></ConfigurationRecurringExpensesSection>
                    </div>
                    <div className="col-12">
                        <ConfigurationCategoriesSection></ConfigurationCategoriesSection>
                    </div>
                    <div className="col-12 col-lg-6">
                        <ConfigurationTagsSection></ConfigurationTagsSection>
                    </div>
                    <div className="col-12 col-lg-6">
                        <ConfigurationPaymentMethodsSection></ConfigurationPaymentMethodsSection>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
