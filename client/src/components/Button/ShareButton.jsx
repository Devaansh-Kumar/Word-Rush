import React from 'react';

const ShareButton = ({ url, title, text }) => {
  const handleShareClick = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: title,
          text: text,
          url: url,
        });
      } else {
        // In case the browser does not support the Web Share API
        alert('Sharing is not supported in this browser. Please share the link manually.');
      }
    } catch (error) {
      console.error('Error sharing:', error);
      alert('Failed to share the link.');
    }
  };

  return (
    <button onClick={handleShareClick}>Share</button>
  );
};

export default ShareButton;
