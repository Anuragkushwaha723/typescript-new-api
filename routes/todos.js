"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
let todos = [];
const router = (0, express_1.Router)();
router.get('/', (req, res, next) => {
    res.status(201).json({ todos: todos });
});
router.post('/todo', (req, res, next) => {
    const newTodo = {
        id: new Date().toISOString(),
        text: req.body.text
    };
    todos.push(newTodo);
    res.status(201).json({ todos: newTodo });
});
router.post('/todoDelete', (req, res, next) => {
    const todoId = req.body.id;
    const findTodoIndex = todos.findIndex(ele => {
        return todoId === ele.id;
    });
    const updatedTodos = [];
    if (findTodoIndex != -1) {
        for (var i = 0; i < todos.length; i++) {
            if (i === findTodoIndex) {
                continue;
            }
            else {
                updatedTodos.push(todos[i]);
            }
        }
        todos = [...updatedTodos];
        return res.status(201).json({ todos: todos });
    }
    else {
        return res.status(404).json({ message: 'This id is not exist' });
    }
});
router.post('/todoEdit', (req, res, next) => {
    const todoId = req.body.id;
    const todoText = req.body.text;
    const newTodo = {
        id: todoId,
        text: todoText
    };
    const findTodoIndex = todos.findIndex(ele => {
        return todoId === ele.id;
    });
    const updatedTodos = [];
    if (findTodoIndex != -1) {
        for (var i = 0; i < todos.length; i++) {
            if (i === findTodoIndex) {
                updatedTodos.push(newTodo);
            }
            else {
                updatedTodos.push(todos[i]);
            }
        }
        todos = [...updatedTodos];
        return res.status(201).json({ todos: todos });
    }
    else {
        return res.status(404).json({ message: 'This id is not exist' });
    }
});
exports.default = router;
