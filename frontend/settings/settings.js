const menuButton =
    document.getElementById("menuButton");

const sidebar =
    document.querySelector(".sidebar");

const tabs =
    document.querySelectorAll(".settings-tab");

const sections =
    document.querySelectorAll(".settings-section");

const saveTop =
    document.getElementById("saveTop");

const toast =
    document.getElementById("toast");

const resetWorkspace =
    document.getElementById("resetWorkspace");

const deleteAccount =
    document.getElementById("deleteAccount");

const themeOptions =
    document.querySelectorAll(".theme-option");

const animationsToggle =
    document.getElementById("animationsToggle");

const compactToggle =
    document.getElementById("compactToggle");


/* =========================
   MOBILE MENU
========================= */

menuButton.addEventListener(
    "click",
    () => {

        sidebar.classList.toggle(
            "open"
        );

    }
);


/* =========================
   SETTINGS TABS
========================= */

tabs.forEach(tab => {

    tab.addEventListener(
        "click",
        () => {

            const sectionName =
                tab.dataset.section;


            tabs.forEach(item => {

                item.classList.remove(
                    "active"
                );

            });


            sections.forEach(section => {

                section.classList.remove(
                    "active"
                );

            });


            tab.classList.add(
                "active"
            );


            const selectedSection =
                document.getElementById(
                    sectionName
                );


            if (selectedSection) {

                selectedSection.classList.add(
                    "active"
                );

            }

        }
    );

});


/* =========================
   SAVE SETTINGS
========================= */

function showToast() {

    toast.classList.add(
        "show"
    );


    setTimeout(() => {

        toast.classList.remove(
            "show"
        );

    }, 2500);

}


saveTop.addEventListener(
    "click",
    () => {

        saveTop.textContent =
            "Saving...";


        saveTop.disabled = true;


        setTimeout(() => {

            saveTop.textContent =
                "✓ Saved";

            showToast();


            setTimeout(() => {

                saveTop.textContent =
                    "Save Changes";

                saveTop.disabled =
                    false;

            }, 1600);

        }, 900);

    }
);


/* =========================
   WORKSPACE RESET
========================= */

resetWorkspace.addEventListener(
    "click",
    () => {

        const confirmed =
            confirm(
                "Reset workspace preferences?"
            );


        if (!confirmed) {
            return;
        }


        document.getElementById(
            "workspaceName"
        ).value =
            "Production";


        showToast();

    }
);


/* =========================
   DELETE ACCOUNT
========================= */

deleteAccount.addEventListener(
    "click",
    () => {

        const confirmed =
            confirm(
                "This is a demo action. Continue?"
            );


        if (!confirmed) {
            return;
        }


        alert(
            "Account deletion will be connected to the backend later."
        );

    }
);


/* =========================
   THEME
========================= */

themeOptions.forEach(option => {

    option.addEventListener(
        "click",
        () => {

            const theme =
                option.dataset.theme;


            themeOptions.forEach(item => {

                item.classList.remove(
                    "active"
                );

            });


            option.classList.add(
                "active"
            );


            if (theme === "light") {

                document.body.classList.add(
                    "light"
                );

            } else {

                document.body.classList.remove(
                    "light"
                );

            }

        }
    );

});


/* =========================
   ANIMATIONS
========================= */

animationsToggle.addEventListener(
    "change",
    () => {

        if (
            animationsToggle.checked
        ) {

            document.body.style.setProperty(
                "--animation-speed",
                "1"
            );

        } else {

            document.body.style.setProperty(
                "--animation-speed",
                "0"
            );

        }

    }
);


/* =========================
   COMPACT MODE
========================= */

compactToggle.addEventListener(
    "change",
    () => {

        if (
            compactToggle.checked
        ) {

            document.body.classList.add(
                "compact"
            );

        } else {

            document.body.classList.remove(
                "compact"
            );

        }

    }
);


/* =========================
   INTEGRATION BUTTONS
========================= */

document.querySelectorAll(
    ".integration button"
).forEach(button => {

    button.addEventListener(
        "click",
        () => {

            const original =
                button.textContent;


            button.textContent =
                "Connecting...";

            button.disabled = true;


            setTimeout(() => {

                button.textContent =
                    "✓ Connected";

                button.style.color =
                    "#4ade80";


                setTimeout(() => {

                    button.textContent =
                        original;

                    button.disabled =
                        false;

                    button.style.color =
                        "";

                }, 1800);

            }, 1000);

        }
    );

});


/* =========================
   SECURITY BUTTONS
========================= */

document.querySelectorAll(
    ".security-button"
).forEach(button => {

    button.addEventListener(
        "click",
        () => {

            const original =
                button.textContent;


            button.textContent =
                "Done";

            button.style.color =
                "#4ade80";


            setTimeout(() => {

                button.textContent =
                    original;

                button.style.color =
                    "";

            }, 1600);

        }
    );

});