import { useWindowSize } from '@clemann-developments/react/hooks/use-window-dimensions';
import { PlusCircleIcon } from '@heroicons/react/outline';
import { useState } from 'react';
import { ButtonAppearance } from '../../../../../libs/react/component/button/src/button.component';
import AdminLayout from '../../../components/layouts/admin-layout/admin-layout.component';
import PageHeader from '../../../components/ui-elements/page-header/page-header.component';
import LeagueForm from '../../../page-components/admin/leagues/league-form.component';
import LeaguesTable from '../../../page-components/admin/leagues/leagues-table.component';

export default function LeaguesPage() {
    const [showLeagueForm, setShowLeagueForm] = useState(null);
    const { mediumBelow } = useWindowSize();

    return (
        <AdminLayout>
            <div>
                <PageHeader
                    subHeader="Admin"
                    header="Leagues"
                    actionButtonAppearance={
                        showLeagueForm
                            ? ButtonAppearance.Secondary
                            : ButtonAppearance.Primary
                    }
                    actionButtonText={
                        showLeagueForm ? (
                            'Cancel'
                        ) : (
                            <>
                                <PlusCircleIcon
                                    height="1.8rem"
                                    style={{
                                        marginRight: mediumBelow ? '0' : '1rem'
                                    }}
                                ></PlusCircleIcon>
                                {!mediumBelow && 'Add New League'}
                            </>
                        )
                    }
                    actionButtonHandler={() =>
                        setShowLeagueForm(showLeagueForm ? null : {})
                    }
                ></PageHeader>
                {showLeagueForm ? (
                    <LeagueForm
                        league={showLeagueForm}
                        setShowLeagueForm={setShowLeagueForm}
                    ></LeagueForm>
                ) : (
                    <LeaguesTable
                        setShowLeagueForm={setShowLeagueForm}
                    ></LeaguesTable>
                )}
            </div>
        </AdminLayout>
    );
}
