// Get user info from username
app.post('/user', (req, res) => {
// assuming user is authenticated
  db.collection('users').find({
    "username": req.body.username,
}, (err, result) => {
      if(err || !result) {
        return res.status(500).send({ message: 'Error finding user' })
      }
      else {
        res.status(200).send(result);
      }
  });
});