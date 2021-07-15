'use strict';
// import $ from "jquery";
// import moment from 'moment';
// import daterangepicker from 'daterangepicker'
// $(function () {
//   $('input[name="daterange"]').daterangepicker(
//     {
//       opens: 'left',
//     },
//     function (start, end) {
//       // console.log('A new date selection was made: ' + start.format('YYYY-MM-DD') + ' to ' + end.format('YYYY-MM-DD'));
//       sortDown.style.display = 'none';
//       sortUp.style.display = 'none';
//       let newTasks = tasks.filter((task) => {
//         let filterDate = new Date(task.date);
//         filterDate = moment(filterDate) as Date;
//         return filterDate.isBefore(end) && filterDate.isAfter(start);
//       });
//       let taskList = document.getElementsByClassName('task-list')[0];
//       taskList.innerHTML = '';
//       newTasks.forEach((task) => add(task));
//     }
//   );
// });
function newError() {
  throw new Error('fat gaya');
}
class Task {
  name;
  desc;
  date;
  time;
  partner;
  priority;
  id;
  constructor(name, desc, date, time, partner = 'Me', priority, id) {
    this.name = name;
    this.desc = desc;
    this.date = date;
    this.time = time;
    this.partner = partner;
    this.priority = priority;
    this.id = id;
  }
}
let tasks = [];
let partners = [];
let editBool = false;
let editId = -1;
let i = 0;
let partner_index = 1;
let lastSort = 'default';
let sortUp = document.getElementById('order-up');
let sortDown = document.getElementById('order-down');
function add(task) {
  let taskList = document.getElementsByClassName('task-list')[0];
  let newl = document.createElement('li');
  let priorityString = '';
  if (task.priority == '1') priorityString = 'High';
  if (task.priority == '0') priorityString = 'Medium';
  if (task.priority == '-1') priorityString = 'Low';
  newl.classList.add('task');
  newl.id = 'list-' + task.id;
  newl.innerHTML = `
    ${task.name}
    <button class="complete" type="button" id="comp-${task.id}" data-delete="${task.id}">Complete task</button>
    <span id="edit-${task.id}" class="fas fa-edit fa-lg" data-edit="${task.id}"></span>
    <div class="task-description">
      <ul>
        <li>${task.name}</li>
        <li>${task.desc}</li>
        <li>${task.date}</li>
        <li>${task.time}</li>
        <li>${task.partner}</li>
        <li>${priorityString}</li>
      </ul>
    </div>
  `;
  taskList.appendChild(newl);
  if (partners.includes(task.partner)) return;
  let par = document.getElementById('partner');
  partners.push(task.partner);
  let newa = document.createElement('span');
  newa.id = 'partner-' + partner_index;
  newa.innerText = task.partner;
  par.appendChild(newa);
  let newPart = document.getElementById('partner-' + partner_index);
  newPart.addEventListener('click', (event) => {
    sortDown.style.display = 'none';
    sortUp.style.display = 'none';
    let newTasks = tasks.filter((t2) => t2.partner === task.partner);
    taskList.innerHTML = '';
    newTasks.forEach((t2) => add(t2));
  });
  partner_index++;
}
let sub = document.getElementById('submit');
sub.addEventListener('click', (e) => {
  e.preventDefault();
  let name = document.getElementById('taskName').value;
  let desc = document.getElementById('taskText').value;
  let date = document.getElementById('taskDate').value;
  let time = document.getElementById('taskTime').value;
  let partner = document.getElementById('taskPartner').value;
  let priority = document.getElementById('taskPriority').value;
  let id = i;
  if (name == '' || desc == '' || date == '' || time == '' || partner == '') {
    alert('Enter all Fields!');
    document.getElementById('taskName').value = name;
    document.getElementById('taskText').value = desc;
    document.getElementById('taskDate').value = date;
    document.getElementById('taskTime').value = time;
    document.getElementById('taskPartner').value = partner;
    document.getElementById('taskPriority').value = priority;
    return;
  }
  if (editBool) {
    let toUpdate = tasks.find((task) => task.id == editId);
    if (!toUpdate) {
      newError();
      return;
    }
    toUpdate.name = name;
    toUpdate.desc = desc;
    toUpdate.date = date;
    toUpdate.time = time;
    toUpdate.partner = partner;
    toUpdate.priority = priority;
    editBool = false;
    if (!partners.includes(toUpdate.partner)) {
      let par = document.getElementById('partner');
      partners.push(toUpdate.partner);
      let newa = document.createElement('span');
      newa.id = 'partner-' + partner_index;
      newa.innerText = toUpdate.partner;
      par.appendChild(newa);
      let newPart = document.getElementById('partner-' + partner_index);
      newPart.addEventListener('click', (event) => {
        sortDown.style.display = 'none';
        sortUp.style.display = 'none';
        let newTasks = tasks.filter((t2) => {
          if (!toUpdate) {
            newError();
            return;
          }
          return t2.partner === toUpdate.partner;
        });
        let taskList = document.getElementsByClassName('task-list')[0];
        taskList.innerHTML = '';
        newTasks.forEach((t2) => add(t2));
      });
      partner_index++;
    }
    let priorityString = '';
    if (toUpdate.priority == '1') priorityString = 'High';
    if (toUpdate.priority == '0') priorityString = 'Medium';
    if (toUpdate.priority == '-1') priorityString = 'Low';
    let updateElement = document.getElementById('list-' + editId);
    updateElement.innerHTML = `
      ${toUpdate.name}
      <button class="complete" type="button" id="comp-${toUpdate.id}" data-delete="${toUpdate.id}">Complete task</button>
      <span id="edit-${toUpdate.id}" class="fas fa-edit fa-lg" data-edit="${toUpdate.id}"></span>
      <div class="task-description">
        <ul>
          <li>${toUpdate.name}</li>
          <li>${toUpdate.desc}</li>
          <li>${toUpdate.date}</li>
          <li>${toUpdate.time}</li>
          <li>${toUpdate.partner}</li>
          <li>${priorityString}</li>
        </ul>
      </div>
    `;
  } else {
    let obj = new Task(name, desc, date, time, partner, priority, id);
    add(obj);
    // console.log(typeof date, date, typeof time, time);
    tasks.push(obj);
  }
  let timeDiff =
    document.getElementById('taskDate').valueAsNumber +
    document.getElementById('taskTime').valueAsNumber -
    Date.now() -
    19798000;
  window.setTimeout(function () {
    alert('Time for task-' + name + '!');
  }, timeDiff);
  document.getElementById('taskName').value = '';
  document.getElementById('taskText').value = '';
  document.getElementById('taskDate').value = '';
  document.getElementById('taskTime').value = '';
  document.getElementById('taskPartner').value = '';
  document.getElementById('taskPriority').value = '0';
  i++;
});
function sort(how, sign) {
  document.getElementById('status').innerText = how.toUpperCase();
  switch (how) {
    case 'priority':
      let copyTasks = tasks.sort((a, b) => (Number(a.priority) - Number(b.priority)) * sign);
      let taskList = document.getElementsByClassName('task-list')[0];
      taskList.innerHTML = '';
      copyTasks.forEach((task) => {
        add(task);
      });
      break;
    case 'alphabetical':
      let copyTasks2 = tasks.sort((a, b) => a.name.localeCompare(b.name));
      if (sign < 0) {
        copyTasks2.reverse();
      }
      let taskList2 = document.getElementsByClassName('task-list')[0];
      taskList2.innerHTML = '';
      copyTasks2.forEach((task) => {
        add(task);
      });
      break;
    case 'default':
      let copyTasks3 = tasks;
      if (sign < 0) {
        copyTasks3.reverse();
      }
      let taskList3 = document.getElementsByClassName('task-list')[0];
      taskList3.innerHTML = '';
      copyTasks3.forEach((task) => add(task));
      break;
    default:
      let copyTasks4 = tasks;
      if (sign < 0) {
        copyTasks4.reverse();
      }
      let taskList4 = document.getElementsByClassName('task-list')[0];
      taskList4.innerHTML = '';
      copyTasks4.forEach((task) => add(task));
      break;
  }
}
let section1 = document.getElementById('section-1');
section1.addEventListener('click', (e) => {
  let idDelete = e.target.dataset.delete;
  if (idDelete) {
    tasks = tasks.filter(function (task) {
      return task.id != Number(idDelete);
    });
    let element = document.getElementById('comp-' + idDelete);
    element.parentElement.remove();
  }
  let idEdit = e.target.dataset.edit;
  if (idEdit) {
    editBool = true;
    editId = Number(idEdit);
    let toUpdate = tasks.find((task) => task.id == editId);
    if (!toUpdate) {
      newError();
      return;
    }
    document.getElementById('taskName').value = toUpdate.name;
    document.getElementById('taskText').value = toUpdate.desc;
    document.getElementById('taskDate').value = toUpdate.date;
    document.getElementById('taskTime').value = toUpdate.time;
    document.getElementById('taskPartner').value = toUpdate.partner;
    document.getElementById('taskPriority').value = toUpdate.priority;
    // console.log(toUpdate + idEdit);
  }
  // console.log(tasks);
});
let resetButton = document.getElementById('reset');
resetButton.addEventListener('click', (e) => {
  document.getElementById('taskName').value = '';
  document.getElementById('taskText').value = '';
  document.getElementById('taskDate').value = '';
  document.getElementById('taskTime').value = '';
  document.getElementById('taskPartner').value = '';
  document.getElementById('taskPriority').value = '0';
});
sortUp.addEventListener('click', (e) => {
  sortUp.style.display = 'none';
  sortDown.style.display = 'block';
  if (lastSort === 'nothing') return;
  sort(lastSort, 1);
});
sortDown.addEventListener('click', (e) => {
  sortUp.style.display = 'block';
  sortDown.style.display = 'none';
  if (lastSort === 'nothing') return;
  sort(lastSort, -1);
});
let prioritySort = document.getElementById('sort-priority');
prioritySort.addEventListener('click', (e) => {
  sort('priority', 1);
  lastSort = 'priority';
  sortUp.style.display = 'none';
  sortDown.style.display = 'block';
});
let alphabeticalSort = document.getElementById('sort-alpha');
alphabeticalSort.addEventListener('click', (e) => {
  sort('alphabetical', 1);
  lastSort = 'alphabetical';
  sortUp.style.display = 'none';
  sortDown.style.display = 'block';
});
let defaultSort = document.getElementById('sort-default');
defaultSort.addEventListener('click', (e) => {
  sort('default', 1);
  lastSort = 'default';
  sortUp.style.display = 'none';
  sortDown.style.display = 'block';
});
let search = document.getElementById('search');
search.addEventListener('keyup', (e) => {
  sortDown.style.display = 'none';
  sortUp.style.display = 'none';
  const searchString = e.target.value.toLowerCase();
  let taskList = document.getElementsByClassName('task-list')[0];
  taskList.innerHTML = '';
  const filtered = tasks.filter((task) => {
    return task.name.toLowerCase().includes(searchString) || task.desc.toLowerCase().includes(searchString);
  });
  filtered.forEach((task) => add(task));
});
let defaultPart = document.getElementById('partner-' + 0);
defaultPart.addEventListener('click', (e) => {
  sortDown.style.display = 'none';
  sortUp.style.display = 'none';
  let newTasks = tasks.filter((task) => task.partner);
  let taskList = document.getElementsByClassName('task-list')[0];
  taskList.innerHTML = '';
  newTasks.forEach((task) => add(task));
});

$(function () {
  $('input[name="daterange"]').daterangepicker(
    {
      opens: 'left',
    },
    function (start, end, label) {
      // console.log('A new date selection was made: ' + start.format('YYYY-MM-DD') + ' to ' + end.format('YYYY-MM-DD'));
      sortDown.style.display = 'none';
      sortUp.style.display = 'none';
      let newTasks = tasks.filter((task) => {
        let filterDate = new Date(task.date);
        filterDate = moment(filterDate);
        return filterDate.isBefore(end) && filterDate.isAfter(start);
      });
      let taskList = document.getElementsByClassName('task-list')[0];
      taskList.innerHTML = '';
      newTasks.forEach((task) => add(task));
    }
  );
});
// THIS IS JUGAD, COPY PASTED FROM ORIGINAL FILE, SOME JQUERY ISSUE IN TS IMPORTS

//# sourceMappingURL=script.js.map
