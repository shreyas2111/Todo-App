// let filterByDay = document.getElementById('filter-day');
// filterByDay.addEventListener('click', (event) => {
//   let today = new Date().toString();
//   let newTasks = tasks.filter((task) => {
//     let filterDate = new Date(task.date).toString();
//     // console.log(filterDate);
//     return today.substring(0, 10) == filterDate.substring(0, 10);
//   });
//   // console.log(today, newTasks);
//   let taskList = document.getElementsByClassName('task-list')[0];
//   taskList.innerHTML = '';
//   newTasks.forEach((task) => add(task));
// });

// let filterByWeek = document.getElementById('filter-week');
// filterByWeek.addEventListener('click', (event) => {
//   let today = new Date();
//   let newTasks = tasks.filter((task) => {
//     let filterDate = new Date(task.date);
//     // console.log(filterDate);
//     return today.getWeek() == filterDate.getWeek();
//   });
//   // console.log(today, newTasks);
//   let taskList = document.getElementsByClassName('task-list')[0];
//   taskList.innerHTML = '';
//   newTasks.forEach((task) => add(task));
// });

// let filterByMonth = document.getElementById('filter-month');
// filterByMonth.addEventListener('click', (event) => {
//   let today = new Date();
//   let newTasks = tasks.filter((task) => {
//     let filterDate = new Date(task.date);
//     // console.log(filterDate);
//     return today.getMonth() == filterDate.getMonth();
//   });
//   // console.log(today, newTasks);
//   let taskList = document.getElementsByClassName('task-list')[0];
//   taskList.innerHTML = '';
//   newTasks.forEach((task) => add(task));
// });
