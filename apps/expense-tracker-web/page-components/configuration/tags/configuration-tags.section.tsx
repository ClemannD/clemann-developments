import { useEffect } from 'react';
import useGetTags from '../../../api-services/configuration/getTags.service';
import CreateTagButton from './create-tag-button.component';
import TagPill from './tag-pill.component';
import styles from './tags.module.scss';

export default function ConfigurationTagsSection() {
    const getTags = useGetTags();

    useEffect(() => {
        fetchTags();
    }, []);

    const fetchTags = () => {
        getTags.mutateAsync({});
    };

    return (
        <div className={styles.tagsSection}>
            <div className={styles.sectionHeader}>
                <h3>Tags</h3>

                <CreateTagButton fetchTags={fetchTags} />
            </div>
            <div className={styles.tagsBox}>
                {getTags.data?.tags.map((tag) => (
                    <TagPill
                        key={tag.tagId}
                        tagDto={tag}
                        fetchTags={fetchTags}
                    ></TagPill>
                ))}
            </div>
        </div>
    );
}
