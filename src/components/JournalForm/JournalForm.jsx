import styles from './JournalForm.module.css';
import Button from '../Button/Button';
import { useContext, useEffect, useReducer, useRef } from 'react';
import { formReducer, INITIAL_STATE } from './JournalForm.state';
import { UserContext } from '../../context/user.context';

function JournalForm({ onSubmit }) {
    const [formState, dispatchForm] = useReducer(formReducer, INITIAL_STATE);
    const { isValid, isFormReadyToSubmit, values } = formState;
    const { userId } = useContext(UserContext);
    const titleRef = useRef();
    const dateRef = useRef();
    const postRef = useRef();

    const focusError = (isValid) => {
        switch (true) {
            case !isValid.title:
                titleRef.current.focus();
                break;
            case !isValid.date:
                dateRef.current.focus();
                break;
            case !isValid.post:
                postRef.current.focus();
                break;
        }
    };

    useEffect(() => {
        if (isFormReadyToSubmit) {
            console.log(values);
            onSubmit(values);
            dispatchForm({ type: 'RESET' });
        }
    }, [isFormReadyToSubmit, values, onSubmit]);

    const addJournalItem = (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const formProps = Object.fromEntries(formData);
        dispatchForm({ type: 'SUBMIT', payload: { ...formProps, userId } });
    };

    const onChange = (e) => {
        console.log(userId);
        dispatchForm({
            type: 'SET_VALUE',
            payload: { [e.target.name]: e.target.value },
        });
    };

    useEffect(() => {
        let timerId;
        if (!isValid.title || !isValid.post || !isValid.date) {
            focusError(isValid);
            timerId = setTimeout(() => {
                dispatchForm({ type: 'RESET_VALID' });
            }, 2000);
        }
        return () => {
            clearTimeout(timerId);
        };
    }, [isValid.title, isValid.post, isValid.date, isValid]);

    return (
        <>
            <form className={styles['journal-form']} onSubmit={addJournalItem}>
                <div className={styles['form-row']}>
                    <input
                        type="text"
                        onChange={onChange}
                        value={values.title}
                        name="title"
                        ref={titleRef}
                        className={`${styles['input']} ${styles['input-title']} ${!isValid.title ? styles['invalid'] : ''}`}
                    />
                </div>
                <div className={styles['form-row']}>
                    <label htmlFor="date" className={styles['form-label']}>
                        <img src="/calendar.svg" alt="" />
                        <span>Дата</span>
                    </label>
                    <input
                        id="date"
                        onChange={onChange}
                        value={values.date}
                        ref={dateRef}
                        type="date"
                        name="date"
                        className={`${styles['input']} ${styles['input-date']} ${!isValid.date ? styles['invalid'] : ''}`}
                    />
                </div>
                <div className={styles['form-row']}>
                    <label htmlFor="tag" className={styles['form-label']}>
                        <img src="/folder.svg" alt="" />
                        <span>Метки</span>
                    </label>
                    <input
                        id="tag"
                        onChange={onChange}
                        value={values.tag}
                        className={`${(styles['input-tag'], styles.input)}`}
                        type="text"
                        name="tag"
                    />
                </div>
                <textarea
                    name="post"
                    onChange={onChange}
                    value={values.post}
                    ref={postRef}
                    className={`${styles['input']} ${styles['input-text']} ${!isValid.post ? styles['invalid'] : ''}`}
                />
                <Button style={{ alignSelf: 'flex-start' }}>
                    Создать заметку
                </Button>
            </form>
        </>
    );
}

export default JournalForm;
