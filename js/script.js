'use strict';
const todoControl = document.querySelector('.todo-control');
const headerInput = document.querySelector('.header-input');
const todoList = document.querySelector('.todo-list');
const todoCompleted = document.querySelector('.todo-completed');
const headerBtn = document.querySelector('.header-button');
const removeBtn = document.querySelector('.todo-remove');

let todoData = [];
let todoDataJson = JSON.stringify(todoData);

const todoDataToJson = () => {
    if (todoData.length > 0) {
        todoDataJson = JSON.stringify(todoData);
        localStorage.setItem('value', todoDataJson);
    } else if (todoData.length === 0) {
        localStorage.removeItem('value');
    }
};

const localStorageToJs = function () {
    let todoDataJs = [];
    if (localStorage.getItem('value') !== null) {
        todoDataJs = JSON.parse(localStorage.getItem('value'));
    }

    if (todoDataJs.length > 0) {
        todoData = todoDataJs;
    }
};
todoDataToJson();
localStorageToJs();

const render = function () {

    todoList.innerHTML = '';
    todoCompleted.innerHTML = '';
    todoData.forEach(function (item) {
        const li = document.createElement('li');

        li.classList.add('todo-item');

        li.innerHTML = '<span class="text-todo">' + item.text + '</span>' +
            '<div class = "todo-buttons">' +
            '<button class = "todo-remove"></button> ' +
            '<button class = "todo-complete"></button>' +
            '</div >';


        if (item.completed) {
            todoCompleted.append(li);
        } else {
            todoList.append(li);
        }

        li.querySelector('.todo-complete').addEventListener('click', function () {
            item.completed = !item.completed;
            render();
        });

        li.querySelector('.todo-remove').addEventListener('click', function () {
            li.remove();
            todoData.splice(item, 1);
            todoDataToJson();
            console.log(todoData);
        });
    });

    todoDataToJson();
    disabledHeaderBtn();
};
// const removeLi = function () {                               // эта функция делает тоже самое что и в 59 строке
//     const removeBtn = document.querySelectorAll('.todo-remove');

//     removeBtn.forEach((btn, i) => {
//         btn.addEventListener('click', () => {
//             btn.parentElement.parentElement.remove();
//             todoData.slice(i, 1);
//         });
//     });
// };

todoControl.addEventListener('submit', function (event) {
    event.preventDefault();

    const newTodo = {
        text: headerInput.value,
        completed: false
    };

    todoData.push(newTodo);
    headerInput.value = '';

    render();
});
const disabledHeaderBtn = function () {
    let inputValue = true;
    const disabledBtn = function () {
        if (inputValue === true) {
            headerBtn.setAttribute('disabled', 'disabled');
        } else if (inputValue === false) {
            headerBtn.removeAttribute('disabled');
        }
    };
    const chekHeaderInput = function () {
        if (headerInput.value === '') {
            inputValue = true;
        } else {
            inputValue = false;
        }
        disabledBtn();
    };
    chekHeaderInput();
    disabledBtn();
};
headerInput.addEventListener('input', disabledHeaderBtn);
disabledHeaderBtn();

if (todoData.length > 0) {
    render();
}