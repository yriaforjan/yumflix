import { useState, useEffect } from "react";
import { FaPlay, FaInfoCircle } from "react-icons/fa";
import { getRandomMeal } from "../../../services/api";
import { createRecipeTags, truncateText } from "../../../utils/formatters";
import { useLoader } from "../../../context/LoaderContext/LoaderContext";
import { useModal } from "../../../context/ModalContext/ModalContext";
import HeroSkeleton from "./HeroSkeleton";
import "./Hero.css";

const Hero = () => {
  const [recipe, setRecipe] = useState(null);

  const { appLoaded } = useLoader();
  const { openModal, openFullView } = useModal();

  useEffect(() => {
    const fetchRandomMeal = async () => {
      const data = await getRandomMeal();
      if (data) {
        setRecipe(data);
      }
      appLoaded();
    };
    fetchRandomMeal();
  }, [appLoaded]);

  if (!recipe) return <HeroSkeleton />;

  const tags = createRecipeTags(recipe, 2);

  return (
    <section
      className="hero"
      style={{
        "--bg-image": `url("${recipe.image}")`,
      }}
    >
      <div className="hero-content">
        <h1 className="hero-title">{recipe.title.toUpperCase()}</h1>

        <ul className="hero-tags">
          {tags.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>

        <p className="hero-description">
          {truncateText(recipe.description, 150)}
        </p>

        <div className="hero-buttons">
          <button
            className="hero-btn play"
            onClick={() => openFullView(recipe)}
          >
            <FaPlay /> Play
          </button>
          <button className="hero-btn info" onClick={() => openModal(recipe)}>
            <FaInfoCircle /> More Info
          </button>
        </div>
      </div>

      <div className="hero-fade-bottom" />
    </section>
  );
};

export default Hero;
