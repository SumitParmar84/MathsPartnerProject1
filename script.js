// Get references to HTML elements
const savedButton = document.getElementById("saved-button");
const savedSolutionsContainer = document.getElementById(
  "saved-solutions-container"
);
const problemInput = document.getElementById("problem-input");
const problemType = document.getElementById("problem-type");
const searchButton = document.getElementById("search-button");
const answerContainer = document.getElementById("answer-container");

// Function to save answer to local storage
function saveAnswerToLocalStorage(question, answer) {
  const savedSolutions =
    JSON.parse(localStorage.getItem("savedSolutions")) || [];
  savedSolutions.push({ question, answer });
  localStorage.setItem("savedSolutions", JSON.stringify(savedSolutions));
}

// Function to display saved solutions
function displaySavedSolutions() {
  savedSolutionsContainer.innerHTML = ""; // Clear existing content
  const savedSolutions =
    JSON.parse(localStorage.getItem("savedSolutions")) || [];

  savedSolutions.forEach((solution, index) => {
    const solutionItem = document.createElement("div");
    solutionItem.classList.add("solution-item");
    solutionItem.innerHTML = `<p><strong>Question:</strong> ${solution.question}</p><p><strong>Answer:</strong> ${solution.answer}</p>`;
    savedSolutionsContainer.appendChild(solutionItem);
  });
}

// Add event listener to the "Saved Solutions" button
savedButton.addEventListener("click", () => {
  displaySavedSolutions();
});

// Add event listener to the "Search" button
searchButton.addEventListener("click", async () => {
  const expression = problemInput.value;
  const type = problemType.value;
  if (expression && type) {
    const apiUrl = `https://newton.now.sh/api/v2/${type}/${expression}`;
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      const answer = data.result;
      answerContainer.textContent = answer;
      saveAnswerToLocalStorage(expression, answer); // Save the answer
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
});


