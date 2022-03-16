import {
    Button,
    ButtonSize
} from '@clemann-developments/react/components/interaction/button';
import { Input, PhoneNumberInput } from '@clemann-developments/react/forms';
import { useAuthGuard } from '@clemann-developments/react/hooks/next/use-auth-guard';
import { Form, Formik } from 'formik';
import { useRouter } from 'next/router';
import { useContext, useEffect } from 'react';
import * as Yup from 'yup';
import useRegisterUser from '../../api-services/auth/regitserUser.service';
import Layout from '../../components/layout/layout.component';
import LoadingScreen from '../../components/navigation/loading-screen/loading-screen';
import UserContext from '../../context/user.context';
import useRegisteredGuard from '../../hooks/useRegisteredGuard';
import styles from './register.module.scss';

export default function RegisterPage() {
    useAuthGuard();
    useRegisteredGuard(true);
    const { user, getCurrentUser } = useContext(UserContext);
    const router = useRouter();
    const registerUser = useRegisterUser();

    if (!user) {
        return <LoadingScreen></LoadingScreen>;
    }

    return (
        <Layout>
            <div className="container">
                <div className="header">
                    <h2>Register</h2>
                </div>

                <div className={styles.form}>
                    <Formik
                        initialValues={{
                            firstName: user?.firstName || '',
                            lastName: user?.lastName || '',
                            email: user?.email || '',
                            phone: user?.phone || '',
                            accountName: user.firstName
                                ? `${user.firstName}'s Finances`
                                : ''
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
                                .required('Required'),
                            accountName: Yup.string().required('Required')
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
                                    <Input
                                        name="firstName"
                                        label="First Name"
                                    />
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
                                    <Input
                                        name="accountName"
                                        label="Account Name"
                                        subLabel="The name to give your Spendly account"
                                    />
                                    <Button
                                        size={ButtonSize.Block}
                                        type="submit"
                                    >
                                        Register
                                    </Button>
                                </Form>
                            );
                        }}
                    ></Formik>
                </div>
            </div>
        </Layout>
    );
}
