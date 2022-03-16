import {
    Button,
    ButtonAppearance,
    ButtonSize
} from '@clemann-developments/react/components/interaction/button';
import { DropdownButton } from '@clemann-developments/react/components/interaction/dropdown-button';
import { Input } from '@clemann-developments/react/forms';
import { PlusIcon } from '@heroicons/react/outline';
import { Form, Formik } from 'formik';
import { useState } from 'react';
import * as Yup from 'yup';
import useCreateTag from '../../../api-services/configuration/createTag.service';
import styles from './tags.module.scss';

export default function CreateTagButton({
    fetchTags
}: {
    fetchTags: () => void;
}) {
    const createTag = useCreateTag();
    const [isOpen, setIsOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    return (
        <DropdownButton
            dropdownButtonText={'Add Tag'}
            buttonSize={ButtonSize.Medium}
            buttonAppearance={ButtonAppearance.Primary}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            clickOutsideToClose={!isOpen}
            IconClass={PlusIcon}
        >
            <div className={styles.addTagDropdown}>
                <Formik
                    initialValues={{
                        tagName: ''
                    }}
                    validationSchema={Yup.object({
                        tagName: Yup.string()
                            .max(50, 'Must be 50 characters or less')
                            .required('Required')
                    })}
                    onSubmit={async (values) => {
                        try {
                            setIsSubmitting(true);
                            await createTag.mutateAsync({
                                name: values.tagName
                            });
                            setIsOpen(false);
                            fetchTags();
                        } catch (e) {
                            console.error(e);
                        }
                        setIsSubmitting(false);
                    }}
                >
                    <Form>
                        <div className={styles.tagForm}>
                            <Input
                                label="Tag Name"
                                name="tagName"
                                style={{ marginRight: '1.5rem' }}
                            ></Input>
                            <Button
                                type="submit"
                                size={ButtonSize.Small}
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
