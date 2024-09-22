import React, { useState } from 'react';
import Select from 'react-select';

function App() {
    const [jsonInput, setJsonInput] = useState('');
    const [response, setResponse] = useState(null);
    const [selectedOptions, setSelectedOptions] = useState([]);

    const options = [
        { value: 'numbers', label: 'Numbers' },
        { value: 'alphabets', label: 'Alphabets' },
        { value: 'highest_lowercase_alphabet', label: 'Highest Lowercase Alphabet' }
    ];

    const handleSelectChange = (selected) => {
        setSelectedOptions(selected);
    };

    const handleSubmit = async () => {
        try {
            const res = await fetch('https://aryan-bajaj.onrender.com/bfhl', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    data: JSON.parse(jsonInput),
                    filters: selectedOptions.map(option => option.value)
                })
            });
            const data = await res.json();
            setResponse(data);
        } catch (error) {
            console.error('Error submitting data:', error);
        }
    };

    return (
        <div>
            <h1>SRM Qualifier</h1>
            <textarea
                value={jsonInput}
                onChange={(e) => setJsonInput(e.target.value)}
                placeholder='Enter JSON data'
            />
            <br />
            <Select
                isMulti
                name="filters"
                options={options}
                onChange={handleSelectChange}
                placeholder='Select filters...'
            />
            <br />
            <button onClick={handleSubmit}>Submit</button>
            {response && (
                <div>
                    <h2>Response</h2>
                    <pre>{JSON.stringify(response, null, 2)}</pre>
                </div>
            )}
        </div>
    );
}

export default App;
