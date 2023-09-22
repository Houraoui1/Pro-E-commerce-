const playClickSound = () => {
  const audio = new Audio(
    "https://uploads.codesandbox.io/uploads/user/7f9e13d2-3bd6-418d-a05e-c989b824b268/7DRc-notification-sound.wav"
  );
  audio.play();
};
console.log(playClickSound, "souuuuund");
export default playClickSound;
