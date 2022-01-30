import AdminLayout from '../../../components/layouts/admin-layout/admin-layout.component';
import PageHeader from '../../../components/ui-elements/page-header/page-header.component';

export default function Strategies() {
    return (
        <AdminLayout>
            <PageHeader
                subHeader="Admin"
                header="Scoring Strategies"
            ></PageHeader>
        </AdminLayout>
    );
}
