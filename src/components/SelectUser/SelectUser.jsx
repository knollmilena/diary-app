import { useContext } from 'react';
import { UserContext } from '../../context/user.context';

function SelectUser() {
    const { userId, setUserId } = useContext(UserContext);

    const onChange = (e) => {
        setUserId(Number(e.target.value));
    };

    return (
        <>
            <select name="user" id="user" value={userId} onChange={onChange}>
                <option value="1">Anton</option>
                <option value="2">Vasya</option>
            </select>
        </>
    );
}

export default SelectUser;
