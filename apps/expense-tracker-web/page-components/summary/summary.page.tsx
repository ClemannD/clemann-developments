import Layout from '../../components/layout/layout.component';
import styles from './summary.module.scss';

export default function SummaryPage() {
    return (
        <Layout>
            <div className="container">
                <div className="header">
                    <div>
                        <h2>Spending Overview</h2>
                        <p className="tag">
                            Welcome back, Today is{' '}
                            {new Date().toLocaleDateString('en-US', {
                                weekday: 'long',
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            })}
                        </p>
                    </div>
                </div>

                <div className={styles.summaryPage}>
                    This page is under construction. Please check back soon
                </div>
            </div>
        </Layout>
    );
}
