app.post('/generate-pwd-reset-url', async (req, res) => {
  const customer = await customerdb.findOne({ email: req.body.email });

  if(!customer) {
    return res.status(404).json({ message: 'Customer not found' });
  }

const resetToken = await genPwdResetToken(customer._id);
const resetPwdUrl = `${req.header('host')}/passwordReset?token=${resetToken}&id=${customer._id}`;

return res.json({resetPwdUrl: resetPwdUrl})

})