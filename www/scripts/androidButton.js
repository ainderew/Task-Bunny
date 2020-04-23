const onLoad = () =>{
        document.addEventListener("deviceready", onDeviceReady, false);
        if (localStorage.getItem("profileImage")!==null){
            let data = JSON.parse(localStorage.getItem("profileImage"))
            profileScreenUserPhoto.style.backgroundImage = `url(${data})`
            mainScreenUserPhoto.style.backgroundImage = `url(${data})`
        }
        
    }
    

    
const onDeviceReady = () =>{
    document.addEventListener("backbutton",screenTracker)
    console.log(navigator.camera);
    profileScreenUserPhoto.addEventListener("click",getProfilePicture);
}

function setOptions(srcType) {
    var options = {
        // Some common settings are 20, 50, and 100
        quality: 50,
        destinationType: Camera.DestinationType.FILE_URI,
        // In this app, dynamically set the picture source, Camera or photo gallery
        sourceType: srcType,
        encodingType: Camera.EncodingType.JPEG,
        mediaType: Camera.MediaType.PICTURE,
        allowEdit: true,
        correctOrientation: true  //Corrects Android orientation quirks
    }
    return options;
}

const getProfilePicture =()=>{
    const srcType = Camera.PictureSourceType.SAVEDPHOTOALBUM
    const options = setOptions(srcType)
    navigator.camera.getPicture((imageUri)=>{
        profileScreenUserPhoto.style.backgroundImage = `url(${imageUri})`
        mainScreenUserPhoto.style.backgroundImage = `url(${imageUri})`
        localStorage.setItem("profileImage",JSON.stringify(imageUri))
        

    },()=>{
        alert("photo delted")
    },options)
}



const screenTracker = () =>{
    if (!StatusMenu){
        if (statusProfileScreen === 1){
            nextScreen(mainScreen,profileScreen,"block");
            statusProfileScreen = 0;
            statusMainScreen = 1;
        }else if (statusMainScreen === 1){
            nextScreen(titleScreen,menuScreen,"block");
            statusMainScreen = 0;
            statusTitleScreen = 1;
        }
    }
}