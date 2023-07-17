import React, { useState } from 'react';
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
          </>
        )}
      </div>
    </div>
  );
};

export default InviteLink;
