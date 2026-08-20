const emailRegex = /^([a-zA-Z0-9])((\.|\-|\_)?([a-zA-Z0-9]))*@([a-zA-Z0-9]+)\.(([a-z]{2,3})|(([a-z]{2,3}\.)[a-z]{2,3}))$/;

app.post('/validateEmail', (req, res) => {
  const email = req.body.email;
  if(!email || !emailRegex.test(email)) {
    return res.status(400).send({ error: 'Invalid email' });
  }
  return res.status(200).send({ valid: true });
});