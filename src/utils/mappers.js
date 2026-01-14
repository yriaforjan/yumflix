const normalizeMeal = (meal) => {
  if (!meal) return null;

  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];
    // si hay ingrediente y no está vacío, lo guardamos
    if (ingredient && ingredient.trim() !== "") {
      ingredients.push({
        name: ingredient,
        measure: measure ? measure.trim() : "",
      });
    }
  }

  return {
    id: meal.idMeal,
    title: meal.strMeal,
    image: meal.strMealThumb,
    category: meal.strCategory || "General",
    area: meal.strArea || "World",
    description: meal.strInstructions || "",
    tags: meal.strTags ? meal.strTags.split(",") : [],
    ingredients: ingredients,
    match: Math.floor(Math.random() * (100 - 80 + 1)) + 80,
  };
};

export default normalizeMeal;
