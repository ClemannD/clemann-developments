import {
    Button,
    ButtonAppearance,
    ButtonSize
} from '@clemann-developments/react/components/interaction/button';
import { DropdownButton } from '@clemann-developments/react/components/interaction/dropdown-button';
import { Input } from '@clemann-developments/react/forms';
import { PlusIcon } from '@heroicons/react/outline';
import { Form, Formik } from 'formik';
import { useState } from 'react';
import * as Yup from 'yup';
import useCreatePaymentMethod from '../../../api-services/configuration/createPaymentMethod.service';
import styles from './payment-methods.module.scss';

export default function CreatePaymentMethodButton({
    fetchPaymentMethods
}: {
    fetchPaymentMethods: () => void;
}) {
    const createPaymentMethod = useCreatePaymentMethod();
    const [isOpen, setIsOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    return (
        <DropdownButton
            dropdownButtonText={'Add Payment Method'}
            buttonSize={ButtonSize.Auto}
            buttonAppearance={ButtonAppearance.Primary}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            clickOutsideToClose={!isOpen}
            IconClass={PlusIcon}
        >
            <div className={styles.addPaymentMethodDropdown}>
                <Formik
                    initialValues={{
                        paymentMethodName: ''
                    }}
                    validationSchema={Yup.object({
                        paymentMethodName: Yup.string()
                            .max(50, 'Must be 50 characters or less')
                            .required('Required')
                    })}
                    onSubmit={async (values) => {
                        try {
                            setIsSubmitting(true);
                            await createPaymentMethod.mutateAsync({
                                name: values.paymentMethodName
                            });
                            setIsOpen(false);
                            fetchPaymentMethods();
                        } catch (e) {
                            console.error(e);
                        }
                        setIsSubmitting(false);
                    }}
                >
                    <Form>
                        <div className={styles.paymentMethodForm}>
                            <Input
                                label="Payment Method"
                                name="paymentMethodName"
                                style={{ marginRight: '1.5rem' }}
                            ></Input>
                            <Button
                                type="submit"
                                size={ButtonSize.Auto}
                                isSubmitting={isSubmitting}
                            >
                                Add
                            </Button>
                        </div>
                    </Form>
                </Formik>
            </div>
        </DropdownButton>
    );
}
