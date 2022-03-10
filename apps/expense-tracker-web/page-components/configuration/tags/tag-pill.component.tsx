import { TagDto } from '@clemann-developments/dtos/expense-tracker-dtos';
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
import useUpdateTag from '../../../api-services/configuration/updateTag.service';
import styles from './tags.module.scss';

export default function TagPill({
    tagDto,
    fetchTags
}: {
    tagDto: TagDto;
    fetchTags: () => void;
}) {
    const [isEditingTag, setIsEditingTag] = useState(false);
    const [isActive, setIsActive] = useState(tagDto.active);
    const dropdown = useRef(null);
    const pill = useRef(null);
    const updateTag = useUpdateTag();

    useEffect(() => {
        if (isEditingTag) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isEditingTag]);

    const handleClickOutside = (e: { target: any }) => {
        if (
            dropdown?.current?.contains(e.target) ||
            pill?.current?.contains(e.target)
        ) {
            return;
        }
        setIsEditingTag(false);
    };

    return (
        <div
            key={tagDto.tagId}
            className={styles.tagPill}
            style={{
                marginRight: '1rem'
            }}
            ref={pill}
        >
            <Pill
                clickHandler={() => setIsEditingTag(true)}
                color={PillColor.Black}
                lightFont
                style={{
                    opacity: tagDto.active ? 1 : 0.5,
                    marginBottom: '1rem'
                }}
            >
                {tagDto.name}
            </Pill>

            {isEditingTag && (
                <div className={styles.tagControls} ref={dropdown}>
                    <Formik
                        initialValues={{
                            name: tagDto.name
                        }}
                        onSubmit={async (values) => {
                            await updateTag.mutateAsync({
                                tagId: tagDto.tagId,
                                name: values.name,
                                active: isActive
                            });
                            fetchTags();
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
                                    clickHandler={() => setIsEditingTag(false)}
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
