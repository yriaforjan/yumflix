import { useEffect, useState, useRef } from "react";
import {
  FaPlay,
  FaPlus,
  FaCheck,
  FaThumbsUp,
  FaChevronDown,
} from "react-icons/fa";
import { getMealById } from "../../../services/api";
import { useModal } from "../../../context/ModalContext/ModalContext";
import { useUser } from "../../../context/UserContext/UserContext";
import { createRecipeTags } from "../../../utils/formatters";
import useSmartPosition from "../../../hooks/useSmartPosition";
import Portal from "../../Portal/Portal";
import "./Card.css";

const Card = ({ recipe, isHovered, setHoveredCardId }) => {
  const [details, setDetails] = useState(null);
  const hoverTimer = useRef(null);
  const leaveTimer = useRef(null);

  const { coords, origin, calculatePosition } = useSmartPosition();
  const { openModal, openFullView } = useModal();

  const { myList, favorites, toggleMyList, toggleLike } = useUser();

  const isInList = myList.some((item) => item.id === recipe.id);
  const isLiked = favorites.includes(recipe.id);

  useEffect(() => {
    if (isHovered && !details) {
      const fetchDetails = async () => {
        const fullDetails = await getMealById(recipe.id);
        setDetails(fullDetails);
      };
      fetchDetails();
    }
  }, [isHovered, details, recipe.id]);

  const handleMouseEnter = (ev) => {
    if (leaveTimer.current) clearTimeout(leaveTimer.current);
    if (!isHovered) calculatePosition(ev.currentTarget);
    hoverTimer.current = setTimeout(() => {
      setHoveredCardId(recipe.id);
    }, 400);
  };

  const handleMouseLeave = () => {
    if (hoverTimer.current) clearTimeout(hoverTimer.current);
    if (isHovered) {
      leaveTimer.current = setTimeout(() => {
        setHoveredCardId(null);
      }, 200);
    }
  };

  const handlePortalEnter = () => {
    if (leaveTimer.current) clearTimeout(leaveTimer.current);
  };

  const source = details || recipe;
  const tags = createRecipeTags(source, 2);

  return (
    <div
      className="card-container"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="card-image-wrapper">
        <img src={recipe.image} alt={recipe.title} className="card-img" />
        <div className="card-overlay">
          <h4 className="card-main-title">{recipe.title}</h4>
        </div>
      </div>

      {isHovered && (
        <Portal>
          <div
            className="card-hover-modal"
            style={{
              left: coords.left,
              top: coords.top,
              transformOrigin: origin,
            }}
            onMouseEnter={handlePortalEnter}
            onMouseLeave={handleMouseLeave}
          >
            <div className="modal-img-container">
              <img src={recipe.image} alt={recipe.title} />
            </div>

            <div className="card-info">
              <div className="card-actions">
                <div className="left-actions">
                  <button
                    className="icon-btn filled"
                    onClick={() => openFullView(source)}
                  >
                    <FaPlay />
                  </button>

                  <button
                    className={`icon-btn ${isInList ? "added" : ""}`}
                    onClick={() => toggleMyList(source)}
                    title={isInList ? "Remove from My List" : "Add to My List"}
                  >
                    {isInList ? <FaCheck /> : <FaPlus />}
                  </button>

                  <button
                    className={`icon-btn ${isLiked ? "liked" : ""}`}
                    onClick={() => toggleLike(recipe.id)}
                    title="Like"
                  >
                    <FaThumbsUp />
                  </button>
                </div>
                <div className="right-actions">
                  <button
                    className="icon-btn"
                    onClick={() => openModal(source)}
                  >
                    <FaChevronDown />
                  </button>
                </div>
              </div>

              <div className="card-details">
                <h4 className="card-title">{recipe.title}</h4>
                <div className="card-meta">
                  <span className="match-score">{`${recipe.match}% Match`}</span>
                  <span>{details ? details.area : ""}</span>
                </div>
                <div className="card-genres">
                  <ul>
                    {tags.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </Portal>
      )}
    </div>
  );
};

export default Card;
