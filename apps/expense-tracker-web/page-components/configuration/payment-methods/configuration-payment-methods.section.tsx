import { useEffect } from 'react';
import useGetPaymentMethods from '../../../api-services/configuration/getPaymentMethods.service';
import CreatePaymentMethodButton from './create-payment-method-button.component';
import PaymentMethodPill from './payment-method-pill.component';
import styles from './payment-methods.module.scss';

export default function ConfigurationPaymentMethodsSection() {
    const getPaymentMethods = useGetPaymentMethods();

    useEffect(() => {
        fetchPaymentMethods();
    }, []);

    const fetchPaymentMethods = () => {
        getPaymentMethods.mutateAsync({});
    };

    return (
        <div className={styles.paymentMethodsSection}>
            <div className={styles.sectionHeader}>
                <h3>Payment Methods</h3>

                <CreatePaymentMethodButton
                    fetchPaymentMethods={fetchPaymentMethods}
                />
            </div>
            <div className={`${styles.paymentMethodsBox} card`}>
                {getPaymentMethods.data?.paymentMethods.map((paymentMethod) => (
                    <PaymentMethodPill
                        key={paymentMethod.paymentMethodId}
                        paymentMethodDto={paymentMethod}
                        fetchPaymentMethods={fetchPaymentMethods}
                    ></PaymentMethodPill>
                ))}
            </div>
        </div>
    );
}
