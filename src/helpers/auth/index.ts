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

// decode the logged in user
export function parseJwt(token:string) {
    if (!token) {
        return;
    }
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace("-", "+").replace("_", "/");
    return JSON.parse(window.atob(base64));
}

export function getUserFromJwt(){
    const token = localStorage.getItem("token");
    if (!token) {
        return;
    }
    try {
        return parseJwt(token);
    }catch (e) {
        return undefined
    }
}