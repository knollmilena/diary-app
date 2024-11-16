import CardButton from '../CardButton/CardButton';
import styles from './JournalAddButton.module.css';

function JournalAddButton() {
    return (
        <CardButton className={styles['journal-add']}>
            <img
                className={styles['journal-add__img']}
                src="/plus.svg"
                alt="Plus"
            />
            Новое воспоминание
        </CardButton>
    );
}

export default JournalAddButton;
