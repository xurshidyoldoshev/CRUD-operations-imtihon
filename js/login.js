const elForm = document.querySelector(".form")
elForm.addEventListener("submit", (e) => {
    e.preventDefault()
    const data = {
        username : e.target[0].value,
        password : e.target[1].value
    }
    const confirm = {
        checkUsername: "Xurshid Yoldoshev",
        checkPassword: "12345678"
    }
    if (data.username == confirm.checkUsername && data.password == confirm.checkPassword) {
        window.localStorage.setItem("user", JSON.stringify(data))
        setTimeout(() => {
            window.location = "./index.html"
        }, 1000);
    } else {
        alert("other user information !")
    }
})