const express = require('express');
const router = express.Router();

// Route to generate invite link when the button is clicked
router.get('/invite', (req, res) => {
  const inviteLink = generateUUID();
  res.send(inviteLink);
});

function generateUUID() {
  return require('uuid').v4();
}

module.exports = router;
