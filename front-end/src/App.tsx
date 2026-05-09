import HomePage from './pages/HomePage/HomePage'
import './App.css'
import { useState } from 'react';
import AnimationZoom from './pages/AnimationZoom/AnimationZoom';

function App() {
    const [animDone, setAnimDone] = useState(false);

    return (
        <>
        <div className="app-root">
            <HomePage />
            {!animDone && <AnimationZoom onComplete={() => setAnimDone(true)} />}
        </div>
        </>
    )
}

export default App