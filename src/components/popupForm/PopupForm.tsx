import React, { useState, useContext } from 'react';
import './PopupForm.scss';
import { ColumnContext } from '../../context/ColumnContext';

const TaskFormPopup: React.FC<{
    onSubmit: () => void;
    onCancel: () => void;
}> = ({ onSubmit, onCancel }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const { insert } = useContext(ColumnContext);

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if (title != '' && description != '') insert(title, description);
        onSubmit();
    };

    const handleCancel = () => {
        onCancel();
    };

    return (
        <div className="popup-container">
            <div className="popup">
                <h2>Create a Task</h2>
                <form className="popup-form" onSubmit={handleSubmit}>
                    <label>
                        <div>Title:</div>
                        <input
                            type="text"
                            value={title}
                            onChange={(event) => setTitle(event.target.value)}
                        />
                    </label>
                    <label>
                        <div>Description:</div>
                        <textarea
                            value={description}
                            onChange={(event) =>
                                setDescription(event.target.value)
                            }
                        />
                    </label>
                    <div className="button-container">
                        <button type="submit">Create</button>
                        <button
                            type="button"
                            className="cancel "
                            onClick={handleCancel}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default TaskFormPopup;
