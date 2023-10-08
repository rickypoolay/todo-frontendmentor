'use strict';

//Counter Variables
let taskCounter = 0;

//DOM Elements
const body = document.querySelector('body');
const inputField = document.querySelector('.input');
const tasksContainer = document.querySelector('.tasks-container ul');
const themeSwitchIMG = document.querySelector('.theme-switch');
const taskSpan = document.querySelector('.task-counter span');
const btnClearCompleted = document.querySelector('.clear-completed');
const btnFilters = document.querySelectorAll('.filter-btn');

let inputValue;
let label;
let check;

//Cache Memory

//Local Storage Theme
const theme = localStorage.getItem('theme');

if(theme) {
    body.classList.add(theme);
    if (theme == 'light') {
        themeSwitchIMG.src = 'images/icon-moon.svg';
    } else {
        themeSwitchIMG.src = 'images/icon-sun.svg';
        localStorage.setItem('theme', 'dark');
    }
} else {
    body.classList.add('dark');
}

//          Functions

//Switch Theme
const themeSwitch = function () {

    if(!body.classList.contains('light')) {
        //TO LIGHT
        body.classList.replace('dark', 'light');
        localStorage.setItem('theme','light');
        themeSwitchIMG.src = 'images/icon-moon.svg'
    } else {
        //TO DARK
        body.classList.replace('light', 'dark');
        localStorage.setItem('theme','dark');
        themeSwitchIMG.src = 'images/icon-sun.svg'
    }
}

//Task is created

const createTask = function (e) {
    //Grab the input value of User
    inputValue = inputField.value;
    
    if(inputValue.trim().length >= 1 && e.key === 'Enter' || e.key === 'enter') {
        taskCounter = document.querySelectorAll('.not-completed').length + 1;
        //Creating Task Container
        const createTodoDiv = document.createElement("li");
        createTodoDiv.classList.add('task-style','task', `task${taskCounter}`, 'not-completed');
        tasksContainer.appendChild(createTodoDiv);

        //Creating CheckBox
        const createCheckBox = document.createElement("input");
        createCheckBox.type = 'checkbox';
        createCheckBox.classList.add(`check${taskCounter}`)
        createTodoDiv.appendChild(createCheckBox);

        //Todo Name/Label
        const createLabel = document.createElement("label");
        createLabel.innerText = inputValue;
        createLabel.classList.add(`label${taskCounter}`);
        createTodoDiv.appendChild(createLabel);

        //Create X img
        const createDeleteImg = document.createElement('img');
        createDeleteImg.src = './images/icon-cross.svg';
        createDeleteImg.classList.add('cross-style', `cross${taskCounter}`);
        createTodoDiv.appendChild(createDeleteImg);
        
        //Add Eventlistener to Created Task for completion or deletion
        createLabel.addEventListener('click', function () {
            if(createTodoDiv.classList.contains('not-completed')) {
                createLabel.style.textDecoration = 'line-through';
                createCheckBox.checked = true;
                createTodoDiv.classList.replace('not-completed', 'completed');
                taskCounter--;
                taskSpan.innerHTML = taskCounter;
            } else{
                createLabel.style.textDecoration = 'none';
                createCheckBox.checked = false;
                createTodoDiv.classList.replace ('completed', 'not-completed');
                taskCounter++;
                taskSpan.innerHTML = taskCounter;
                }
            }
        );

        createDeleteImg.addEventListener('click', function () {
            if(!createTodoDiv.classList.contains('completed')) {
            tasksContainer.removeChild(createTodoDiv);
            taskCounter--;
            taskSpan.innerHTML = taskCounter;
            } else {
            tasksContainer.removeChild(createTodoDiv);
            }
        });

        //Empty the Input Value of user
        inputField.value = ''; 

        //Set Items left
        taskSpan.innerHTML = taskCounter;
    }
}

//Clear Completed Tasks

const clearCompleted = function () {
    const listItems = document.querySelectorAll('.task');
    
    for(let i = 0; i < listItems.length; i++) {
        if(listItems[i].classList.contains('completed')) {
            tasksContainer.removeChild(listItems[i]);
        };
    }
}

//Filter Tasks

const taskFilter = function () {
    const listItems = document.querySelectorAll('.task');
    const btnAll = btnFilters[0]; 
    const btnActive = btnFilters[1]; 
    const btnCompleted = btnFilters[2]; 
    
    //If Active is selected
    if(this.innerText.includes("Active")) {
        btnAll.classList.remove('filter-select');
        btnActive.classList.add('filter-select');
        btnCompleted.classList.remove('filter-select');

        for(let i = 0; i < listItems.length; i++) {
            if(listItems[i].classList.contains('completed')) {
                listItems[i].style.display = 'none';
            } else {
                listItems[i].style.display = 'flex';
            };
        };


    //If Completed Is Selected
    } else if (this.innerText.includes("Completed")) {
        btnAll.classList.remove('filter-select');
        btnActive.classList.remove('filter-select');
        btnCompleted.classList.add('filter-select');

        for(let i = 0; i < listItems.length; i++) {
            if(!listItems[i].classList.contains('completed')) {
                listItems[i].style.display = 'none';
            } else {
                listItems[i].style.display = 'flex';
            };
        }


    //If All is selected
    } else if (this.innerText.includes('All')) {
        btnAll.classList.add('filter-select');
        btnActive.classList.remove('filter-select');
        btnCompleted.classList.remove('filter-select');

        for(let i = 0; i < listItems.length; i++) {
        listItems[i].style.display = 'flex';
        }
    }
}

//Adding Event Listeners

for(let i = 0; i < 3; i++){btnFilters[i].addEventListener('click', taskFilter);};
btnClearCompleted.addEventListener('click', clearCompleted);
themeSwitchIMG.addEventListener('click', themeSwitch);
inputField.addEventListener('keyup', createTask);