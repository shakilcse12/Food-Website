const apiBaseUrl = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';


// Handling the Hamburger Menu
const hamburger = document.getElementById('hamburger');
const dropdown = document.getElementById('dropdown');
hamburger.addEventListener('click', () => {
  dropdown.classList.toggle('hidden');
});

// Function to remove selected class from all buttons
function resetButtonStyles() {
  const categoryButtons = document.querySelectorAll('.category-btn');
  categoryButtons.forEach(button => {
    button.classList.remove('bg-orange-500', 'text-white'); 
    button.classList.add('bg-gray-200', 'text-gray-800');
  });
}

// Handling Category Button Click
function addCategoryButtonEventListeners() {
  const categoryButtons = document.querySelectorAll('.category-btn');
  
  categoryButtons.forEach(button => {
    button.addEventListener('click', () => {
      resetButtonStyles(); // Reset other buttons' styles
      button.classList.remove('bg-gray-200', 'text-gray-800'); 
      button.classList.add('bg-orange-500', 'text-white'); 

      const category = button.dataset.category;
      fetchMeals(category);
    });
  });
}

// Fetch Meals from API
async function fetchMeals(category) {
  try {
    const response = await fetch(`${apiBaseUrl}${category}`);
    const data = await response.json();
    displayMeals(data.meals);
  } catch (error) {
    console.error('Error fetching meals:', error);
  }
}

// Display Meals in the Food Section
function displayMeals(meals) {
  const foodSection = document.getElementById('food-section');
  foodSection.innerHTML = ''; 

  meals.forEach(meal => {
    const mealCard = `
      <div class="card bg-white shadow-md rounded-lg overflow-hidden">
        <img src="${meal.strMealThumb}" alt="${meal.strMeal}" class="w-full h-40 object-cover">
        <div class="p-4">
          <h3 class="text-xl font-bold mb-2">${meal.strMeal}</h3>
          <p>${meal.strInstructions.substring(0, 100)}...</p>
        </div>
      </div>
    `;
    foodSection.innerHTML += mealCard;
  });
}

// Load first category by default when the page loads
window.addEventListener('DOMContentLoaded', () => {
  const firstCategory = 'Potato'; 
  fetchMeals(firstCategory);

  // Manually mark the first button as selected
  const firstButton = document.querySelector('.category-btn[data-category="Potato"]');
  if (firstButton) {
    firstButton.classList.remove('bg-gray-200', 'text-gray-800');
    firstButton.classList.add('bg-orange-500', 'text-white');
  }

  // Add event listeners to category buttons
  addCategoryButtonEventListeners();
});
