const keyStorkeSounds=[
new Audio("/sounds/keystroke1.mp3"),
new Audio("/sounds/keystroke2.mp3"),
new Audio("/sounds/keystroke3.mp3"),
new Audio("/sounds/keystroke4.mp3"),
];

function useKeyboardSound(){
    const playRandomKeyStorkeSound =()=>{
  const randomSound =keyStorkeSounds[Math.floor(Math.random()*keyStorkeSounds.length)];
  randomSound.currentTime=0;
  randomSound.play().catch((error)=> console.log("Audio play failed:",error));
    };
    return{playRandomKeyStorkeSound}
}

export default useKeyboardSound;