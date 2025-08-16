function checkCurrentSet() {
    let set = Number(getCookie("currentSet"));
    (set < 1 && (set = 1));
    
    for (let i = 1; i <= 5; i++) {
        if (i <= set) {
            if (i != set) {
                document.getElementById(`span${i}`).style.visibility = "visible";
            }
            document.getElementById(`set${i}`).disabled = false;
        } else {
            document.getElementById(`set${i}`).disabled = true;
        }
    }
}

function navigateToSet(setNum) {
    let cookie = "currentSet";
    if (getCookie(cookie) <= setNum) {
        setCookie(cookie, setNum+1);
        checkCurrentSet();
    }
    location.href = `set${setNum}.html`;
}

function setCookie(cookie, value) {
    document.cookie = `${cookie}=${value};path=/`;
}

function getCookie(cookieName) {
    cookieName = cookieName + "=";
    let cookies = decodeURIComponent(document.cookie);
    let cookieArray = cookies.split(';');
    for (let i = 0; i < cookieArray.length; i++) {
        let cookie = cookieArray[i];
        while (cookie.charAt(0) == ' ') {
            cookie = cookie.substring(1);
        }
        if (cookie.indexOf(cookieName) == 0) {
            return cookie.substring(cookieName.length, cookie.length);
        }
    }
}

window.onload = () => {
    if (getCookie("currentSet") == null) {
        setCookie("currentSet", '1');
    }
    checkCurrentSet();
};