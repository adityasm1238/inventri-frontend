exports.getAuthToken = ()=>
{
    let authToken = localStorage.getItem("access_token");
    if(authToken && authToken.length>0)
        return authToken;
    return null
};

exports.getAuthHeader = (token) =>
{
    return {
        headers: {
          'Authorization': `Basic ${token}` 
        }
      }
}

exports.getUserId = ()=>
{
    let user = localStorage.getItem("id");
    if(user && user.length>0)
        return user
    return null
};