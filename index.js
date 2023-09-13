// Load tasks from Local Storage
function loadTasksFromLocalStorage() {
    var storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
        document.querySelector('#tasks').innerHTML = storedTasks;
    }
}

// Save tasks to Local Storage
function saveTasksToLocalStorage() {
    var tasksHTML = document.querySelector('#tasks').innerHTML;
    localStorage.setItem('tasks', tasksHTML);
}

// Display Local Storage Data in Console
function displayLocalStorageData() {
    var localStorageData = localStorage.getItem('tasks');
    
    if (localStorageData) {
        var parsedData = document.createElement('div');
        parsedData.innerHTML = localStorageData;
        console.log(JSON.stringify(parsedData, null, 2));
    }
}

document.querySelector('#push').onclick = function(){
    if(document.querySelector('#newtask input').value.length == 0){
        alert("Kindly Enter Task Name!!!!")
    }

    else{
        var selectedCategory = document.querySelector('#categoryInput').value;
        document.querySelector('#tasks').innerHTML += `
            <div class="task" data-category="${selectedCategory}">
                <div style="display:flex ; align-items:center ; gap:10px; ">
                    <input type="checkbox" class="mark">
                    <span class="taskname">
                        ${document.querySelector('#newtask input').value}
                    </span>
                </div>


                <div style="display:flex ; gap:10px; ">
                    <button class="edit">
                        <span class="iconify" data-icon="line-md:edit-twotone"></span>
                    </button>

                    <button class="delete">
                        <span class="iconify" data-icon="line-md:remove"></span>
                    </button>
                </div>
                
                
            </div>
        `;

        
        document.querySelector("#newtask input").value="";
        
    }
    saveTasksToLocalStorage();
    displayLocalStorageData();
    
};


document.querySelector('#tasks').addEventListener('click', function(event) {
    if (event.target.classList.contains('delete')) {
        event.target.closest('.task').remove();
        
    } else if (event.target.classList.contains('edit')) {
        var taskSpan = event.target.closest('.task').querySelector(".taskname");
        var currentTaskName = taskSpan.textContent;
        var newTaskName = prompt("Edit task:", currentTaskName);
        if (newTaskName !== null && newTaskName !== "") {
            taskSpan.textContent = newTaskName;
        }
        
    }
    saveTasksToLocalStorage();
    displayLocalStorageData();
});



document.querySelector('#searchInput').addEventListener('input', function() {
    var searchValue = this.value.toLowerCase();
    var taskElements = document.querySelectorAll('.task');

    taskElements.forEach(function(taskElement) {
        var taskName = taskElement.querySelector('.taskname').textContent.toLowerCase();
        if (taskName.includes(searchValue)) {
            taskElement.style.display = '';
        } else {
            taskElement.style.display = 'none';
        }
    });
    
});





document.querySelectorAll('.mark').forEach(function(markCheckbox) {
    markCheckbox.addEventListener('change', function() {
        var taskName = this.nextElementSibling.textContent;
        var taskSpan = this.nextElementSibling;
        
        if (this.checked) {
            taskSpan.style.textDecoration = 'line-through';
        } else {
            taskSpan.style.textDecoration = 'none';
        }
        
    });
});






var sortOrder = 1; // 1 for ascending, -1 for descending

// Sort function
document.querySelector('#sortButton').addEventListener('click', function() {
    var taskElements = document.querySelectorAll('.task');
    
    Array.from(taskElements).sort(function(taskA, taskB) {
        var taskNameA = taskA.querySelector('.taskname').textContent.toLowerCase();
        var taskNameB = taskB.querySelector('.taskname').textContent.toLowerCase();

        if (sortOrder === 1) {
            if (taskNameA < taskNameB) {
                return -1;
            } else if (taskNameA > taskNameB) {
                return 1;
            } else {
                return 0;
            }
        } else {
            if (taskNameA < taskNameB) {
                return 1;
            } else if (taskNameA > taskNameB) {
                return -1;
            } else {
                return 0;
            }
        }
    }).forEach(function(taskElement) {
        document.querySelector('#tasks').appendChild(taskElement);
    });

    sortOrder *= -1; // Toggle sorting order

    saveTasksToLocalStorage();
    displayLocalStorageData();
    
});





document.querySelector('#categoryFilter').addEventListener('change', function() {
    var selectedCategory = this.value;

    var taskElements = document.querySelectorAll('.task');

    taskElements.forEach(function(taskElement) {
        var taskCategory = taskElement.getAttribute('data-category');

        if (selectedCategory === 'all' || taskCategory === selectedCategory) {
            taskElement.style.display = '';
        } else {
            taskElement.style.display = 'none';
        }
    });
    saveTasksToLocalStorage();
    displayLocalStorageData();

});

window.addEventListener('DOMContentLoaded', function() {
    loadTasksFromLocalStorage();
    displayLocalStorageData();
});
