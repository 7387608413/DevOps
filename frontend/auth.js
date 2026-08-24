function getToken() {
    return localStorage.getItem("devguardToken");
}


function getUser() {
    const user = localStorage.getItem("devguardUser");

    if (!user) {
        return null;
    }

    try {
        return JSON.parse(user);
    } catch (error) {
        return null;
    }
}


function requireLogin() {

    const token = getToken();

    if (!token) {
        window.location.href =
            "../login/index.html";

        return false;
    }

    return true;
}


function logout() {

    localStorage.removeItem(
        "devguardToken"
    );

    localStorage.removeItem(
        "devguardUser"
    );

    window.location.href =
        "../login/index.html";
}


function showUser() {

    const user = getUser();

    if (!user) {
        return;
    }


    const userNameElements =
        document.querySelectorAll(
            "[data-user-name]"
        );


    userNameElements.forEach(element => {

        element.textContent =
            `${user.firstName} ${user.lastName || ""}`.trim();

    });


    const userEmailElements =
        document.querySelectorAll(
            "[data-user-email]"
        );


    userEmailElements.forEach(element => {

        element.textContent =
            user.email;

    });


    const userRoleElements =
        document.querySelectorAll(
            "[data-user-role]"
        );


    userRoleElements.forEach(element => {

        element.textContent =
            user.role;

    });

}