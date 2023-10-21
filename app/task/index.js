import { checkHasUserId } from '../utils/validators.js';

const tasks = [
  {
    id: '1',
    owner: '1',
    isDone: false,
    title: 'Hello world',
    description: 'Task description'
  },
  {
    id: '2',
    owner: '1',
    isDone: true,
    title: 'Hello world 2',
    description: 'Task description 2'
  },
  {
    id: '3',
    owner: '2',
    isDone: false,
    title: 'Hello world 2',
    description: 'Task description 2'
  }
];

const getOwnerTasks = (owner) => {
  checkHasUserId(owner);
  return tasks.filter(task => task.owner === owner);
};

const getTaskById = (owner, id) => {
  checkHasUserId(owner);
  return getOwnerTasks(owner).find(task => task.id === id);
};

const getTasks = (owner) => {
  checkHasUserId(owner);
  return getOwnerTasks(owner);
};

const getDoneTasks = (owner) => {
  checkHasUserId(owner);
  return getOwnerTasks(owner).filter(task => task.isDone);
};

const getNotDoneTasks = (owner) => {
  checkHasUserId(owner);
  return getOwnerTasks(owner).filter(task => !task.isDone);
};

const incrementId = () => String(+tasks[tasks.length - 1].id + 1);

const createTask = (owner, { title, description }) => {
  checkHasUserId(owner);
  const task = {
    id: incrementId(),
    owner,
    isDone: false,
    title,
    description
  };
  tasks.push(task);
  return task;
};

const updateTask = (owner, {
  id, title, description, isDone
}) => {
  checkHasUserId(owner);
  const index = getOwnerTasks(owner).findIndex(task => task.id === id);
  if (title) {
    tasks[index].title = title;
  }
  if (description) {
    tasks[index].description = description;
  }
  if (isDone !== undefined) {
    tasks[index].isDone = isDone;
  }
};

const deleteTask = (owner, { id }) => {
  checkHasUserId(owner);
  const task = getTaskById(owner, id);
  tasks.splice(tasks.indexOf(task), 1);
  return task;
};

export {
  getTaskById, getTasks, getDoneTasks, getNotDoneTasks, createTask, updateTask, deleteTask
};
