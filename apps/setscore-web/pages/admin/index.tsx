import styles from '../../styles/pages/Home.module.scss';
import AdminLayout from '../../components/layouts/admin-layout/admin-layout.component';
import PageHeader from '../../components/ui-elements/page-header/page-header.component';

export default function Home() {
    return (
        <AdminLayout>
            <PageHeader subHeader="Admin" header="Dashboard"></PageHeader>
        </AdminLayout>
    );
}
