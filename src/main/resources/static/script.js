document.getElementById('taskForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;

    fetch('/api/task', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description, status: 'pending' }),
    })
        .then(response => response.json())
        .then(task => {
            addTaskToDOM(task);
            document.getElementById('taskForm').reset();
        })
        .catch(error => console.error('Error:', error));
});

function filterTasks() {
    const searchTerm = document.getElementById('searchBox').value.toLowerCase();
    console.log("Search Term:", searchTerm);

    fetch('/api/task')
        .then(response => response.json())
        .then(tasks => {
            console.log("Tasks:", tasks);
            const filteredTasks = tasks.filter(task =>
                task.title.toLowerCase().includes(searchTerm) ||
                task.description.toLowerCase().includes(searchTerm));
            console.log("Filtered Tasks:", filteredTasks);

            document.getElementById('tasks').innerHTML = '';
            filteredTasks.forEach(addTaskToDOM);
        })
        .catch(error => console.error('Error:', error));
}

function addTaskToDOM(task) {
    const div = document.createElement('div');
    div.className = 'task';
    div.innerHTML = `Title: ${task.title}, Description: ${task.description}`;

    const updateButton = document.createElement('button');
    updateButton.innerText = 'Mark as Completed';
    updateButton.onclick = () => updateTask(task.id, 'completed');

    const deleteButton = document.createElement('button');
    deleteButton.innerText = 'Delete';
    deleteButton.onclick = () => deleteTask(task.id);

    div.appendChild(updateButton);
    div.appendChild(deleteButton);

    document.getElementById('tasks').appendChild(div);
}

function updateTask(id, newStatus) {
    fetch(`/api/task/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
    })
        .then(response => {
            if (response.ok) {
                fetchTasks(); // Atualiza a lista de tarefas
            }
        });
}

function deleteTask(id) {
    fetch(`/api/task/${id}`, { method: 'DELETE' })
        .then(response => {
            if (response.ok) {
                fetchTasks(); // Atualiza a lista de tarefas
            }
        });
}
function fetchTasks() {
    fetch('/api/task')
        .then(response => response.json())
        .then(tasks => {
            document.getElementById('tasks').innerHTML = '';
            tasks.forEach(addTaskToDOM);
        })
        .catch(error => console.error('Error:', error));
}
fetchTasks();
