import { useContext } from 'react';
import CardButton from '../CardButton/CardButton';
import JournalItem from '../JournalItem/JournalItem';
import styles from './JournalList.module.css';
import { UserContext } from '../../context/user.context';

function JournalList({ notes }) {
    const { userId } = useContext(UserContext);

    return (
        <div className={styles['journal-list']}>
            {notes.length < 1 ? (
                <p>Записей пока нет, создайте первую</p>
            ) : (
                notes
                    .filter((el) => el.userId === userId)
                    .map((el) => {
                        return (
                            <CardButton key={el.id}>
                                <JournalItem
                                    title={el.title}
                                    date={el.date}
                                    post={el.post}
                                />
                            </CardButton>
                        );
                    })
            )}
        </div>
    );
}

export default JournalList;
