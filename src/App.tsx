import { useEffect, useState } from 'react';
import Globe from './components/RotatingGlobe';
import { fetchInteractions, Interaction } from './models/InteractionAPI';
import './App.css';


function App() {
    const [interactions, setInteractions] = useState<Interaction[]>([]);

    useEffect(() => {
        const fetchData = async () => {
        const interactions = await fetchInteractions();
        setInteractions(interactions);
        };

        fetchData();
    }, []);

    return (
        <div className="app">
            {interactions.length > 0 && <Globe interactions={interactions} />}
        </div>
    );
}

export default App;
