//Globals
const todoList = document.getElementById('todo-list');
let todos = [];
let users = [];
//Attach event
document.addEventListener('DOMContentLoaded', initApp);
//Basic logic
function getUserName(userId) {
  console.log(users);
  const user = users.find((u) => u.id === userId);
  return user.name;
}

function printTodo(id, userId, title, complete) {
  const li = document.createElement('li');
  li.className = 'todo-item';
  li.dataset.id = id;
  li.innerHTML = `<span>${title}  <i>by</i> <b>${getUserName(
    userId
  )}</b></span>`;
  todoList.prepend(li);
}
//Event Logic
function initApp() {
  Promise.all([getAllTodos(), getAllUsers()]).then((values) => {
    [todos, users] = values;
    // console.log(todos);
    // console.log(users);
    //отправить в разметку
    todos.forEach((todo) => printTodo(todo));
  });
}
//Async logic
async function getAllTodos() {
  const response = await fetch('https://jsonplaceholder.typicode.com/todos');
  const data = await response.json();
  return data;
}
async function getAllUsers() {
  const response = await fetch('https://jsonplaceholder.typicode.com/users');
  const data = await response.json();
  return data;
}
