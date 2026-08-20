export function checkToken(userSupplied) {
  const account = account.retrieveToken(userSupplied);
  
  if(account){
    if(account.service.token === user.service.token) {
      return true;
    }
  }
  return false;
};