import React, { useState } from 'react';

function Dashboard() {
    const [description, setDescription] = useState('');
    const [timer, setTimer] = useState(0);
    const [link, setLink] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch('http://localhost:3001/api/banner', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ description, timer, link }),
            });

            if (response.ok) {
                console.log('Banner updated successfully');
            } else {
                console.error('Failed to update banner');
            }
        } catch (error) {
            console.error('Error updating banner:', error);
        }
    };

    return (
        <div className="dashboard">
            <h2>Banner Controls</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="description">Description:</label>
                    <input
                        type="text"
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="timer">Timer (seconds):</label>
                    <input
                        type="number"
                        id="timer"
                        value={timer}
                        onChange={(e) => setTimer(parseInt(e.target.value, 10))}
                    />
                </div>
                <div>
                    <label htmlFor="link">Link:</label>
                    <input
                        type="text"
                        id="link"
                        value={link}
                        onChange={(e) => setLink(e.target.value)}
                    />
                </div>
                <button type="submit">Update Banner</button>
            </form>
        </div>
    );
}

export default Dashboard;