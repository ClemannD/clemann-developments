import { Form, Formik } from 'formik';
import Card from '../../../components/cards/card/card.component';
import Input from '../../../components/forms/input/input.component';
import * as Yup from 'yup';
import Button, {
    ButtonSize
} from '../../../components/buttons/button.component';
import { useEffect } from 'react';
import useCreateLeague from '../../../api-services/admin/leagues/createLeague.service';
import { League } from '../../../api-services/entities/league.entity';
import useUpdateLeague from '../../../api-services/admin/leagues/updateLeague.service';

export default function LeagueForm({
    league,
    setShowLeagueForm
}: {
    league?: League;
    setShowLeagueForm: React.Dispatch<React.SetStateAction<League>>;
}) {
    const createLeague = useCreateLeague();
    const updateLeague = useUpdateLeague();

    useEffect(() => {
        if (createLeague.isSuccess) {
            setShowLeagueForm(null);
        }
    }, [createLeague.isSuccess]);
    useEffect(() => {
        if (updateLeague.isSuccess) {
            setShowLeagueForm(null);
        }
    }, [updateLeague.isSuccess]);

    return (
        <div className="row">
            <div className="col-12 col-md-9">
                <Card
                    header={
                        league?.leagueId ? 'Edit League' : 'Add a new League'
                    }
                >
                    <div style={{ padding: '3rem' }}>
                        <Formik
                            initialValues={{
                                name: league?.name || '',
                                state: league?.state || '',
                                city: league?.city || ''
                            }}
                            validationSchema={Yup.object({
                                name: Yup.string()
                                    .max(50, 'Must be 50 characters or less')
                                    .required('Required'),
                                city: Yup.string()
                                    .max(50, 'Must be 50 characters or less')
                                    .required('Required'),
                                state: Yup.string()
                                    .max(50, 'Must be 50 characters or less')
                                    .required('Required')
                            })}
                            onSubmit={(values) => {
                                if (league.leagueId) {
                                    updateLeague.mutate({
                                        leagueId: league.leagueId,
                                        ...values
                                    });
                                } else {
                                    createLeague.mutate(values);
                                }
                            }}
                        >
                            <Form>
                                <div className="row">
                                    <div className="col-12">
                                        <Input
                                            label="League Name"
                                            subLabel="Something you call the league with everyone"
                                            name="name"
                                            placeholder="Name"
                                            autoComplete="off"
                                        ></Input>
                                    </div>
                                    <div className="col-12 col-md-6">
                                        <Input
                                            label="City"
                                            name="city"
                                            placeholder="Sunrise"
                                            autoComplete="city"
                                        ></Input>
                                    </div>
                                    <div className="col-12 col-md-6">
                                        <Input
                                            label="State"
                                            name="state"
                                            placeholder="Florida"
                                            autoComplete="state"
                                        ></Input>
                                    </div>
                                    <div className="col-12 col-md-3">
                                        <Button
                                            type="submit"
                                            size={ButtonSize.Medium}
                                            isSubmitting={
                                                createLeague.isLoading ||
                                                updateLeague.isLoading
                                            }
                                        >
                                            Save
                                        </Button>
                                    </div>
                                    {/* <div className="col-md-9"></div> */}
                                </div>
                            </Form>
                        </Formik>
                    </div>
                </Card>
            </div>
            <div className="col-12 col-md-3">
                <Card>
                    <div style={{ padding: '2rem' }}>
                        <p>
                            This is some text about what you should do on this
                            page and how to use it this will need to get filled
                            out better
                        </p>
                    </div>
                </Card>
            </div>
        </div>
    );
}
