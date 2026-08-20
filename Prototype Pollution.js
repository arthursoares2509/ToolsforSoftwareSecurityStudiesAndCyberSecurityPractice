const SOMEOBJECT = {}; // Currently Empty

app.get("/validateToken", (req, res) => {
  if(req.header('token')) {
    const token = Buffer.from(req.header('token'), 'base64');
    // Should always be false as SOMEOBJECT is empty
    if(SOMEOBJECT[token] && token) {
      return res.send("true");
    }
  }
  return res.send("false");
});