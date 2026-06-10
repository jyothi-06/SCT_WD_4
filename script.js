const addTaskBtn = document.getElementById("addTaskBtn");
const taskInput = document.getElementById("taskInput");
const taskDate = document.getElementById("taskDate");
const taskTime = document.getElementById("taskTime");
const taskList = document.getElementById("taskList");

// Convert 24-hour time to AM/PM format
function formatTime(time){

    if(!time){
        return "No Time";
    }

    let [hours, minutes] = time.split(":");

    hours = parseInt(hours);

    let ampm = hours >= 12 ? "PM" : "AM";

    hours = hours % 12;

    if(hours === 0){
        hours = 12;
    }

    return `${hours}:${minutes} ${ampm}`;
}

addTaskBtn.addEventListener("click", addTask);

function addTask(){

    const taskText = taskInput.value.trim();
    const date = taskDate.value;
    const time = taskTime.value;

    if(taskText === ""){
        alert("Please enter a task!");
        return;
    }

    const task = document.createElement("div");
    task.classList.add("task");

    task.innerHTML = `
        <div class="task-info">
            <div class="task-text">${taskText}</div>
            <div class="task-date">📅 ${date || "No Date"}</div>
            <div class="task-time">🕒 ${formatTime(time)}</div>
        </div>

        <div class="task-buttons">
            <button class="complete-btn">✓</button>
            <button class="edit-btn">Edit</button>
            <button class="delete-btn">Delete</button>
        </div>
    `;

    taskList.appendChild(task);

    taskInput.value = "";
    taskDate.value = "";
    taskTime.value = "";

    const completeBtn = task.querySelector(".complete-btn");
    const editBtn = task.querySelector(".edit-btn");
    const deleteBtn = task.querySelector(".delete-btn");

    // Complete Task
    completeBtn.addEventListener("click", function(){

        task.classList.toggle("completed");

    });

    // Edit Task, Date & Time
    editBtn.addEventListener("click", function(){

        const taskTextElement = task.querySelector(".task-text");
        const taskDateElement = task.querySelector(".task-date");
        const taskTimeElement = task.querySelector(".task-time");

        const currentTask =
            taskTextElement.textContent;

        const currentDate =
            taskDateElement.textContent.replace("📅 ", "");

        const currentTime =
            prompt("Edit Time (HH:MM format)", "");

        const updatedTask =
            prompt("Edit Task Name:", currentTask);

        if(updatedTask === null) return;

        const updatedDate =
            prompt("Edit Date (YYYY-MM-DD):", currentDate);

        if(updatedDate === null) return;

        if(currentTime === null) return;

        taskTextElement.textContent = updatedTask;
        taskDateElement.textContent = "📅 " + updatedDate;
        taskTimeElement.textContent =
            "🕒 " + formatTime(currentTime);

    });

    // Delete Task
    deleteBtn.addEventListener("click", function(){

        task.remove();

    });

}