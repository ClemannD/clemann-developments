import { CategoryDto } from '@clemann-developments/dtos/expense-tracker-dtos';
import {
    Button,
    ButtonAppearance
} from '@clemann-developments/react/components/interaction/button';
import {
    Pill,
    PillColor
} from '@clemann-developments/react/components/ui-elements';
import { Input, Toggle } from '@clemann-developments/react/forms';
import { XIcon } from '@heroicons/react/outline';
import { Form, Formik } from 'formik';
import { useState } from 'react';
import * as Yup from 'yup';
import useCreateSubcategory from '../../../api-services/configuration/createSubcategory.service';
import useSetCategoryActive from '../../../api-services/configuration/setCategoryActive.service';
import useUpdateCategory from '../../../api-services/configuration/updateCategory.service';
import { ColorChip } from '../../../components/ui-elements/color-picker/color-chip.component';
import styles from './categories.module.scss';
import SubcategoryPill from './subcategory-pill.component';

export default function CategoryBox({
    categoryDto,
    fetchCategories
}: {
    categoryDto: CategoryDto;
    fetchCategories: () => void;
}) {
    const [isAddingSubcategory, setIsAddingSubcategory] = useState(false);
    const updateCategory = useUpdateCategory();
    const setCategoryActive = useSetCategoryActive();
    const createSubcategory = useCreateSubcategory();

    const onColorPicked = async (colorHex) => {
        await updateCategory.mutateAsync({
            categoryId: categoryDto.categoryId,
            name: categoryDto.name,
            color: colorHex
        });
        fetchCategories();
    };

    const onActiveChanged = async (isActive) => {
        await setCategoryActive.mutateAsync({
            categoryId: categoryDto.categoryId,
            active: isActive
        });
        fetchCategories();
    };

    return (
        <div
            className={styles.categoryBox}
            style={{ opacity: categoryDto.active ? 1 : 0.5 }}
        >
            <div className={styles.categoryHeader}>
                <h4>{categoryDto.name}</h4>

                <div className={styles.categoryControls}>
                    <ColorChip
                        style={{
                            marginRight: '1rem',
                            pointerEvents: categoryDto.active ? 'auto' : 'none'
                        }}
                        colorHex={categoryDto.color}
                        onSelect={onColorPicked}
                        onClickOutside={onColorPicked}
                    ></ColorChip>

                    <Toggle
                        checked={categoryDto.active}
                        onChange={onActiveChanged}
                    ></Toggle>
                </div>
            </div>

            <div className={styles.subcategories}>
                {categoryDto.subcategories.map((subcategory) => (
                    <SubcategoryPill
                        key={subcategory.subcategoryId}
                        subcategoryDto={subcategory}
                        fetchCategories={fetchCategories}
                    ></SubcategoryPill>
                ))}

                {isAddingSubcategory ? (
                    <Formik
                        initialValues={{
                            subcategoryName: ''
                        }}
                        validationSchema={Yup.object({
                            subcategoryName: Yup.string()
                                .max(50, 'Must be 50 characters or less')
                                .required('Required')
                        })}
                        onSubmit={async (values) => {
                            await createSubcategory.mutateAsync({
                                categoryId: categoryDto.categoryId,
                                name: values.subcategoryName
                            });
                            fetchCategories();
                        }}
                    >
                        <Form
                            style={{
                                display: 'flex',
                                marginBottom: '1rem',
                                flexBasis: '100%'
                            }}
                        >
                            <Input
                                style={{
                                    marginRight: '1rem'
                                }}
                                hideErrorMessage={true}
                                name="subcategoryName"
                                placeholder="Subcategory Name"
                            />
                            <Button
                                style={{
                                    marginRight: '1rem'
                                }}
                                type="submit"
                                appearance={ButtonAppearance.Secondary}
                            >
                                Save
                            </Button>
                            <Button
                                appearance={ButtonAppearance.Icon}
                                clickHandler={() =>
                                    setIsAddingSubcategory(false)
                                }
                            >
                                <XIcon height={'2rem'} />
                            </Button>
                        </Form>
                    </Formik>
                ) : (
                    <div onClick={() => setIsAddingSubcategory(true)}>
                        <Pill
                            color={PillColor.Transparent}
                            style={{
                                marginBottom: '1rem'
                            }}
                            clickHandler={() => {
                                setIsAddingSubcategory(true);
                            }}
                        >
                            Add Subcategory
                        </Pill>
                    </div>
                )}
            </div>
        </div>
    );
}
