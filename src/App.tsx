import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './App.scss';
import ColumnProvider from './context/ColumnContext';

import { Button, PopupForm, KanbanBoard } from './components';

function App() {
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    return (
        <ColumnProvider>
            <div className="App">
                <Button label="New Task" onClick={() => setIsPopupOpen(true)} />
                {isPopupOpen && (
                    <PopupForm
                        onSubmit={() => setIsPopupOpen(false)}
                        onCancel={() => setIsPopupOpen(false)}
                    />
                )}
                <KanbanBoard />
            </div>
        </ColumnProvider>
    );
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
);
