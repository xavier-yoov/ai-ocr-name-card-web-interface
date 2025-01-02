export function removeCredentials(){
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("refreshToken");
}

export function hasUser(){
    const result = localStorage.getItem("user");
    console.log('has user',!!result)
    return !!result
}