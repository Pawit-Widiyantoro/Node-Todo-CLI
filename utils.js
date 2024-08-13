import fs from "fs";

// function to create new todo
export const createTodo = (title, todo) => {
    try {
        fs.access('todos.json', (err) => {
            if (err) {
                fs.writeFileSync('todos.json', JSON.stringify([]))
            }
            const todoBuffer = fs.readFileSync("todos.json")
            let dataJSON = todoBuffer.toString()
            const todos = JSON.parse(dataJSON)

            const duplicateTodo = todos.find((todo) => {
                return todo.title === title
            })

            if (!duplicateTodo) {
                todos.push({
                    title: title,
                    todo: todo,
                })
                dataJSON = JSON.stringify(todos)
                fs.writeFileSync("todos.json", dataJSON)
                console.log("New todo added!")
            } else {
                console.log("Title has already been used!")
            }
        })
    } catch (error) {
        console.log(`An error occured: ${error}`)
    }
}

// function to show all todos
export const listTodos = () => {
    try {
        const todoBuffer = fs.readFileSync("todos.json")
        let dataJSON = todoBuffer.toString()
        const todos = JSON.parse(dataJSON)

        if (!todos.length){
            console.log("Todo list still empty!")
        } else {
            console.log(todos)
        }
    } catch (error) {
        console.log(`An error occured: ${error}`)
    }
}

// function to show single todo
export const getOneTodo = (title) => {
    try {
        const todoBuffer = fs.readFileSync("todos.json");
        let dataJSON = todoBuffer.toString();
        const todos = JSON.parse(dataJSON);

        console.log("Todos array :", todos);
        console.log("searching for a title", title, "...")
        
        const Todo = todos.find((item) => {
            item.title === title
            return title
        })

        if (Todo) {
            console.log("found todo", Todo)
        } else {
            console.log(`Todo with title ${title} not found!`)
        }
        // console.log(Todo)
    } catch (error) {
        console.log(`An error occured: ${error}`)
    }
}

// function to delete single todo
export const deleteTodo = (title) => {
    try {
        const todoBuffer = fs.readFileSync("todos.json")
        let dataJSON = todoBuffer.toString()
        const todos = JSON.parse(dataJSON)

        const remain = todos.filter((item) => {
            todos.title !== title
        })

        dataJSON = JSON.stringify(remain)
        fs.writeFileSync("todos.json", dataJSON)

        if (remain.length === todos.length) {
            console.log("This file doesnt exist!")
        } else {
            console.log(`Todo with title ${title} deleted successfully!`)
        }
    } catch (error) {
        console.log(`An error occured ${error}`)
    }
}

// function to reset all todos
export const resetTodos = () => {
    try {
        const todoBuffer = fs.readFileSync("todos.json")
        let dataJSON = todoBuffer.toString()
        const todos = JSON.parse(dataJSON)

        if(!todos.length) {
            console.log("Todos still empty!")
        } else {
            fs.writeFileSync("todos.json", JSON.stringify([]))
            console.log("All todos have been reset!")
        }
    } catch (error) {
        console.log(`An error occured: ${error}`)
    }
}