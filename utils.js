import fs from "fs";
import chalk from "chalk";
import Table from "cli-table3";

const dataPath = "./data/todos.json"
const loadTodos = () => {
    if (!fs.existsSync("./data")) {
        fs.mkdirSync("./data");
    }
    if (!fs.existsSync(dataPath)) {
        fs.writeFileSync(dataPath, JSON.stringify([]));
    }
    const todoBuffer = fs.readFileSync(dataPath)
    let dataJSON = todoBuffer.toString()
    const todos = JSON.parse(dataJSON)
    return todos
}

// function to create new todo
export const createTodo = (title, todo) => {
    try {
        const todos = loadTodos()
        const duplicateTodo = todos.find((todo) => {
            return todo.title === title
        })

        if (!duplicateTodo) {
            todos.push({
                title: title,
                todo: todo,
            })
            let dataJSON = JSON.stringify(todos)
            fs.writeFileSync(dataPath, dataJSON)
            console.log(chalk.greenBright.inverse.bold("New todo added!"))
        } else {
            console.log(chalk.yellow.inverse.bold("Title has already been used!"))
        }
    } catch (error) {
        console.log(chalk.red.inverse.bold(`An error occured: ${error.message}`))
    }
}

// function to show all todos
export const listTodos = () => {
    try {
        const todos = loadTodos()
        if (!todos.length){
            console.log(chalk.red.inverse.bold(`Todos still empty!`))
        } else {
            const table = new Table({
                chars: {
                    'top': '-',
                    'top-mid': '+',
                    'top-left': '+',
                    'top-right': '+',
                    'bottom': '-',
                    'bottom-mid': '+',
                    'bottom-left': '+',
                    'bottom-right': '+',
                    'left': '|',
                    'left-mid': '+',
                    'mid': '-',
                    'mid-mid': '+',
                    'right': '|',
                    'right-mid': '+',
                    'middle': '|'
                },
                head: ["title", "todo"],
                colWidths: [30, 50],
            })

            todos.forEach(todo => {
                table.push([todo.title, todo.todo])
            })

            console.log(table.toString())
        }
    } catch (error) {
        console.log(chalk.red.inverse.bold(`An error occured: ${error.message}`))
    }
}

// function to show single todo
export const getOneTodo = (title) => {
    try {
        const todos = loadTodos()
        console.log("Todos array :", todos);
        console.log("searching for a title", title, "...")
        const Todo = todos.find((item) => {
            item.title === title
            return title
        })

        if (Todo) {
            console.log("found todo", Todo)
        } else {
            console.log(chalk.red.inverse.bold(`Todo with title ${title} not found!`))
        }
        // console.log(Todo)
    } catch (error) {
        console.log(`An error occured: ${error}`)
    }
}

// function to delete single todo
export const deleteTodo = (title) => {
    try {
        const todos = loadTodos()

        // Use 'item.title !== title' to correctly filter out the item with the matching title
        const remain = todos.filter((item) => {
            return item.title !== title
        })

        let dataJSON = JSON.stringify(remain)
        fs.writeFileSync(dataPath, dataJSON)

        if (remain.length === todos.length) {
            console.log(chalk.red.inverse.bold(`${title} doesn't exist!`))
        } else {
            console.log(chalk.green.inverse.bold(`Todo with title ${title} deleted successfully!`))
        }
    } catch (error) {
        console.log(chalk.red.inverse.bold(`An error occurred: ${error.message}`))
    }
}

// function to reset all todos
export const resetTodos = () => {
    try {
        const todos = loadTodos()

        if(!todos.length) {
            console.log(chalk.red.inverse.bold("Todos still empty!"))
        } else {
            fs.writeFileSync(dataPath, JSON.stringify([]))
            console.log(chalk.greenBright.inverse.bold("All todos have been reset!"))
        }
    } catch (error) {
        console.log(chalk.red.inverse.bold(`An error occured: ${error}`))
    }
}