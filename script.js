// TaskFlow - Team Task Management System

let tasks = [
    {
        id: 1,
        title: "Sample Task",
        description: "This is what a task looks like",
        dueDate: "2025-10-15",
        assignedTo: "Alberto",
        completed: false
    }
];

// Render all tasks
function renderTasks() {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';

    tasks.forEach(task => {
        const taskItem = document.createElement('div');

        const today = new Date().toISOString().split('T')[0];
        const overdue = task.dueDate < today && !task.completed;

        taskItem.className = `card task-item mb-3 ${overdue ? 'border-danger' : ''}`;

        taskItem.innerHTML = `
            <div class="card-body ${overdue ? 'bg-danger-subtle' : ''}">
                <div class="d-flex justify-content-between align-items-start">

                    <div class="task-content">

                        <div class="task-title fw-bold">
                            ${task.title}
                        </div>

                        <div class="task-description">
                            ${task.description}
                        </div>

                        <div class="task-date">
                            Due: ${task.dueDate}
                        </div>

                        <div class="task-date">
                            Assigned to: ${task.assignedTo}
                        </div>

                        ${
                            overdue
                            ? `<div class="text-danger fw-bold mt-2">
                                OVERDUE
                               </div>`
                            : ''
                        }

                        ${
                            task.completed
                            ? `<div class="text-success fw-bold mt-2">
                                COMPLETED
                               </div>`
                            : ''
                        }

                    </div>

                    <div class="task-actions">

                        ${
                            !task.completed
                            ? `<button
                                class="btn btn-success btn-sm"
                                onclick="completeTask(${task.id})">
                                Complete
                               </button>`
                            : ''
                        }

                    </div>

                </div>
            </div>
        `;

        taskList.appendChild(taskItem);
    });
}


// Add a new task
function addTask(event) {
    event.preventDefault();

    const title = document.getElementById('taskTitle').value;
    const description = document.getElementById('taskDescription').value;
    const dueDate = document.getElementById('dueDate').value;
    const assignedTo = document.getElementById('assignedTo').value;

    const newTask = {
        id: Date.now(),
        title: title,
        description: description,
        dueDate: dueDate,
        assignedTo: assignedTo,
        completed: false
    };

    tasks.push(newTask);

    document.getElementById('taskForm').reset();

    renderTasks();
}


// Mark task as complete
function completeTask(id) {
    const task = tasks.find(task => task.id === id);

    if (task) {
        task.completed = true;
        renderTasks();
    }
}


// Initialize application
document.addEventListener('DOMContentLoaded', function() {

    renderTasks();

    const taskForm = document.getElementById('taskForm');

    taskForm.addEventListener('submit', addTask);

});