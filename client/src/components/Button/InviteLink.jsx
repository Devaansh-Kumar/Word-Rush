import React, { useState } from 'react';
import ShareButton from './ShareButton';
import axios from 'axios';

const InviteLink = () => {
    const [inviteLink, setInviteLink] = useState('');

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
            await navigator.clipboard.writeText(inviteLink);
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
                        <a href={inviteLink} target="_blank" rel="noopener noreferrer">
                            {inviteLink}
                        </a>
                        <button onClick={handleCopyClick}>Copy</button>
                        <ShareButton url={inviteLink} title="Invite Link" text="Join us with this invite link:" />
                    </>
                )}
            </div>
        </div>
    );
};

export default InviteLink;
