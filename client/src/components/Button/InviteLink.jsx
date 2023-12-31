import React, { useState } from 'react';
import ShareButton from './ShareButton';
import axios from 'axios';

const InviteLink = () => {
    const [inviteLink, setInviteLink] = useState('');
    const URL = `http://localhost:5173/game?invite=${inviteLink}`
    
    const handleClick = async () => {
        try {
            const res = await axios.get("http://localhost:3000/invite");
            setInviteLink(res.data);
        } catch (error) {
            console.error('Error fetching invite link:', error);
            setInviteLink('Error fetching invite link.');
        }
    };

    const handleCopyClick = async () => {
        try {
            await navigator.clipboard.writeText(URL);
            alert('Invite link copied to clipboard!');
        } catch (error) {
            console.error('Error copying to clipboard:', error);
            alert('Failed to copy invite link to clipboard.');
        }
    };

    return (
        <div>
            <button onClick={handleClick}>Generate Invite Link</button>
            <div>
                {inviteLink && (
                    <>
                        <p>Invite Link:</p>
                        <a href={URL} target="_blank" rel="noopener noreferrer">
                            {URL}
                        </a>
                        <button onClick={handleCopyClick}>Copy</button>
                        <ShareButton url={URL} title="Invite Link" text="Join us with this invite link:" />
                    </>
                )}
            </div>
        </div>
    );
};

export default InviteLink;
