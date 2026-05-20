const list = document.getElementById('todo-list')
const itemCountSpan = document.getElementById('item-count')
const uncheckedCountSpan = document.getElementById('unchecked-count')
// Завдання 3: Функція для збереження списку справ у Local Storage
function saveToLocalStorage() {
  localStorage.setItem('todos', JSON.stringify(todos));
}
// Завдання 3: Функція для завантаження списку справ з Local Storage
function loadFromLocalStorage() {
  const saved = localStorage.getItem('todos');
  if (saved) {
    return JSON.parse(saved);
  } else {
    return [
      { id: 1, text: 'Вивчити HTML', checked: true },
      { id: 2, text: 'Вивчити CSS', checked: true },
      { id: 3, text: 'Вивчити JavaScript', checked: false }
    ];
  }
}

// Крок 2: Визначення структури збереження справ у пам'яті (масив об'єктів) [cite: 27, 28]
let todos = loadFromLocalStorage();

// Крок 3: Функція newTodo для введення нового завдання [cite: 29, 30]
function newTodo() {
  const text = prompt('Введіть нове завдання:');
  
  if (!text || text.trim() === '') return;

  const todo = {
    id: Date.now(), 
    text: text.trim(),
    checked: false
  };

  todos.push(todo);
  console.log('Дані успішно збережено. Поточний масив справ:', todos);

  saveToLocalStorage();
  render();
  updateCounter();
}

// Крок 4: Функція renderTodo, що приймає одну справу і створює рядок із елементом <li> [cite: 31, 32]
function renderTodo(todo) {
  return `
    <li class="list-group-item">
      <input type="checkbox" class="form-check-input me-2" id="todo-${todo.id}" ${todo.checked ? 'checked' : ''} onChange="checkTodo(${todo.id})" />
      <label for="todo-${todo.id}">
        <span class="${todo.checked ? 'text-success text-decoration-line-through' : ''}">${todo.text}</span>
      </label>
      <button class="btn btn-danger btn-sm float-end" onClick="deleteTodo(${todo.id})">delete</button>
    </li>
  `;
}

// Крок 5: Функція render, що приймає масив todos та перетворює його на масив HTML-рядків [cite: 33, 34]
function render() {
  const htmlStrings = todos.map(todo => renderTodo(todo));
  list.innerHTML = htmlStrings.join('');
}

// Крок 6: Функція updateCounter, що буде оновлювати значення лічильників [cite: 35, 36]
function updateCounter() {
  const total = todos.length; 
  const unchecked = todos.filter(todo => !todo.checked).length;

  itemCountSpan.textContent = total;
  uncheckedCountSpan.textContent = unchecked;
}

// Крок 7: Функція deleteTodo, що видаляє відповідний елемент з масиву todos [cite: 37]
function deleteTodo(id) {
  todos = todos.filter(todo => todo.id !== id);
  saveToLocalStorage(); 
  render();             
  updateCounter();      
}

// Крок 8: Функція checkTodo, що відмічає відповідний елемент з масиву todos [cite: 38]
function checkTodo(id) {
  todos = todos.map(todo => {
    if (todo.id === id) {
      return { ...todo, checked: !todo.checked };
    }
    return todo;
  });
  saveToLocalStorage(); 
  render();             
  updateCounter();      
}

render();
updateCounter();
