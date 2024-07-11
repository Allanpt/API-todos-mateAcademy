"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function getTodos(urlParams) {
    const { userId, completed } = urlParams;
    const queries = Object.entries(urlParams);
    if (!urlParams || queries.every(el => el[1] === 'undefined')) {
        return await prisma.todo.findMany();
    }
    return await prisma.todo.findMany({
        where: {
            userId: userId ? Number(userId) : undefined,
            completed: completed ? completed === 'true' : undefined,
        },
    });
}
async function getTodoById(id) {
    return await prisma.todo.findUnique({
        where: { id },
    });
}
async function createTodo(body) {
    const { userId, completed, title } = body;
    if (userId === undefined || completed === undefined || title === undefined) {
        return null;
    }
    return await prisma.todo.create({ data: body });
}
async function updateTodo(body, id) {
    try {
        if (body.title !== undefined || body.userId !== undefined) {
            return null;
        }
        return await prisma.todo.update({
            where: { id },
            data: { completed: body.completed },
        });
    }
    catch (error) {
        throw new Error(`Id DO NOT exist`);
    }
}
async function deleteTodo(id) {
    return await prisma.todo.delete({ where: { id } });
}
module.exports = {
    getTodos,
    createTodo,
    getTodoById,
    deleteTodo,
    updateTodo,
};
