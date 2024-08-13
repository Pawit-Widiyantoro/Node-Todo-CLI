import yargs from "yargs";
import {hideBin} from "yargs/helpers";
import {createTodo, deleteTodo, getOneTodo, listTodos, resetTodos} from "./utils.js";

yargs(hideBin(process.argv))
    .command({
        command:"add",
        describe:"Add new todo",
        builder: {
            title: {
                describe:"Todo title",
                type:"string",
                demandOption:true,
            },
            todo: {
                describe:"Todo Body",
                type:"string",
                demandOption:true,
            },
        },
        handler(argv){
            createTodo(argv.title, argv.todo)
            console.log(`Success add new todo!`)
        }
    })
    .command({
        command: "list",
        describe: "List all todos",
        handler(argv){
            console.log("Showing all todos...")
            setTimeout(listTodos, 2000)
        }
    })
    .command({
        command: "get",
        describe: "Get a specific todo",
        builder: {
            title: {
                describe: "Todo title",
                type: "string",
                demandOption: true,
            },
        },
        handler(argv){
            getOneTodo(argv.title);
        },
    })
    .command({
        command: "delete",
        describe: "Delete specific todo",
        builder: {
            title: {
                describe: "Todo title",
                type: "string",
                demandOption: true,
            },
        },
        handler(argv){
            deleteTodo(argv.title);
        }
    })
    .command({
        command: "reset",
        describe: "Reset all todos",
        handler(){
            resetTodos()
        }
    })
    .parse();