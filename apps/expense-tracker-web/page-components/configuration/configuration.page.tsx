import Layout from '../../components/layout/layout.component';
import ConfigurationCategoriesSection from './categories/configuration-categories.section';
import ConfigurationTagsSection from './tags/configuration-tags.section';

export default function ConfigurationPage() {
    return (
        <Layout>
            <div className="container">
                <div className="header">
                    <h2>Configuration</h2>
                </div>

                <ConfigurationCategoriesSection></ConfigurationCategoriesSection>
                <ConfigurationTagsSection></ConfigurationTagsSection>
            </div>
        </Layout>
    );
}
