import cookie from "cookiejs";

const getCookie = (name: string) => {
    return cookie.get(name)
}

const setCookie = (name: string, value: string) => {
    cookie.set(name, value)
}

export {
    getCookie,
    setCookie,
}
