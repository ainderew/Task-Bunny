const day = new Date();
const nextArrow = document.getElementById("nextButton");
const introScreen = document.querySelector(".titleScreen");
const mainScreen = document.querySelector(".mainScreen");
const themeChanger = document.getElementById("themeChanger");
const createTodo = document.querySelector(".svgMiddle");
const closeTodo = document.getElementById("closeSvg");
const todoCreateScreen = document.getElementById("createTodoScreen");
const todoUL = document.getElementById("todoUL");
const todoAdd = document.getElementById("todoAdd");
const todoSubList = document.getElementById("todoSubList");
const subListAdd = document.getElementById("subAdder");
const subListRemover = document.getElementById("subRemover");
const subListSelect = document.getElementById("subListSelect");
const menuScreen = document.querySelector(".menuScreen");
let todoName = document.getElementById("todoName");
let timeValue = document.getElementById("timeInput");
const dayList = document.querySelectorAll(".dayList");

let isOpen = false;// used in tracking for screenSlide function



const nextScreen =(screenIn,screenOut)=>{
    screenOut.classList.add("bounceOutRight");
    setTimeout(()=>{
        screenOut.classList.remove("bounceOutRight");
    },500)
    
    screenIn.classList.add("bounceInLeft");
    setTimeout(()=>{
        screenIn.classList.remove("bounceInLeft");
    },500)

    screenIn.style.display ="block";
    
    setTimeout(function(){
        screenOut.style.display = "none";
    },500)
}
const slideScreen =(createScreen,animateIn,animateDown)=>{
    if(isOpen){
        isOpen=false;
        createScreen.classList.toggle(animateDown);
        createScreen.classList.toggle(animateIn);
        setTimeout(function(){
            createScreen.style.display ="none";
        },300)
       
    }else{
        isOpen=true;
        createScreen.style.display ="block";
        createScreen.classList.toggle(animateIn);
        createScreen.classList.remove(animateDown);
        

    }
}

const toggleOn = (screen,animationIn,animationOut) =>{
    screen.classList.add(animationIn)
    screen.classList.remove(animationOut)
}
const toggleOff = (screen,animationIn,animationOut) =>{
    screen.classList.remove(animationIn)
    screen.classList.add(animationOut)
    
}


const timeCalc =()=>{
    let time = "";
    let hours = day.getHours();
    let min = day.getMinutes(); 
    let period = "AM";
    if(hours>11){
        period = "PM";
        hours = hours-12;
    }
    (hours === 0)? hours = 12 : hours = hours;
    (min<10) ? min = `0${min}` : min=min;
    time = `${hours}:${min} ${period}`;
    return time;
    
}

const dayUpdater =()=>{
    const dayField = document.getElementById("dayToday");
    const timeField = document.getElementById("time");
    let date = day.getDate()
    let dayString = day.getDay()
    if(dayString===0){
        dayString="Sunday";
        dayList[6].classList.add("currentDay");
    }else if(dayString===1){
        dayList[0].classList.add("currentDay");
        dayString="Monday";
    }else if(dayString===2){
        dayList[1].classList.add("currentDay");
        dayString="Tuesday";
    }else if(dayString===3){
        dayList[2].classList.add("currentDay");
        dayString="Wednesday";
    }else if(dayString==4){
        dayList[3].classList.add("currentDay");
        dayString="Thursday";
    }else if(dayString===5){
        dayList[4].classList.add("currentDay");
        dayString="Friday";
    }else if(dayString===6){
        dayList[5].classList.add("currentDay");
        dayString="Saturday";
    }
    timeField.textContent = timeCalc();
    setInterval(()=>{
        timeField.textContent = timeCalc();
    },15000);
    dayField.textContent = `Today is ${dayString} ${date}`;
}


nextArrow.addEventListener("click",function(){
    nextScreen(mainScreen,introScreen);
});



let currentTheme = 1;
themeChanger.addEventListener("click",()=>{
    let bodySelector = document.querySelector("body");
    let logo = document.querySelector(".svg1");
    bodySelector.classList.toggle("themeSecond")
    logo.classList.toggle("fadeIn")
    if (currentTheme ===1){
        logo.src = "./Photos/taskLogoOrange.svg"
        currentTheme = 2;
    }else{
        logo.src = "./Photos/taskLogoBlue.svg"
        currentTheme = 1;
    }
    setTimeout(()=>{
        logo.classList.remove("fadeIn")
    },200)
});


const bunny = document.getElementById("todoSvg");
    bunny.addEventListener("click",()=>{
       bunny.classList.remove("bounce");
       setTimeout(()=>{
        bunny.classList.toggle("bounce");
       },1)
    })



let options = {
    root: document.querySelector(".forPadding"),
    rootMargin: "0px 0px 100px 0px",
    threshold: .5
    // threshold: .5
}

let callback =(entries,observer)=>{
    entries.forEach(entry => {
        if(!entry.isIntersecting){
            //not showing
            entry.target.classList.add("fadeOut")
            entry.target.classList.remove("fadeIn")

        }else{
            console.log("showing");
            entry.target.classList.remove("fadeOut")
            entry.target.classList.add("fadeIn")

            // entry.target.classList.toggle("slideInDown")
        }
    })
}

let observer = new IntersectionObserver(callback,options);




//FOR CREATE SCREEN FUNCTIONALITY

const task = function (taskName,taskHour,taskMin,period,subList){
    this.title = taskName;
    this.hour = taskHour;
    this.minute = taskMin;
    this.period = period;
    this.subList = subList;
}

const addTodo = () =>{
    if(todoName.value!==""){
        let taskName = todoName.value;
    let taskTime = timeValue.value;
    let array = taskTime.split(":") 
    let taskHour
    let period
    let taskMin
    let subList = []
    
    if (subListSelect.options[0].value!=="empty"){
        for(let i=0; i<subListSelect.options.length; i++){
            subList.push(subListSelect.options[i].value)
        }
    }

    
    if ( array[0]>12){
        taskHour = `0${array[0]-12}`
        period = "PM"
        taskMin = array[1];
    }else{
        taskHour = array[0];
        period = "AM"
        taskMin = array[1];
    }

    const newTask = new task(taskName,taskHour,taskMin,period,subList);
    console.log(newTask);
    
    if (localStorage.getItem("tasks")===null){
        let tasksArray = [];
        tasksArray.push(newTask);
        localStorage.setItem("tasks", JSON.stringify(tasksArray))
    }else{
        let secondTasksArray = JSON.parse(localStorage.getItem("tasks"));
        secondTasksArray.push(newTask);
        localStorage.setItem("tasks",JSON.stringify(secondTasksArray));
        
    }
    todoUL.innerHTML = ""
    todoDisplay();
    Swal.fire({
        title: 'Todo Added!',
        width: 300,
        icon: 'success',
        showConfirmButton:false,
        timer: 1200
      })
    }
    
}

const todoDisplay = () =>{
    let tasks = JSON.parse(localStorage.getItem("tasks"))
    tasks.forEach(x=>{
        if (x.subList[0]===undefined){
            let list = document.createElement("li");
            list.className = "todoListItems"
            list.innerHTML = `
                <div class="itemContainer animated faster">
                    <div class="row-1-items">
                        <div class="iconContainer-item"> <ion-icon  name="alarm"></ion-icon></div>
                        <h1 class="titleContainer-item">${x.title}</h1>
                        <h2 class="timeContainer-item">${x.hour}:${x.minute} ${x.period}</h2>
                    </div>
                </div>
                <div class="liClose">
                    <img class ="todoDelete" src="./Photos/deleteTodo.svg">
                </div>
                <div class="liDone">
                    <img class ="todoDone" src="./Photos/taskDone.svg">
                </div>
            `
            console.log("if ran: "+subListSelect.options[0].value)
            todoUL.appendChild(list);
       }else{
            let subListItems="";
            for(let i=0; i<x.subList.length;i++){
                subListItems +=`<li>${x.subList[i]}</li>`
            }
            let list = document.createElement("li");
            list.className = "todoListItems"
            list.innerHTML = `
                <div class="itemContainer animated faster">
                    <div class="row-1-items">
                        <div class="iconContainer-item"> <ion-icon  name="alarm"></ion-icon></div>
                        <h1 class="titleContainer-item">${x.title}</h1>
                        <h2 class="timeContainer-item">${x.hour}:${x.minute} ${x.period}</h2>
                    </div>
                    <div class="row-2-items">
                        <ul class="subClassUl">
                            ${subListItems}
                        </ul>
                    </div>
                </div>
                <div class="liClose">
                <img class ="todoDelete" src="./Photos/deleteTodo.svg">
                </div>
                <div class="liDone">
                    <img class ="todoDone" src="./Photos/taskDone.svg">
                </div>
            `
            console.log("else ran: "+subListSelect.options[0].value)
            todoUL.appendChild(list); 
        } 
    })
    update();
    todoName.value = "";
    subListSelect.innerHTML = `<option value="empty">empty</option>`;
    
}

/*
    4/19/20
    The Update() function runs a forEach loop to add an eventListener to each new close button and gets their index.
    So the index can be passed to the deleteTodo() function so it knows what todo Item to delete from the array stored
    in the local storage
*/
const update = () =>{
    let todoDelete = document.querySelectorAll(".todoDelete");
    let todoTitle = document.querySelectorAll(".titleContainer-item");
    let itemContainer = document.querySelectorAll(".itemContainer");
    let target = document.querySelectorAll(".itemContainer");
    let i = 0;
    target.forEach(target=>{
        observer.observe(target);
    })

    
    itemContainer.forEach((todo,index)=>todo.addEventListener("click",()=>{
        console.log(index);
        displayTodoExpandScreen(index);
        
    }))

    todoDelete.forEach((x,index)=> x.addEventListener("click",()=>{
        console.log(index);
        mainScreen.classList.toggle("blur");
        Swal.fire({
            title: "Are you sure",
            showCancelButton: true,
            cancelButtonColor: "grey",
            confirmButtonColor: "red",
            icon: "warning",
            width: 350,
            toast: true,
            
            
          }).then(result =>{
              if (result.value){
                deleteTodo(x,index)
                mainScreen.classList.toggle("blur");
              }else{
                mainScreen.classList.toggle("blur");
              }
          })
          
        
    }))
}

/*
    4/19/20
    Recieves the specific close that was clicked and its index. so it knows what todo
    item to add  the animation and what todo item to remove from the array.
    The deleteTodo() function adds animation to the classList via animation.css lib
    It gets the array stored in localStorage and splices the item in the given index
    then stores it again after the changes were made. updating the todo list
*/
const deleteTodo = (x,index) =>{
    x.parentNode.parentNode.classList.add("animated");
    x.parentNode.parentNode.classList.add("fast");
    x.parentNode.parentNode.classList.add("flipOutX");
    setTimeout(()=>{
        x.parentNode.parentNode.remove();
    },300)

    let tasks = JSON.parse(localStorage.getItem("tasks"))
    tasks.splice(index,1);
    localStorage.setItem("tasks",JSON.stringify(tasks));
  

    todoUL.innerHTML = ""
    todoDisplay()
    

    
}

const addSubListTodo = () =>{
    const item = subListSelect.options[subListSelect.selectedIndex];
    let todo = todoSubList.value;
    let option = document.createElement("option");
    
    
    if(todoSubList.value !== "" ){
        console.log("true")
        option.setAttribute("value", todo)
        option.innerHTML = todo;
        subListSelect.appendChild(option);
        todoSubList.value=""
        if(item.value==="empty"){
            item.remove()
        }
    }
}
const removeSubListTodo = () =>{
    const item = subListSelect.options[subListSelect.selectedIndex];
    const options = document.createElement("option");
    if (item.value!=="empty"){
        item.remove();
    }
    if(subListSelect.length === 0){
        options.setAttribute("value","empty")
        options.innerHTML = "empty";
        subListSelect.appendChild(options)
    }
    
}


todoAdd.addEventListener("click",addTodo); // evenListener for when the user adds a todo LI
subListAdd.addEventListener("click",addSubListTodo);
subListRemover.addEventListener("click",removeSubListTodo);
dayUpdater();