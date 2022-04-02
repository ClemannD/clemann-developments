import { CategoryDto } from '@clemann-developments/dtos/expense-tracker-dtos';
import { Loading } from '@clemann-developments/react/components/ui-elements';
import { useEffect, useState } from 'react';
import useGetCategories from '../../../api-services/configuration/getCategories.service';
import styles from './categories.module.scss';
import CategoryBox from './category-box.component';
import CreateCategoryButton from './create-category-button.component';

export default function ConfigurationCategoriesSection() {
    const getCategoriesService = useGetCategories();

    const [categories, setCategories] = useState<CategoryDto[]>(null);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        const response = await getCategoriesService.mutateAsync({});
        setCategories(response.categories);
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
                {/* <div className="col-12">
                    <div
                        className={`
                            ${styles.exampleCategories}
                            ${styles.categoryBox}
                        `}
                    >
                        <div className={styles.categoryHeader}>
                            <h4>Example Categories</h4>
                            <p></p>
                        </div>
                    </div>
                </div> */}
                {!categories ? (
                    <div className="col-12">
                        <Loading></Loading>
                    </div>
                ) : (
                    categories.map((category) => (
                        <div
                            className={`col-12 col-md-6 col-xl-4`}
                            key={category.categoryId}
                        >
                            <CategoryBox
                                categoryDto={category}
                                fetchCategories={fetchCategories}
                            ></CategoryBox>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
