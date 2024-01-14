document.getElementById('taskForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;

    fetch('/api/tasks', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title: title, description: description, status: 'pending' }),
    })
        .then(response => response.json())
        .then(task => {
            addTaskToDOM(task);
            document.getElementById('taskForm').reset();
        })
        .catch(error => console.error('Error:', error));
});

function addTaskToDOM(task) {
    const div = document.createElement('div');
    div.innerHTML = `Title: ${task.title}, Description: ${task.description}`;

    const updateButton = document.createElement('button');
    updateButton.innerText = 'Update Status';
    updateButton.onclick = () => updateTask(task.id);

    const deleteButton = document.createElement('button');
    deleteButton.innerText = 'Delete';
    deleteButton.onclick = () => deleteTask(task.id);

    div.appendChild(updateButton);
    div.appendChild(deleteButton);

    document.getElementById('tasks').appendChild(div);
}

function updateTask(id) {
    fetch(`/api/tasks/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: 'completed' }), // Example: updating status to completed
    })
        .then(response => {
            if (response.ok) {
                // Refresh tasks or update the DOM as needed
            }
        });
}

function deleteTask(id) {
    fetch(`/api/tasks/${id}`, {
        method: 'DELETE'
    })
        .then(response => {
            if (response.ok) {
                // Remove task from DOM or refresh tasks
            }
        });
}

// Function to fetch and display tasks
function fetchTasks() {
    fetch('/api/tasks')
        .then(response => response.json())
        .then(tasks => {
            tasks.forEach(task => {
                addTaskToDOM(task);
            });
        })
        .catch(error => console.error('Error:', error));
}

// Initial fetch of tasks
fetchTasks();