let back_btn = document.querySelector(".back_btn button")
let add_todo = document.querySelector(".add_todo")
let content = document.querySelector(".content")
let todos = JSON.parse(localStorage.getItem("todo"))
let input_title = document.querySelector("input.input_title")
let input_note = document.querySelector("textarea.input_note")


back_btn.addEventListener("click", () => {
    let add_page = document.querySelector(".main_add_container")
    add_page.style.right = "-100vw"
    todos = JSON.parse(localStorage.getItem("todo"))

    if (input_title.value == '' || input_note.value == "") {
        return
    }


    let active_todo = JSON.parse(localStorage.getItem("active_todo"))
    if (active_todo == null) {

        let new_todos = todos
        let todo_id = todos == null ? 1 : todos.length + 1
        if (todos == null) {
            localStorage.setItem("todo", JSON.stringify([{ "title": input_title.value, "note": input_note.value, "id": todo_id }]))

        } else {
            new_todos.push({ "title": input_title.value, "note": input_note.value, "id": todo_id })
            localStorage.setItem("todo", JSON.stringify(new_todos))
        }

        update_todo()

        input_note.value = ""
        input_title.value = ""
    }
    else {

        if (active_todo.title !== input_title.value || active_todo.note !== input_note.value) {
            localStorage.setItem("todo", JSON.stringify(todos.map((t) => (t.id == active_todo.id) ? { ...t, title: input_title.value, note: input_note.value } : t)))
            update_todo()
            // console.log("somthing chnage");
            
        }
    }

})

add_todo.addEventListener("click", () => {
    localStorage.removeItem("active_todo")
    input_note.value = ""
    input_title.value = ""
    let add_page = document.querySelector(".main_add_container")
    add_page.style.right = "calc((100vw - min(700px , 100%))/2)"

})




let show_slider = (button) => {
    let add_page = document.querySelector(".main_add_container")
    add_page.style.right = "calc((100vw - min(700px , 100%))/2)"
    // // console.log(event.target.dataset.id);
    let todos = JSON.parse(localStorage.getItem("todo"))
    let id = button.getAttribute("data-id")
    let active_todo = todos.find((todo) => todo.id == id)

    input_title.value = active_todo.title
    input_note.value = active_todo.note

    localStorage.setItem("active_todo", JSON.stringify(active_todo))
}

let update_todo = () => {
    let todos = JSON.parse(localStorage.getItem("todo"))
    let content = document.querySelector(".content")
    content.innerHTML = ""
    // console.log(todos);

    todos.map((todo, index) => {
        let todo_html = `<button class="todo" data-id="${index}" onclick="show_slider(this)">
            <div class="title">${todo.title}</div>
            <div class="todo_content">${todo.note}</div>
            </button>`
        content.insertAdjacentHTML("afterbegin", todo_html)
    })

    update_localStorage()
}

let update_localStorage = () => {
    let todo_array = JSON.parse(localStorage.getItem("todo"))
    let new_todo_array = todo_array.map((todo, index) => {
        return { ...todo, id: index }
    })
    localStorage.setItem("todo", JSON.stringify(new_todo_array))
}


if (todos !== null) {
    if (todos.length !== 0) {
        update_todo()
    } else {
        content.innerHTML = "<div class='empty_todo'>Your Todo Is Empty</div>"
    }
} else {
    content.innerHTML = "<div class='empty_todo'>Your Todo Is Empty</div>"
}


let delete_todo = () => {
    let active_todo = JSON.parse(localStorage.getItem("active_todo"))
    let todos = JSON.parse(localStorage.getItem("todo"))
    let new_todos = todos.filter((todo) => todo.id !== active_todo.id)
    localStorage.setItem("todo", JSON.stringify(new_todos))
    console.log(new_todos);
    update_todo()

    if (JSON.parse(localStorage.getItem("todo")) == 0) {
        content.innerHTML = "<div class='empty_todo'>Your Todo Is Empty</div>"
    }

    let add_page = document.querySelector(".main_add_container")
    add_page.style.right = "-100vw"
}