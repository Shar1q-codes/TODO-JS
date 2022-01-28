let ListButton = document.querySelector(".add_button");
let ListAddButton = document.querySelector("#add_list_button");
let ListBackButton = document.querySelector("#back_list_button");
let mainContainer = document.querySelector(".middle_container");
let taskArray = [];
let ListTextBox = document.querySelector("#add_new_textbox")
ListAddButton.addEventListener("click", addList);




function addList(e) {
	let taskTitle = ListTextBox.value;
	let taskObject = new Object();
	taskObject.id = Date.now();
	taskObject.title = taskTitle;
	taskObject.subtask = [];
	taskObject.completedTask = [];
	taskArray.push(taskObject);



	function deleteaddtask() {
		if (taskArray.length > 0) {
			let emptyListTextContainer = document.getElementById("list_container");
			emptyListTextContainer.style.display = "none";
		}
	}

	deleteaddtask();
	createListFunction(taskObject.id, taskObject.title)
	ListTextBox.value = "";

}




function deleteaddtask() {
	if (taskArray.length > 0) {
		let emptyListTextContainer = document.getElementById("list_container");
		emptyListTextContainer.style.display = "none";
	}
}




function createListFunction(taskObjectId, taskObjectTitle) {

	let div = document.createElement("div");
	div.classList.add("tab");

	let ul = document.createElement("ul");

	let tabHeading = document.createElement("li");
	tabHeading.classList.add("tab-heading");
	tabHeading.id = taskObjectId;
	let tabHeadingText = document.createTextNode(taskObjectTitle);
	tabHeading.appendChild(tabHeadingText);

	let hr = document.createElement("hr");
	hr.className = "tab-hr";

	let deleteList = document.createElement("li");
	deleteList.className = "delete-list-button";
	deleteList.id = taskObjectId;
	let deleteListImage = document.createElement("img");
	deleteListImage.src = "./images/icons8-delete-40.png";
	deleteList.appendChild(deleteListImage);

	let tabDesc = document.createElement("ul");
	tabDesc.className = "tab-desc";
	tabDesc.id = taskObjectId;


	ul.appendChild(tabHeading);
	ul.appendChild(hr);
	ul.appendChild(tabDesc);
	ul.appendChild(deleteList);
	div.appendChild(ul);
	let mainContainer = document.querySelector(".middle_container");
	mainContainer.appendChild(div);
}




mainContainer.addEventListener("click", deleteListFunction);

function deleteListFunction(e) {
	if (e.target.parentElement.classList.contains("delete-list-button")) {

		let deleteListId = e.target.parentElement.id;
		taskArray.forEach((item, index) => {
			if (item.id == deleteListId) {
				taskArray.splice(index, 1)
			}
		});

		mainContainer.innerHTML = `<div id="list_container">
                                    <h1 id="list_container_text">No lists in the Task-List</h1>
                                 </div>`;
		deleteaddtask();
		taskArray.forEach((item) => {
			createListFunction(item.id, item.title);
		});



		taskArray.forEach(function(item) {
			let htmlCode = "";
			for (let i = 0; i < item.subtask.length; i++) {
				if (item.completedTask.indexOf(String(item.subtask[i].id)) == "-1") {
					htmlCode += `<li class="isComplete" id="${item.subtask[i].id}">${item.subtask[i].subTaskItem}</li>`;
				} else {
					htmlCode += `<li class="isComplete completed" id="${item.subtask[i].id}">${item.subtask[i].subTaskItem}</li>`;
				}
			}

			let tabDesc = document.querySelectorAll(".tab-desc");
			tabDesc.forEach((element) => {
				if (element.id == item.id) {
					element.innerHTML = htmlCode;
				}
			});
		});


	}
}




ListButton.addEventListener("click", newListToggle);
ListBackButton.addEventListener("click", newListToggle);
ListAddButton.addEventListener("click", newListToggle);

function newListToggle() {
	let blur = document.querySelector(".shadow");
	blur.classList.toggle('active');
	let newListModalContainer = document.querySelector(".new_list_container");
	newListModalContainer.classList.toggle('active');
}




mainContainer.addEventListener("click", taskShow);

function taskShow(e) {
	if (e.target.classList.contains("tab-heading")) {
		let taskId = e.target.id;
		let mainDiv = document.querySelector(".parent_container");
		let taskDiv = document.querySelector(".div_box");
		mainDiv.style.display = "none";
		taskDiv.style.display = "block";

		let showTaskHeading = document.getElementById("show_task");
		let taskHeading = document.querySelector(".new_task_box1");
		let addSubTaskButton = document.querySelector(".add_new_task");
		let taskMainBox = document.querySelector(".new_task_box");
		let subtaskList = document.querySelector(".newtask_list")


		taskArray.forEach(function(item) {
			if (item.id == taskId) {
				showTaskHeading.innerText = item.title;
				taskHeading.innerText = item.title;
				taskHeading.id = taskId;
				addSubTaskButton.id = taskId;
				taskMainBox.id = taskId;
				subtaskList.id = taskId
				displayItems(item);

			}
		});

		let taskBackButton = document.querySelector(".class_back_button");
		taskBackButton.addEventListener("click", () => {
			mainDiv.style.display = "block";
			taskDiv.style.display = "none";


			taskArray.forEach(function(item) {
				if (item.id == taskId) {
					let htmlCode = "";
					for (let i = 0; i < item.subtask.length; i++) {
						if (item.completedTask.indexOf(String(item.subtask[i].id)) == "-1") {
							htmlCode += `<li class="isComplete" id="${item.subtask[i].id}">${item.subtask[i].subTaskItem}</li>`;
						} else {
							htmlCode += `<li class="isComplete completed" id="${item.subtask[i].id}">${item.subtask[i].subTaskItem}</li>`;
						}
					}

					let tabDesc = document.querySelectorAll(".tab-desc");
					tabDesc.forEach((element) => {
						if (element.id == taskId) {
							element.innerHTML = htmlCode;
						}
					})
				}
			});
		});

	}
}



let newItemModalContainer = document.querySelector(".item_add_container");
newItemModalContainer.addEventListener("click", addItemFunction);


function addItemFunction(e) {
	if (e.target.id == "add_item_button") {
		taskArray.forEach((item) => {
			if (newItemModalContainer.id == item.id) {
				let addItemTextbox = document.getElementById("add_textbox").value;
				subTaskObj = {};
				subTaskObj.id = Date.now();
				subTaskObj.subTaskItem = addItemTextbox;
				item.subtask.push(subTaskObj);
				displayItems(item);
				document.getElementById("add_textbox").value = "";
			}

		});
	}
}


function displayItems(temp) {

	let htmlCode = "";
	for (let i = 0; i < temp.subtask.length; i++) {
		if (temp.completedTask.indexOf(String(temp.subtask[i].id)) == "-1") {
			htmlCode += `<li class="isComplete" id=${temp.subtask[i].id}>${temp.subtask[i].subTaskItem}</li>`;
		} else {
			htmlCode += `<li class="isComplete completed" id=${temp.subtask[i].id}>${temp.subtask[i].subTaskItem}</li>`;
		}
	}
	let ul = document.querySelector(".newtask_list").innerHTML = htmlCode;
}


mainContainer.addEventListener('click', strikeThroughFunction);

function strikeThroughFunction(e) {
	if (e.target.classList.contains("isComplete")) {
		let selectedItemId = e.target.id;
		let tabDescId = e.target.parentElement.id;
		taskArray.forEach((item) => {
			if (item.id == tabDescId) {
				if (item.completedTask.indexOf(String(selectedItemId)) == "-1") {
					item.completedTask.push(selectedItemId);
				}
			}
		});

		e.target.classList.toggle("completed");
		if (e.target.classList.contains("completed")) {} else {
			taskArray.forEach((item) => {
				if (item.id == tabDescId) {
					let index = item.completedTask.indexOf(String(selectedItemId));
					console.log(index);
					item.completedTask.splice(index, 1);
				}
			});
		}
	}
}




let taskMainContainer = document.querySelector(".new_task_container");
taskMainContainer.addEventListener('click', strikeThroughFunction);

function strikeThroughFunction(e) {
	if (e.target.classList.contains("isComplete")) {
		let selectedItemId = e.target.id;
		let subtaskList = e.target.parentElement.id;
		taskArray.forEach((item) => {
			if (item.id == subtaskList) {
				if (item.completedTask.indexOf(String(selectedItemId)) == "-1") {
					item.completedTask.push(selectedItemId);
				}
			}
		});

		e.target.classList.toggle("completed");
		if (e.target.classList.contains("completed")) {} else {
			taskArray.forEach((item) => {
				if (item.id == subtaskList) {
					let index = item.completedTask.indexOf(String(selectedItemId));
					item.completedTask.splice(index, 1);
				}
			});
		}
	}
}



function newItemToggle(temp) {
	let blur = document.querySelectorAll(".shadow");
	blur.forEach((item) => {
		if (item.parentElement.className == "div_box") {
			item.classList.toggle('active');
			let newItemModalContainer = document.querySelector(".item_add_container");

			if (temp.className == "add_new_task") {
				newItemModalContainer.id = temp.id;
			}

			newItemModalContainer.classList.toggle('active');
		}
	});

}