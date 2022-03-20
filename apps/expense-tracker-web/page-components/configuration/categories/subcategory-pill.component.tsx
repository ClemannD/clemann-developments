import { SubcategoryDto } from '@clemann-developments/dtos/expense-tracker-dtos';
import {
    Button,
    ButtonAppearance,
    ButtonSize
} from '@clemann-developments/react/components/interaction/button';
import {
    Pill,
    PillColor
} from '@clemann-developments/react/components/ui-elements';
import { Input, Toggle } from '@clemann-developments/react/forms';
import { XIcon } from '@heroicons/react/outline';
import { Form, Formik } from 'formik';
import { useEffect, useRef, useState } from 'react';
import useUpdateSubcategory from '../../../api-services/configuration/updateSubcategory.service';
import styles from './categories.module.scss';

export default function SubcategoryPill({
    subcategoryDto,
    fetchCategories
}: {
    subcategoryDto: SubcategoryDto;
    fetchCategories: () => void;
}) {
    const [isEditingSubcategory, setIsEditingSubcategory] = useState(false);
    const [isActive, setIsActive] = useState(subcategoryDto.active);
    const dropdown = useRef(null);
    const pill = useRef(null);
    const updateSubcategory = useUpdateSubcategory();

    useEffect(() => {
        if (isEditingSubcategory) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isEditingSubcategory]);

    const handleClickOutside = (e: { target: any }) => {
        if (
            dropdown?.current?.contains(e.target) ||
            pill?.current?.contains(e.target)
        ) {
            return;
        }
        setIsEditingSubcategory(false);
    };

    return (
        <div
            key={subcategoryDto.subcategoryId}
            className={styles.subcategoryPill}
            style={{
                marginRight: '1rem'
            }}
            ref={pill}
        >
            <Pill
                clickHandler={() => setIsEditingSubcategory(true)}
                color={PillColor.GrayLight}
                style={{
                    opacity: subcategoryDto.active ? 1 : 0.5,
                    marginBottom: '1rem',
                    cursor: 'pointer'
                }}
            >
                {subcategoryDto.name}
            </Pill>

            {isEditingSubcategory && (
                <div className={styles.subcategoryControls} ref={dropdown}>
                    <Formik
                        initialValues={{
                            name: subcategoryDto.name
                        }}
                        onSubmit={async (values) => {
                            await updateSubcategory.mutateAsync({
                                subcategoryId: subcategoryDto.subcategoryId,
                                name: values.name,
                                active: isActive
                            });
                            fetchCategories();
                        }}
                    >
                        <Form>
                            <Input
                                name="name"
                                hideErrorMessage
                                style={{
                                    marginBottom: '1rem'
                                }}
                            />
                            <Toggle
                                style={{
                                    marginBottom: '1rem'
                                }}
                                checked={isActive}
                                onChange={(checked) => {
                                    setIsActive(checked);
                                }}
                                label="Active"
                            ></Toggle>

                            <div
                                style={{
                                    display: 'flex'
                                }}
                            >
                                <Button
                                    style={{
                                        marginRight: '1rem'
                                    }}
                                    size={ButtonSize.Block}
                                    type="submit"
                                    appearance={ButtonAppearance.Secondary}
                                >
                                    Save
                                </Button>
                                <Button
                                    style={{
                                        marginRight: '1rem'
                                    }}
                                    appearance={ButtonAppearance.Icon}
                                    clickHandler={() =>
                                        setIsEditingSubcategory(false)
                                    }
                                >
                                    <XIcon height={'2rem'} />
                                </Button>
                            </div>
                        </Form>
                    </Formik>
                </div>
            )}
        </div>
    );
}
