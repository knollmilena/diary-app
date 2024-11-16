import './App.css';
import Header from './components/Header/Header';
import JournalList from './components/JournalList/JournalList';
import JournalAddButton from './components/JournalAddButton/JournalAddButton';
import Body from './layouts/Body/Body';
import LeftPanel from './layouts/LeftPanel/LeftPanel';
import JournalForm from './components/JournalForm/JournalForm';
import { useLocalStorage } from './hooks/use-localstorage.hook';
import { UserContextProvider } from './context/user.context';

function App() {
    const [data, setData] = useLocalStorage('data');

    const addNotes = (newNote) => {
        const newId =
            data.length > 0 ? Math.max(...data.map((note) => note.id)) + 1 : 1;

        setData([
            ...data,
            { ...newNote, id: newId, date: new Date(newNote.date) },
        ]);
    };

    return (
        <UserContextProvider>
            <div className="app">
                <LeftPanel>
                    <Header />
                    <JournalAddButton />

                    <JournalList notes={data} />
                </LeftPanel>
                <Body>
                    <JournalForm onSubmit={addNotes} />
                </Body>
            </div>
        </UserContextProvider>
    );
}

export default App;
