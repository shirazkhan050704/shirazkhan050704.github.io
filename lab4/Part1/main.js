// Get references to the HTML elements
const customName = document.getElementById("customname");
const randomize = document.querySelector(".randomize");
const story = document.querySelector(".story");

// Story template with placeholders
const storyText = "It was 94°F outside, so :insertx: went for a walk. When they got to :inserty:, they stared in horror for a few moments, then :insertz:. Bob saw the whole thing, but was not surprised — :insertx: always did that.";

const insertX = ["Willy the Goblin", "Big Daddy", "Father Christmas"];
const insertY = ["the soup kitchen", "Disneyland", "the White House"];
const insertZ = ["spontaneously combusted", "melted into a puddle on the sidewalk", "turned into a slug and crawled away"];

// Function to generate a random story
function generateStory() {
  let newStory = storyText;

  // Pick random values from arrays
  const xItem = insertX[Math.floor(Math.random() * insertX.length)];
  const yItem = insertY[Math.floor(Math.random() * insertY.length)];
  const zItem = insertZ[Math.floor(Math.random() * insertZ.length)];

  // Replace placeholders with random values
  newStory = newStory.replace(":insertx:", xItem);
  newStory = newStory.replace(":insertx:", xItem); // Replaces second occurrence
  newStory = newStory.replace(":inserty:", yItem);
  newStory = newStory.replace(":insertz:", zItem);

  // If a name is entered, replace "Bob" with the custom name
  if (customName.value !== "") {
    newStory = newStory.replace("Bob", customName.value);
  }

  // Check for UK conversion
  if (document.getElementById("uk").checked) {
    newStory = newStory.replace("94°F", "34°C");
  }

  // Display the story
  story.textContent = newStory;
  story.style.visibility = "visible";
}

// Event listener for the button
randomize.addEventListener("click", generateStory);

