import axios from "axios";
import normalizeMeal from "../utils/mappers";

const API_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: API_URL,
});

/* PREGUNTAR A ANTONIO SI ESTO ES UNA GUARRADA Y CAMBIAR A USECONTEXT */
export const cache = {
  categories: {},
  areas: {},
  random: null,
  fullCatalog: null,
};
/* ------ */

// Obtener receta aleatoria -> hero
export const getRandomMeal = async () => {
  if (cache.random) return cache.random;

  try {
    const res = await api.get("random.php");
    const meal = res.data.meals
      ? normalizeMeal(res.data.meals[0])
      : null;
    cache.random = meal;
    return meal;
  } catch (error) {
    console.error("Error fetching random meal:", error.message);
    throw error;
  }
};

// Obtener por categoría:
export const getMealsByCategory = async (category) => {
  if (cache.categories[category]) return cache.categories[category];
  try {
    // endpoint: filter.php?c=NombreCategoria
    const res = await api.get(`filter.php?c=${category}`);
    const meals = res.data.meals
      ? res.data.meals.map(normalizeMeal)
      : [];
    cache.categories[category] = meals;
    return meals;
  } catch (error) {
    console.error(`Error fetching category ${category}:`, error.message);
    throw error;
  }
};

// Obtener una receta por id (todos los detalles):
export const getMealById = async (id) => {
  try {
    const res = await api.get(`lookup.php?i=${id}`);
    return res.data.meals ? normalizeMeal(res.data.meals[0]) : null;
  } catch (error) {
    console.error("Error fetching recipe details:", error.message);
    throw error;
  }
};

// buscar por nombre, ingrediente, categoria o país
export const getRecipesByTerm = async (term) => {
  try {
    const query = term.toLowerCase().trim();

    const [searchByName, searchByIngredient, searchByCategory, searchByArea] =
      await Promise.all([
        api.get(`search.php?s=${query}`),
        api.get(`filter.php?i=${query}`),
        api.get(`filter.php?c=${query}`),
        api.get(`filter.php?a=${query}`),
      ]);

    const resultsByName = searchByName?.data?.meals || [];
    const resultsByIngredient = searchByIngredient?.data?.meals || [];
    const resultsByCategory = searchByCategory?.data?.meals || [];
    const resultsByArea = searchByArea?.data?.meals || [];

    const combinedResults = [
      ...resultsByName,
      ...resultsByIngredient,
      ...resultsByCategory,
      ...resultsByArea,
    ];

    const uniqueMeals = Array.from(
      new Map(combinedResults.map((meal) => [meal.idMeal, meal])).values()
    );

    return uniqueMeals.map(normalizeMeal);
  } catch (error) {
    console.error(`Error searching ${term}:`, error.message);
    throw error;
  }
};

// obtener las más recientes
export const getLatestRecipes = async () => {
  try {
    const res = await api.get("latest.php");
    const meals = res.data.meals || [];
    return meals.map(normalizeMeal);
  } catch (error) {
    console.error("Error fetching latest recipes:", error.message);
    throw error;
  }
};

// Obtener el catálogo completo (A-Z) de forma optimizada
export const getAllRecipes = async () => {
  if (cache.fullCatalog) return cache.fullCatalog;

  try {
    const alphabet = "abcdefghijklmnopqrstuvwxyz0123456789".split("");

    const requests = alphabet.map((char) => api.get(`search.php?f=${char}`));
    const res = await Promise.all(requests);

    const allMeals = res
      .flatMap((res) => res.data.meals)
      .filter((meal) => meal && meal !== null);

    const uniqueMeals = Array.from(
      new Map(allMeals.map((meal) => [meal.idMeal, meal])).values()
    );

    const normalizedData = uniqueMeals.map(normalizeMeal);

    cache.fullCatalog = normalizedData;

    return normalizedData;
  } catch (error) {
    console.error("Error fetching full catalog:", error.message);
    throw error;
  }
};

// obtener todas las áreas o regiones
export const getAllAreas = async () => {
  try {
    const res = await api.get("list.php?a=list");
    // La API devuelve { meals: [ { strArea: "American" }, ... ] }
    return res.data.meals || [];
  } catch (error) {
    console.error("Error fetching areas:", error.message);
    throw error;
  }
};

// obtener recetas por area
export const getMealsByArea = async (area) => {
  if (cache.areas[area]) return cache.areas[area];

  try {
    const res = await api.get(`filter.php?a=${area}`);
    const meals = res.data.meals
      ? res.data.meals.map(normalizeMeal)
      : [];

    cache.areas[area] = meals;
    return meals;
  } catch (error) {
    console.error(`Error fetching meals for area ${area}:`, error.message);
    throw error;
  }
};
