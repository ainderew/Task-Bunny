const onLoad = () =>{
        document.addEventListener("deviceready", onDeviceReady, false);
    }
    
    
const onDeviceReady = () =>{
    document.addEventListener("backbutton", ()=>{
        nextScreen(introScreen,mainScreen)
    });
}