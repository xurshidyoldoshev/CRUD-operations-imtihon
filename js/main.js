const addButton = document.querySelector(".wrapper-header-btn")
const elTbody = document.querySelector(".tbody")
const elModalWrapper = document.querySelector(".modal-wrapper")
const elModal = document.querySelector(".modal")
const elPicImgUpload = document.querySelector(".change-img")
const elLogOut = document.querySelector(".log-out-label")
const elUserName = document.querySelector(".user-name")
const elSearchInput = document.querySelector(".search-input")
const elSearchList = document.querySelector(".search-list")
const elUpSort = document.querySelector(".up-icon")
const elDownSort = document.querySelector(".up-down")

let users = JSON.parse(window.localStorage.getItem("users")) || [];

// sort start

elUpSort.addEventListener("click", () => {
    users.sort(function (a, b) {
        let x = a.name.toLowerCase();
        let y = b.name.toLowerCase();
        if (x < y) { return -1; }
        if (x > y) { return 1; }
        return 0;
    });
    renderUsers(users, elTbody)
})

// dblclick berishimni sababi click ni ikkalasiga ham berganimda faqat bitta sort ishladi

elDownSort.addEventListener("dblclick", () => {
    users.sort(function (a, b) {
        let x = a.name.toLowerCase();
        let y = b.name.toLowerCase();
        if (x < y) { return 1; }
        if (x > y) { return -1; }
        return 0;
    });
    renderUsers(users, elTbody)
})

// sort end

// search start

elSearchInput.addEventListener("keyup", (e) => {
    let data = users.filter(item => item.name.toLowerCase().includes(e.target.value.toLowerCase()))
    elSearchList.innerHTML = ""
    data.map(item => {
        let elListItem = document.createElement("li")
        elListItem.classList.add("elListItem")
        elListItem.dataset.id = item.id
        elListItem.textContent = `${item.name}`
        elSearchList.appendChild(elListItem)

        elListItem.addEventListener("click", (e) => {
            let clickedId = e.target.dataset.id
            let dataClick = users.find(item => item.id == clickedId)
            elSearchInput.value = `${dataClick.name}`
            elSearchList.classList.remove("search-list-open")

            let searchFilter = users.filter(item => item.id == clickedId)
            renderUsers(searchFilter, elTbody)
        })
    })
    if (e.target.value) {
        elSearchList.classList.add("search-list-open")
    } else {
        elSearchList.classList.remove("search-list-open")
        renderUsers(users, elTbody)
    }

})

// search end

// user name start

function userName() {
    let user = JSON.parse(window.localStorage.getItem("user"));
    elUserName.textContent = Object.values(user)[0]
}

userName()

// user name end

// log out start

elLogOut.addEventListener("click", () => {
    elModalWrapper.classList.add("open-modal")
    elModal.innerHTML = `
        <strong class="log-out-modal-title">Do you really want to leave ?</strong>
        <div class="log-out-btn-wrapper">
            <button onclick="logOutCancel()">Cancel</button>
            <button onclick="logOutBtn()">Log Out</button>
        </div>
    `
})

function logOutBtn() {
    window.location = "./login.html"
}

function logOutCancel() {
    elModalWrapper.classList.remove("open-modal")
}

// log out end

// user img start

function changeImage(event) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = function () {
        const image = document.getElementById('user-img');
        image.src = reader.result;

        localStorage.setItem('userImage', reader.result);
    };

    reader.readAsDataURL(file);
}

window.onload = function () {
    const userImage = localStorage.getItem('userImage');
    if (userImage) {
        const image = document.getElementById('user-img');
        image.src = userImage;
    }
}

// user img end

// add student start

addButton.addEventListener("click", (e) => {
    elModalWrapper.classList.add("open-modal")
    elModal.innerHTML = `
        <form class="add-student-form">
            <label>
                <div class="modal-img-wrapper">
                    <img src="./img/choose-icon-img.jpg" alt="user img" width="100%" height="100%"/>
                </div>
                <input type="file" class="visually-hidden"/>
            </label>
            <div class="modal-input-wrapper">
                <div class="modal-input-block">
                    <input class="modal-input" type="text" name="name" placeholder="Enter Your Name">
                    <input class="modal-input" type="email" name="email" placeholder="Enter Your Email">
                </div>
                <div class="modal-input-block">
                    <input class="modal-input" type="tel" name="tel" placeholder="Enter Your Phone">
                    <input class="modal-input" type="tel" name="enroll-number" placeholder="Enter Your Enroll Number">
                </div>
            </div>
            <div class="modal-btn-wrapper">
                <button onclick="logOutCancel()" type="button" class="modal-btn-wrapper-cancel">Cancel</button>
                <button type="submit" class="modal-btn-wrapper-add">Add</button>
            </div>
        </form>
    `

    const elAddForm = document.querySelector(".add-student-form")

    elAddForm.addEventListener("submit", (e) => {
        e.preventDefault()
        let datas = new Date()
        let newTime = (`${datas.getDate().toString().padStart(2, "0")}-${(datas.getMonth() + 1).toString().padStart(2, "0")}, ${datas.getFullYear()}`)
        let data = {
            id: users.length,
            img: URL.createObjectURL(e.target[0].files[0]),
            name: e.target[1].value,
            email: e.target[2].value,
            phone: e.target[3].value,
            enrollNumber: e.target[4].value,
            date: newTime
        }

        users.push(data)
        renderUsers(users, elTbody)
        elModalWrapper.classList.remove("open-modal")
        window.localStorage.setItem("users", JSON.stringify(users))
    })
})

// add student end

// render user start

function renderUsers(arr, list) {
    list.innerHTML = ""
    arr.map(item => {
        let elTr = document.createElement("tr")
        elTr.innerHTML = `
            <td class="item-img-wrapper">
                <img src="${item.img}" alt="user img" width="60px" height="50px"/>
            </td>
            <td class="student-item">${item.name}</td>
            <td class="student-item">${item.email}</td>
            <td class="student-item">${item.phone}</td>
            <td class="student-item">${item.enrollNumber}</td>
            <td class="student-item">${item.date}</td>
            <td class="student-item student-item-btn">
                <button onclick="uptadeClick(${item.id})" class="user-edit-btn"></button>
                <button onclick="deleteClick(${item.id})" class="user-delete-btn"></button>
            </td>
        `
        list.appendChild(elTr)
    })
}

renderUsers(users, elTbody)

// render user end

// uptade user start

function uptadeClick(id) {
    elModalWrapper.classList.add("open-modal")
    const data = users.find(item => item.id == id)
    elModal.innerHTML = `
        <form class="uptade-student-form">
            <label>
                <div class="modal-img-wrapper">
                    <img class="UptadeRenderImg" src="${data.img}" alt="user img" width="100%" height="100%"/>
                </div>
                <input type="file" class="visually-hidden UptadeRenderImgInp"/>
            </label>
            <div class="modal-input-wrapper">
                <div class="modal-input-block">
                    <input value="${data.name}" class="modal-input" type="text" name="name" placeholder="Enter Your Name">
                    <input value="${data.email}" class="modal-input" type="email" name="email" placeholder="Enter Your Email">
                </div>
                <div class="modal-input-block">
                    <input value="${data.phone}" class="modal-input" type="tel" name="tel" placeholder="Enter Your Phone">
                    <input value="${data.enrollNumber}" class="modal-input" type="tel" name="enroll-number" placeholder="Enter Your Enroll Number">
                </div>
            </div>
            <div class="modal-btn-wrapper">
                <button onclick="logOutCancel()" type="button" class="modal-btn-wrapper-cancel">Cancel</button>
                <button type="submit" class="modal-btn-wrapper-add">Uptade</button>
            </div>
        </form>
    `

    const elUptadeStudentForm = document.querySelector(".uptade-student-form")
    const elUptadeRenderImgInp = document.querySelector(".UptadeRenderImgInp")
    const elUptadeRenderImg = document.querySelector(".UptadeRenderImg")

    elUptadeRenderImgInp.addEventListener("change", (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = function () {
            elUptadeRenderImg.src = reader.result;
        };
        reader.readAsDataURL(file);
    });

    elUptadeStudentForm.addEventListener("submit", (e) => {
        e.preventDefault();
        data.img = elUptadeRenderImg.src;
        data.name = e.target[1].value;
        data.email = e.target[2].value;
        data.phone = e.target[3].value;
        data.enrollNumber = e.target[4].value;

        renderUsers(users, elTbody);
        window.localStorage.setItem("users", JSON.stringify(users));
        elModalWrapper.classList.remove("open-modal");
    });

}

// uptade user end

// delete user start

function deleteClick(id) {
    elModalWrapper.classList.add("open-modal")
    elModal.innerHTML = `
        <div class="delete-wrapper">
            <h2>Are you sure delete</h2>
            <div class="delete-user-btn-wrapper">
                <button onclick="logOutCancel()">Cancel</button>
                <button onClick="deleteSureClick(${id})">Delete</button>
            </div>
        </div>
    `
}

function deleteSureClick(id) {
    const data = users.findIndex(item => item.id == id)
    users.splice(data, 1)
    elModalWrapper.classList.remove("open-modal")
    renderUsers(users, elTbody)
    window.localStorage.setItem("users", JSON.stringify(users))
}

// delete user end

// modal check start

elModalWrapper.addEventListener("click", (e) => {
    if (e.target.id == "modal-wrapper") {
        elModalWrapper.classList.remove("open-modal")
    }
})

// modal check end