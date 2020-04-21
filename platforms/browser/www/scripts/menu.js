const menuPullBtn = document.getElementById("menuPullBtn");
const menuPullBtnOpened = document.getElementById("menuPullBtnOpened");
const todoExpandedScreen = document.querySelector(".todoExpandedScreen");


//for opening
menuPullBtn.addEventListener("touchend",function(){
    mainScreen.classList.toggle("blur2")
    slideScreen(menuScreen,"slideInRight","slideOutRight")
    menuPullBtnOpened.classList.add("slideDownMenuBtn")
    menuPullBtnOpened.classList.remove("slideUpMenuBtn")
    menuPullBtn.style.display = "none"

})

//for closing
menuPullBtnOpened.addEventListener("touchend",function(){
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
    
})


const closeExpandScreen = () =>{
    mainScreen.classList.toggle("blur2");
    mainScreen.removeEventListener("click",closeExpandScreen)
    menuPullBtn.style.pointerEvents ="auto";
    toggleOff(todoExpandedScreen,"zoomIn","zoomOut")
    setTimeout(()=>{
        todoExpandedScreen.style.display ="none";
    },300)

}

const displayTodoExpandScreen = (index) =>{
    todoExpandedScreen.style.display = "block";
    menuPullBtn.style.pointerEvents ="none";
    mainScreen.classList.toggle("blur2");
    toggleOn(todoExpandedScreen,"zoomIn","zoomOut");

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