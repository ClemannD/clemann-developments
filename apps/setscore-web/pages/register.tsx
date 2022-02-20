import { useAuth0 } from '@auth0/auth0-react';
import {
    Input,
    PhoneNumberInput
} from '@clemann-developments/react/components/forms';
import {
    Button,
    ButtonAppearance,
    ButtonSize
} from '@clemann-developments/react/components/interaction/button';
import { useAuthGuard } from '@clemann-developments/react/hooks/next/use-auth-guard';
import { Form, Formik } from 'formik';
import { useRouter } from 'next/router';
import React from 'react';
import * as Yup from 'yup';
import useRegisterUser from '../api-services/auth/registerUser.service';
import AuthLayout from '../components/layouts/auth-layout/auth-layout.component';
import LoadingScreen from '../components/navigation/loading-screen/loading-screen';
import useCurrentUser from '../hooks/useCurrentUser';
import styles from '../styles/pages/register.module.scss';

export default function RegisterPage() {
    const authGuard = useAuthGuard();
    const { currentUser, getCurrentUser } = useCurrentUser();
    const router = useRouter();
    const { logout } = useAuth0();

    const registerUser = useRegisterUser();

    if (!currentUser) {
        return <LoadingScreen></LoadingScreen>;
    }
    return (
        <AuthLayout isLoading={false}>
            <div className={styles.formWrapper}>
                <h2
                    style={{
                        marginBottom: '2rem',
                        textAlign: 'center'
                    }}
                >
                    Registration
                </h2>
                <Formik
                    initialValues={{
                        firstName: currentUser?.firstName || '',
                        lastName: currentUser?.lastName || '',
                        email: currentUser?.email || '',
                        phone: currentUser?.phone || ''
                    }}
                    validationSchema={Yup.object({
                        firstName: Yup.string()
                            .max(50, 'Must be 50 characters or less')
                            .required('Required'),
                        lastName: Yup.string()
                            .max(50, 'Must be 50 characters or less')
                            .required('Required'),
                        email: Yup.string().email().required('Required'),
                        phone: Yup.string()
                            .max(12, 'Invalid phone number')
                            .required('Required')
                    })}
                    onSubmit={async (values) => {
                        try {
                            await registerUser.mutateAsync(values);
                            await getCurrentUser.mutateAsync({});
                            router.push('/');
                        } catch {}
                    }}
                    render={(props) => {
                        return (
                            <Form>
                                <Input name="firstName" label="First Name" />
                                <Input name="lastName" label="Last Name" />
                                <Input
                                    name="email"
                                    label="Email"
                                    disabled={true}
                                />
                                <PhoneNumberInput
                                    name="phone"
                                    label="Phone Number"
                                    formikProps={props}
                                ></PhoneNumberInput>
                                <Button size={ButtonSize.Block} type="submit">
                                    Register
                                </Button>
                            </Form>
                        );
                    }}
                ></Formik>
                <Button
                    style={{ marginTop: '2rem' }}
                    appearance={ButtonAppearance.Transparent}
                    size={ButtonSize.Block}
                    clickHandler={() => {
                        logout();
                    }}
                >
                    Logout
                </Button>
            </div>
        </AuthLayout>
    );
}
