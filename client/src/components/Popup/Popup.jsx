import React, { useState, useEffect } from 'react';
import Popup from 'reactjs-popup';
import './Popup.css';

function Meaning({ solution }) {
    const [definition, setDefinition] = useState(null);

    useEffect(() => {
        fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${solution}`)
            .then(response => response.json())
            .then(data => {
                const meanings = data[0]?.meanings;
                const definitions = meanings?.flatMap(meaning => {
                    return meaning.definitions.map(def => ({
                        partOfSpeech: meaning.partOfSpeech,
                        definition: def.definition,
                        example: def.example
                    }));
                });
                setDefinition(definitions.slice(0, 5));
            })
            .catch(error => console.log(error));
    }, []);

    return (
        <div className="meaning-container">
            <Popup
                modal
                nested
                defaultOpen={true}
            >
                {close => (
                    <div className="modal">
                        <button className="close" onClick={close}>
                            &times;
                        </button>
                        <div className="header">{ solution }</div>
                        <div className="content">
                            {definition ? (
                                <ul>
                                    {definition.map((def, index) => (
                                        <li key={index}>
                                            <strong>Part of Speech:</strong> {def.partOfSpeech}<br />
                                            <strong>Definition:</strong> {def.definition}<br />
                                            {def.example && (
                                                <div>
                                                    <strong>Example:</strong> {def.example}
                                                </div>
                                            )}
                                            <br />
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p>Loading...</p>
                            )}
                        </div>
                        <div className="actions">
                            <button
                                className="button"
                                onClick={() => {
                                    console.log('modal closed');
                                    close();
                                }}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                )}
            </Popup>
        </div>
    );
}

export default Meaning;
