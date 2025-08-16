// Waits for HTML content to fully load before running the script
document.addEventListener("DOMContentLoaded", () => {
  const btn   = document.querySelector(".abduct");     // Abduct/Abort button
  const slime = document.querySelector(".slimeCow");   // Slime cow element
  const bolts = document.querySelectorAll(".bolt");    // Lightning bolt elements
  const ufo   = document.querySelector(".ufo");        // UFO element

  // If any key elements are missing, stop running the script
  if (!btn || !slime || !ufo) return;

  // Counter for tracking how many times Abort has been clicked
  let abortClicks = 0;

  // Helper to check if the button is currently in abort mode
  const isAbort = () => btn.classList.contains("is-abort");

  // Wiggle animation for the button
  const wiggle = (ms = 800) => {
    btn.classList.remove("wiggle"); 
    btn.offsetWidth; 
    btn.classList.add("wiggle"); 
    clearTimeout(wiggle._t); 
    wiggle._t = setTimeout(() => btn.classList.remove("wiggle"), ms);
  };

  // Trigger lightning animation for all bolt elements
  const shootLightning = () => {
    bolts.forEach(b => {
      b.classList.remove("shoot-lightning"); 
      b.offsetWidth; 
      b.classList.add("shoot-lightning"); // re-add class to restart animation
    });
  };

  // Switch button between Abduct and Abort modes
  const setMode = (abort) => {
    btn.classList.toggle("is-abort", abort); 
    btn.setAttribute("aria-label", abort ? "Abort button" : "Abduct button"); 
    abortClicks = 0; // reset abort click counter
  };

  // Start abduction process
  const abduct = () => {
    shootLightning(); // play lightning animation
    document.body.classList.add("abducted"); 
    setMode(true); // switch button to abort mode
  };

  // Handle abort sequence
  const abortFlow = () => {
    if (++abortClicks === 1) {
      // First abort click: show slime cow
      slime.classList.add("is-visible");
    } else {
      // Second abort click: reload page (reset everything)
      window.location.reload();
    }
  };

  // Determine if UFO is on left or right side of the screen
  const ufoSide = () =>
    ufo.getBoundingClientRect().left > window.innerWidth / 2 ? "right" : "left";

  // Decide what happens when button is clicked
  const activate = () => {
    if (!isAbort()) {
      ufoSide() === "right" ? abduct() : wiggle(); // abduct if UFO is right, wiggle otherwise
    } else {
      ufoSide() === "left" ? abortFlow() : wiggle(); // abort if UFO is left, wiggle otherwise
    }
  };

  // Attach click event to abduct/abort button
  btn.addEventListener("click", activate);
});
