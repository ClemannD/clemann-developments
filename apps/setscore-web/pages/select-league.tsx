import { useAuth0 } from '@auth0/auth0-react';
import {
    Button,
    ButtonAppearance,
    ButtonSize
} from '@clemann-developments/react/components/interaction/button';
import { useAuthGuard } from '@clemann-developments/react/hooks/next/use-auth-guard';
import { Form, Formik } from 'formik';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import * as Yup from 'yup';
import useAcceptInviteCode from '../api-services/auth/acceptInviteCode.service';
import useSetCurrentLeague from '../api-services/auth/setCurrentLeague.service.';
import Input from '../components/forms/input/input.component';
import AuthLayout from '../components/layouts/auth-layout/auth-layout.component';
import useCurrentUser from '../hooks/useCurrentUser';
import styles from '../styles/pages/select-league.module.scss';

export default function SelectLeaguePage() {
    const { currentUser, getCurrentUser } = useCurrentUser();
    const { isAuthenticated } = useAuthGuard();
    const router = useRouter();
    const { logout } = useAuth0();
    const [showJoinLeague, seShowJoinLeague] = useState(false);
    const [showJoinError, setShowJoinError] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const setCurrentLeague = useSetCurrentLeague();
    const acceptInviteCode = useAcceptInviteCode();

    return (
        <AuthLayout isLoading={!(isAuthenticated && currentUser)}>
            <div className={styles.formWrapper}>
                <h2
                    style={{
                        marginBottom: '2rem',
                        textAlign: 'center'
                    }}
                >
                    {!currentUser?.userToLeague ||
                    currentUser.userToLeague?.length === 0 ||
                    showJoinLeague
                        ? 'Join a League'
                        : 'Select a League'}
                </h2>
                {!currentUser?.userToLeague ||
                currentUser?.userToLeague?.length === 0 ||
                showJoinLeague ? (
                    <Formik
                        initialValues={{
                            inviteCode: ''
                        }}
                        validationSchema={Yup.object({
                            inviteCode: Yup.string()
                                .max(6, 'Must be 6 characters')
                                .min(6, 'Must be 6 characters')
                                .required('Required')
                        })}
                        onSubmit={async (values) => {
                            setIsSubmitting(true);
                            try {
                                setShowJoinError(false);

                                await acceptInviteCode.mutateAsync(values);
                                await getCurrentUser.mutateAsync({});

                                router.push('/');
                            } catch {
                                setShowJoinError(true);
                            }
                            setIsSubmitting(false);
                        }}
                    >
                        <Form>
                            <Input
                                name="inviteCode"
                                label="Invite Code"
                                placeholder="A1B2C3"
                                subLabel="Your league manager should have provided you with an invite code to register for your league. If you do not have a code, please reach out to them."
                                errorMessage={
                                    showJoinError
                                        ? ' Invalid League Code, please try again.'
                                        : null
                                }
                            ></Input>

                            <Button
                                type="submit"
                                size={ButtonSize.Block}
                                isSubmitting={isSubmitting}
                                style={{
                                    marginBottom: '1.5rem'
                                }}
                            >
                                Join
                            </Button>

                            {currentUser?.userToLeague?.length > 0 && (
                                <Button
                                    appearance={ButtonAppearance.Secondary}
                                    size={ButtonSize.Block}
                                    clickHandler={() => seShowJoinLeague(false)}
                                >
                                    Go Back
                                </Button>
                            )}
                        </Form>
                    </Formik>
                ) : (
                    <>
                        {currentUser?.userToLeague?.map((userToLeague) => (
                            <Button
                                className={styles.leagueButton}
                                key={userToLeague.leagueId}
                                appearance={ButtonAppearance.Secondary}
                                size={ButtonSize.Block}
                                clickHandler={async () => {
                                    await setCurrentLeague.mutateAsync({
                                        leagueId: userToLeague.leagueId
                                    });
                                    getCurrentUser.mutate({});

                                    router.push('/');
                                }}
                            >
                                {userToLeague.league.name}
                            </Button>
                        ))}
                        <Button
                            size={ButtonSize.Block}
                            clickHandler={() => seShowJoinLeague(true)}
                        >
                            Join league
                        </Button>
                    </>
                )}

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
