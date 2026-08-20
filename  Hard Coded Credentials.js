const jwt = require('jsonwebtoken');

// Secret key for signing JWT
const secret = 'my-super-duper-secret-key';

app.post('/login', (req, res) => {
  // Assume authentication happens successfully
  // & the following user is returned from the DB
  const user = { id: 123, name: 'John Doe' };

  // Sign JWT with user ID and secret key
  const token = jwt.sign(user, secret);

  // Send JWT back to client
  res.json({ token });
});