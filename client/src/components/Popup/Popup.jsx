import React, { useState, useEffect } from 'react';
import Popup from 'reactjs-popup';

function Meaning({ solution }) {
    const [definition, setDefinition] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

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
                setIsModalOpen(true);
            })
            .catch(error => console.log(error));
    }, [solution]);

    return (
        <div className="flex justify-center items-center fixed w-screen h-screen z-[1050] left-0 top-0">
            {definition && (
                <Popup modal nested defaultOpen={isModalOpen}>
                    {close => (
                        <div className="text-xs bg-[#232323] relative rounded-[10px];">
                            <div className="w-full text-white text-lg text-center p-[5px] border-b-[3px] border-b-black border-solid;">
                                {solution}
                            </div>
                            <div className="text-white text-sm w-full px-[5px] py-2.5 border-x-[3px];">
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
                            </div>
                            <div className="w-full text-center m-auto px-[5px] py-2.5;">
                                <button
                                    className="text-xs bg-[#232323] relative rounded-[10px] text-white mb-4"
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
            )}
        </div>
    );
}

export default Meaning;