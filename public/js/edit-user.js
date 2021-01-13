if (document.URL === "http://localhost:3000/user" || document.URL === "https://e-shop-lamotte.herokuapp.com/user") {
    document.querySelector("#submit").addEventListener("click", (e) => {
        e.preventDefault()
        let errors;
        errors = [];
        const firstname = document.querySelector("#firstname").value;
        const lastname = document.querySelector("#lastname").value;
        const email = document.querySelector("#email").value;
        const password = document.querySelector("#password").value;
        const password2 = document.querySelector("#password2").value;
        const password_current = document.querySelector("#password_current").value;

        if (password_current ==="") {
            errors.push("Current password is required!")
        }
        if (password !== password2) {
            errors.push("New password and its confirmation must be the same!")
        }
        if (email !== "" && !(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email))){
            errors.push("Email is invalid!")
        }
        if (errors.length === 0) {
            console.log("send");

            fetch("/edit-user", { method: "POST", headers: {"Content-type": "application/json; charset=UTF-8" },
                body: JSON.stringify({
                    firstname,
                    lastname,
                    email,
                    password,
                    password_current
                })
            }).then(response => response.json()).then(data => {
                if (document.querySelectorAll(".errors").length !== 0){
                    document.querySelectorAll(".errors").forEach(element => {
                        element.remove();
                    });
                }
                if (data.error) {
                    document.querySelector("#update_delete").insertAdjacentHTML("beforeend", '<div class="errors alert alert-danger mt-3">'+ data.error +'</div>')
                } else {
                    document.querySelector("#update_delete").insertAdjacentHTML("beforeend", '<div class="errors alert alert-success mt-3">Your datas correctly updated</div>')
                }
            })
        }else {
            if (document.querySelectorAll(".errors").length !== 0){
                document.querySelectorAll(".errors").forEach(element => {
                    element.remove();
                });
            }
            errors.forEach(error => {
                document.querySelector("#update_delete").insertAdjacentHTML("beforeend", '<div class="errors alert alert-danger mt-3">'+ error +'</div>')
            });
        }
    })

    document.querySelector('#delete').addEventListener("click", (e) => {
        e.preventDefault();
        document.querySelector("#update_delete").style.display = "none";
        document.querySelector("#confirm_delete").style.display = "block";
    });

    document.querySelector("#unconfirm_delete").addEventListener("click", (e) => {
        e.preventDefault();
        document.querySelector("#update_delete").style.display = "block";
        document.querySelector("#confirm_delete").style.display = "none";
    })

    document.querySelector("#delete_account").addEventListener("click", async (e) => {
        e.preventDefault()
        await fetch('/deleteAccount', { method: 'POST', headers: {"content-type": "application/json; charset=UTF-8"}});
        window.location.assign('/login-register')
    })
}