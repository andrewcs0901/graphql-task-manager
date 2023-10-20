const tasks = [
  {
    id: '1',
    title: 'Hello world',
    description: 'Task description'
  },
  {
    id: '2',
    title: 'Hello world 2',
    description: 'Task description 2'
  }
];

const getTaskById = (id) => {
  return tasks.find(task => task.id === id);
};

const getTasks = () => {
  return tasks;
};

export { getTaskById, getTasks };
