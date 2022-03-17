import {
    Button,
    ButtonAppearance
} from '@clemann-developments/react/components/interaction/button';
import { Loading } from '@clemann-developments/react/components/ui-elements';
import { useModal } from '@clemann-developments/react/hooks/use-modal';
import { format } from 'date-fns';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import useGetWeek from '../../../api-services/manager/week/getWeek.service';
import ManagerLayout from '../../../components/layouts/manager-layout/manager-layout.component';
import PageHeaderData from '../../../components/ui-elements/page-header/page-header-data.component';
import PageHeader from '../../../components/ui-elements/page-header/page-header.component';
import UpdatePlayingOnDateModal from '../../../page-components/manager/week/update-playing-on-date.modal';
import WeekCourts from '../../../page-components/manager/week/week-courts.component';

export default function WeekPage() {
    const router = useRouter();
    const getWeek = useGetWeek();
    const { showModal, closeModal } = useModal();

    useEffect(() => {
        fetchWeekData();
    }, [router.query]);

    const fetchWeekData = () => {
        // TODO: add error handling
        if (router.query.weekId) {
            getWeek.mutate({
                weekId: router.query.weekId[0] as string
            });
        } else {
            getWeek.mutate({
                weekId: null
            });
        }
    };

    return (
        <ManagerLayout>
            <PageHeader
                backButtonText="Back to seasons"
                backButtonHandler={() => router.push('/manager')}
                subHeader={`Season ${getWeek.data?.week?.seasonNumber || ''}`}
                header={`Week ${getWeek.data?.week.weekNumber || ''}`}
            >
                <PageHeaderData
                    style={{ marginTop: 'auto' }}
                    items={[
                        {
                            icon: 'calendar',
                            label: 'Playing On',
                            data: getWeek.data
                                ? format(
                                      new Date(
                                          getWeek.data?.week.playingOnDate
                                      ),
                                      'LLL do'
                                  )
                                : '-'
                        }
                    ]}
                ></PageHeaderData>

                <Button
                    style={{ marginTop: 'auto' }}
                    appearance={ButtonAppearance.Secondary}
                    clickHandler={() =>
                        showModal(
                            <UpdatePlayingOnDateModal
                                weekId={getWeek.data?.week.weekId}
                                weekNumber={getWeek.data?.week.weekNumber}
                                seasonNumber={getWeek.data?.week.seasonNumber}
                                playingOnDate={getWeek.data?.week.playingOnDate}
                                onSubmit={() => {
                                    fetchWeekData();
                                    closeModal();
                                }}
                            ></UpdatePlayingOnDateModal>
                        )
                    }
                >
                    Edit
                </Button>
            </PageHeader>
            {getWeek.data ? (
                <WeekCourts
                    week={getWeek.data?.week}
                    refreshWeekData={fetchWeekData}
                ></WeekCourts>
            ) : (
                <Loading></Loading>
            )}
        </ManagerLayout>
    );
}
