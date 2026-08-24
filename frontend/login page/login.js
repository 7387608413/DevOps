const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", async (event) => {

    event.preventDefault();

    const email =
        document.getElementById("email").value.trim();

    const password =
        document.getElementById("password").value;


    if (!email || !password) {

        alert("Please enter email and password.");

        return;
    }


    try {

        const response = await fetch(
            "http://localhost:5000/api/auth/login",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    email: email,
                    password: password
                })
            }
        );


        const data =
            await response.json();


        if (!response.ok) {

            alert(
                data.message ||
                "Login failed."
            );

            return;
        }


        // Store authentication data

        localStorage.setItem(
            "devguardToken",
            data.token
        );


        localStorage.setItem(
            "devguardUser",
            JSON.stringify(data.user)
        );


        // Login successful

        window.location.href =
            "../dashboard/index.html";


    } catch (error) {

        console.error(
            "Login error:",
            error
        );

        alert(
            "Cannot connect to DevGuard server. Make sure the backend is running."
        );

    }

});