import cookie from 'cookiejs'

function getCookie(name: string) {
    return cookie.get(name)
}

function setCookie(name: string, value: string) {
    cookie.set(name, value)
}

export {
    getCookie,
    setCookie,
}
