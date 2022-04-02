import {
    Button,
    ButtonAppearance,
    ButtonSize
} from '@clemann-developments/react/components/interaction/button';
import { DropdownButton } from '@clemann-developments/react/components/interaction/dropdown-button';
import { Input } from '@clemann-developments/react/forms';
import { PlusIcon } from '@heroicons/react/outline';
import { Form, Formik } from 'formik';
import { useEffect, useState } from 'react';
import * as Yup from 'yup';
import useCreateCategory from '../../../api-services/configuration/createCategory.service';
import { ColorChip } from '../../../components/ui-elements/color-picker/color-chip.component';
import styles from './categories.module.scss';

export default function CreateCategoryButton({
    fetchCategories
}: {
    fetchCategories: () => void;
}) {
    const [colorHex, setColorHex] = useState<string>();
    const createCategory = useCreateCategory();
    const [isOpen, setIsOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        setColorHex(`#${Math.floor(Math.random() * 16777215).toString(16)}`);
    }, [isOpen]);

    return (
        <DropdownButton
            dropdownButtonText={'Add Category'}
            buttonSize={ButtonSize.Auto}
            buttonAppearance={ButtonAppearance.Primary}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            clickOutsideToClose={!isOpen}
            IconClass={PlusIcon}
        >
            <div className={styles.addCategoryDropdown}>
                <Formik
                    initialValues={{
                        categoryName: ''
                    }}
                    validationSchema={Yup.object({
                        categoryName: Yup.string()
                            .max(50, 'Must be 50 characters or less')
                            .required('Required')
                    })}
                    onSubmit={async (values, { resetForm }) => {
                        try {
                            setIsSubmitting(true);
                            await createCategory.mutateAsync({
                                name: values.categoryName,
                                color: colorHex
                            });
                            setIsOpen(false);
                            fetchCategories();

                            resetForm();
                        } catch (e) {
                            console.error(e);
                        }
                        setIsSubmitting(false);
                    }}
                >
                    <Form>
                        <div className={styles.categoryForm}>
                            <Input
                                autoFocus
                                label="Category Name"
                                name="categoryName"
                                style={{ marginRight: '1.5rem' }}
                            ></Input>
                            {colorHex && (
                                <ColorChip
                                    style={{
                                        marginRight: '1.5rem'
                                    }}
                                    colorHex={colorHex}
                                    onChange={(colorHex) => {
                                        setColorHex(colorHex);
                                    }}
                                ></ColorChip>
                            )}
                            <Button
                                type="submit"
                                size={ButtonSize.Auto}
                                isSubmitting={isSubmitting}
                            >
                                Add
                            </Button>
                        </div>
                    </Form>
                </Formik>
            </div>
        </DropdownButton>
    );
}
