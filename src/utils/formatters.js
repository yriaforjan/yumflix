// función para que la S de los step de las instrucciones se pase a mayusc:
export const cleanText = (text) => {
  if (!text) return "";

  return text.replace(/\bstep\s*\d+[:.-]?/gi, "");
};

// función auxiliar para cortar texto largo:
export const truncateText = (string, n) => {
  const cleanString = cleanText(string);
  return cleanString?.length > n
    ? cleanString.substr(0, n - 1) + "..."
    : cleanString;
};

export const createRecipeTags = (meal, ingredientLimit = 2) => {
  if (!meal) return [];

  const ingredientNames = meal.ingredients
    ? meal.ingredients.map((item) => item.name)
    : [];

  const tags = [
    meal.area,
    meal.category,
    ...ingredientNames.slice(0, ingredientLimit),
  ];

  return tags.filter((tag) => tag && tag.trim() !== "");
};
