import { PaymentMethodDto } from '@clemann-developments/dtos/expense-tracker-dtos';
import {
    Button,
    ButtonAppearance,
    ButtonSize
} from '@clemann-developments/react/components/interaction/button';
import {
    Pill,
    PillColor
} from '@clemann-developments/react/components/ui-elements';
import { Input, Toggle } from '@clemann-developments/react/forms';
import { XIcon } from '@heroicons/react/outline';
import { Form, Formik } from 'formik';
import { useEffect, useRef, useState } from 'react';
import useUpdatePaymentMethod from '../../../api-services/configuration/updatePaymentMethod.service';
import styles from './payment-methods.module.scss';

export default function PaymentMethodPill({
    paymentMethodDto,
    fetchPaymentMethods
}: {
    paymentMethodDto: PaymentMethodDto;
    fetchPaymentMethods: () => void;
}) {
    const [isEditingPaymentMethod, setIsEditingPaymentMethod] = useState(false);
    const [isActive, setIsActive] = useState(paymentMethodDto.active);
    const dropdown = useRef(null);
    const pill = useRef(null);
    const updatePaymentMethod = useUpdatePaymentMethod();

    useEffect(() => {
        if (isEditingPaymentMethod) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isEditingPaymentMethod]);

    const handleClickOutside = (e: { target: any }) => {
        if (
            dropdown?.current?.contains(e.target) ||
            pill?.current?.contains(e.target)
        ) {
            return;
        }
        setIsEditingPaymentMethod(false);
    };

    return (
        <div
            key={paymentMethodDto.paymentMethodId}
            className={styles.paymentMethodPill}
            style={{
                marginRight: '1rem'
            }}
            ref={pill}
        >
            <Pill
                clickHandler={() => setIsEditingPaymentMethod(true)}
                color={PillColor.Black}
                lightFont
                style={{
                    opacity: paymentMethodDto.active ? 1 : 0.5,
                    marginBottom: '1rem'
                }}
            >
                {paymentMethodDto.name}
            </Pill>

            {isEditingPaymentMethod && (
                <div className={styles.paymentMethodControls} ref={dropdown}>
                    <Formik
                        initialValues={{
                            name: paymentMethodDto.name
                        }}
                        onSubmit={async (values) => {
                            await updatePaymentMethod.mutateAsync({
                                paymentMethodId:
                                    paymentMethodDto.paymentMethodId,
                                name: values.name,
                                active: isActive
                            });
                            fetchPaymentMethods();
                        }}
                    >
                        <Form>
                            <Input
                                name="name"
                                hideErrorMessage
                                style={{
                                    marginBottom: '1rem'
                                }}
                            />
                            <Toggle
                                style={{
                                    marginBottom: '1rem'
                                }}
                                checked={isActive}
                                onChange={(checked) => {
                                    setIsActive(checked);
                                }}
                                label="Active"
                            ></Toggle>

                            <div
                                style={{
                                    display: 'flex'
                                }}
                            >
                                <Button
                                    style={{
                                        marginRight: '1rem'
                                    }}
                                    size={ButtonSize.Block}
                                    type="submit"
                                    appearance={ButtonAppearance.Secondary}
                                >
                                    Save
                                </Button>
                                <Button
                                    style={{
                                        marginRight: '1rem'
                                    }}
                                    appearance={ButtonAppearance.Icon}
                                    clickHandler={() =>
                                        setIsEditingPaymentMethod(false)
                                    }
                                >
                                    <XIcon height={'2rem'} />
                                </Button>
                            </div>
                        </Form>
                    </Formik>
                </div>
            )}
        </div>
    );
}
