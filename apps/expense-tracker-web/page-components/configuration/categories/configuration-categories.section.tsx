import { useEffect } from 'react';
import useGetCategories from '../../../api-services/configuration/getCategories.service';
import styles from './categories.module.scss';
import CategoryBox from './category-box.component';
import CreateCategoryButton from './create-category-button.component';

export default function ConfigurationCategoriesSection() {
    const getCategories = useGetCategories();

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = () => {
        getCategories.mutate({});
    };

    return (
        <div className={styles.categoriesSection}>
            <div className={styles.sectionHeader}>
                <h3>Categories</h3>

                <CreateCategoryButton
                    fetchCategories={fetchCategories}
                ></CreateCategoryButton>
            </div>

            <div className={`${styles.categories} row`}>
                {getCategories.data?.categories.map((category) => (
                    <div
                        className={`col-12 col-md-6 col-xl-4`}
                        key={category.categoryId}
                    >
                        <CategoryBox
                            categoryDto={category}
                            fetchCategories={fetchCategories}
                        ></CategoryBox>
                    </div>
                ))}
            </div>
        </div>
    );
}
