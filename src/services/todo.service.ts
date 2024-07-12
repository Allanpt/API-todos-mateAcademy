import { PrismaClient } from '@prisma/client';

interface Todo {
  userId: number;
  completed: boolean;
  title: string;
}

interface UrlParams {
  userId?: string;
  completed?: string;
}

const prisma = new PrismaClient();

async function getTodos(urlParams: UrlParams) {
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

async function getTodoById(id: number) {
  return await prisma.todo.findUnique({
    where: { id },
  });
}

async function createTodo(body: Todo) {
  const { userId, completed, title } = body;

  if (userId === undefined || completed === undefined || title === undefined) {
    return null;
  }

  return await prisma.todo.create({ data: body });
}

async function updateTodo(body: Todo, id: number) {
  try {
    if (body.userId !== undefined) {
      return null;
    }

    return await prisma.todo.update({
      where: { id },
      data: { completed: body.completed },
    });
  } catch (error) {
    throw new Error(`Id DO NOT exist`);
  }
}

async function deleteTodo(id: number) {
  return await prisma.todo.delete({ where: { id } });
}

module.exports = {
  getTodos,
  createTodo,
  getTodoById,
  deleteTodo,
  updateTodo,
};
