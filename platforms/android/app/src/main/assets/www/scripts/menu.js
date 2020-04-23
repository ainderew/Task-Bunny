const menuPullBtn = document.getElementById("menuPullBtn");
const menuPullBtnOpened = document.getElementById("menuPullBtnOpened");
const todoExpandedScreen = document.querySelector(".todoExpandedScreen");
const profileScreen = document.querySelector(".profileScreen");
// ˅ ˅MAIN SCREEN STATUS ˅ ˅
let statusProfileScreen = 0;
let statusMainScreen = 0;
let statusTitleScreen = 1;
//^^^^MAIN SCREEN STATUS ^^^^^

let statusSideMenu = 0;
let statusCreateTodoMenu = 0;
let statusMenu = false;

startButton.addEventListener("click",function(){
    nextScreen(mainScreen,titleScreen,"block");
    statusMainScreen = 1;
    statusTitleScreen =0;
});

//for opening
menuPullBtn.addEventListener("touchend",function(){
    mainScreen.classList.toggle("blur2")
    slideScreen(menuScreen,"slideInRight","slideOutRight")
    menuPullBtnOpened.classList.add("slideDownMenuBtn")
    menuPullBtnOpened.classList.remove("slideUpMenuBtn")
    menuPullBtn.style.display = "none"

    statusMenu = true;

})

//for closing
const sideMenuClose = () =>{
    mainScreen.classList.toggle("blur2")
    slideScreen(menuScreen,"slideInRight","slideOutRight")
    
    menuPullBtnOpened.classList.add("slideUpMenuBtn")
    menuPullBtnOpened.classList.remove("slideDownMenuBtn");
    menuPullBtn.classList.toggle("delay-100ms");
    menuPullBtn.classList.toggle("rubberBand");
    setTimeout(()=>{
        menuPullBtn.classList.toggle("delay-100ms");
        menuPullBtn.classList.toggle("rubberBand");
    },1000)
    setTimeout(()=>{
        menuPullBtn.style.display = "block"
    },190)
    
    statusMenu = false
}
menuPullBtnOpened.addEventListener("touchend",sideMenuClose)
//^^for closing^^



createTodo.addEventListener("click",function(){
    slideScreen(todoCreateScreen,"slideInUp","slideOutDown")
    mainScreen.classList.toggle("blur");
    menuPullBtn.style.pointerEvents ="none";
    statusMenu = true;
    statusCreateTodoMenu = 1;
})


const closeTodoMenu = () =>{
    slideScreen(todoCreateScreen,"slideInUp","slideOutDown");
    mainScreen.classList.toggle("blur");
    menuPullBtn.style.pointerEvents ="auto"
    statusMenu = false
    statusCreateTodoMenu = 0;

}
closeTodo.addEventListener("click",closeTodoMenu)


const closeExpandScreen = () =>{
    mainScreen.classList.toggle("blur2");
    mainScreen.removeEventListener("click",closeExpandScreen)
    menuPullBtn.style.pointerEvents ="auto";
    toggleOff(todoExpandedScreen,"fadeInDown","fadeOutUp")
    setTimeout(()=>{
        todoExpandedScreen.style.display ="none";
    },300)

}

const displayTodoExpandScreen = (index) =>{
    todoExpandedScreen.style.display = "block";
    menuPullBtn.style.pointerEvents ="none";
    mainScreen.classList.toggle("blur2");
    toggleOn(todoExpandedScreen,"fadeInDown","fadeOutUp");

    let taskArray = JSON.parse(localStorage.getItem("tasks"))
    console.log(taskArray[index]);
    getDataForExpandScreen(taskArray,index);
    setTimeout(()=>{
        mainScreen.addEventListener("click",closeExpandScreen)
       
    },500)
   
}

const getDataForExpandScreen = (tasks,index)=>{
    const upperTodoExpanded = document.querySelector(".upperTodoExpanded");
    upperTodoExpanded.innerHTML = `
        <div class="expandedRow1Container">
            <div class="extendedIconContainer"> <ion-icon class="extendedIcon" name="alarm"></ion-icon></div>
            <div class="extendedTitleContainer"><h1 class="extendedTodoTitle">${tasks[index].title}</h1></div>
        </div>
    `
   ;
    const extendedTodoTitle = document.querySelector(".extendedTodoTitle");
    extendedTodoTitle.addEventListener("click",()=>{
        editExtendedTodoTitle(tasks,index)
        console.log("clicked")
    })
}

    


const editExtendedTodoTitle = (tasks,index) =>{
    
    const extendedTitleContainer = document.querySelector(".extendedTitleContainer");
    extendedTitleContainer.innerHTML = `<input type="text" value= "${tasks[index].title}" id ="newTitleInput"> <button id="saveBtn">save</button>`
    const saveBtn = document.getElementById("saveBtn");
    saveBtn.addEventListener("click",()=>{
        editExtendedSaver(tasks,index);
        
    })
    const newTitleInput = document.getElementById("newTitleInput");
    newTitleInput.focus();
    
    newTitleInput.addEventListener("blur",()=>{
        setTimeout(()=>{
            getDataForExpandScreen(tasks,index);
        },10)
    })
}

const editExtendedSaver = (tasks,index) =>{
    const newTitle = document.getElementById("newTitleInput");
    tasks[index].title = newTitle.value;
    localStorage.setItem("tasks",JSON.stringify(tasks))
    todoUL.innerHTML ="";
    todoDisplay();
    getDataForExpandScreen(tasks,index);
}



mainScreenUserPhoto.addEventListener("click",()=>{
    nextScreen(profileScreen,mainScreen,"grid")

    statusProfileScreen = 1;
    statusMainScreen = 0;

})


