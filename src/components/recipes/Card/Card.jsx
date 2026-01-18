import { useEffect, useState, useRef, memo } from "react";
import {
  FaPlay,
  FaPlus,
  FaCheck,
  FaThumbsUp,
  FaChevronDown,
} from "react-icons/fa";
import { getMealById } from "../../../services/api";
import { useModalActions } from "../../../context/ModalContext/ModalContext";
import { useUserData, useUserActions } from "../../../context/UserContext/UserContext";
import { createRecipeTags } from "../../../utils/formatters";
import useSmartPosition from "../../../hooks/useSmartPosition";
import Portal from "../../Portal/Portal";
import "./Card.css";

const Card = ({ recipe, isHovered, setHoveredCardId }) => {
  const [details, setDetails] = useState(null);
  const hoverTimer = useRef(null);
  const leaveTimer = useRef(null);

  const { coords, origin, calculatePosition } = useSmartPosition();
  const { openModal, openFullView } = useModalActions();
  const { myList, favorites } = useUserData();
  const { toggleMyList, toggleLike } = useUserActions();

  const isInList = myList.some((item) => item.id === recipe.id);
  const isLiked = favorites.includes(recipe.id);

  useEffect(() => {
    let isMounted = true;

    if (isHovered && !details) {
      const fetchDetails = async () => {
        try {
          const fullDetails = await getMealById(recipe.id);
          if (isMounted) {
            setDetails(fullDetails);
          }
        } catch (error) {
          console.error("Error fetching details:", error);
        }
      };
      fetchDetails();
    }

    return () => {
      isMounted = false;
    };
  }, [isHovered, details, recipe.id]);

  const handleMouseEnter = (ev) => {
    if (window.innerWidth <= 768) return;
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

  const handleCardClick = async () => {
    if (window.innerWidth <= 768) {
      if (details) {
        openModal(details);
      } else {
        try {
          const fullDetails = await getMealById(recipe.id);
          setDetails(fullDetails);
          openModal(fullDetails);
        } catch (error) {
          console.error("Error fetching details on click:", error);
          openModal(recipe);
        }
      }
    }
  };

  const handlePortalEnter = () => {
    if (leaveTimer.current) clearTimeout(leaveTimer.current);
  };

  const source = details || recipe;
  const tags = createRecipeTags(source, 2);

  const handleKeyDown = (ev) => {
    if (ev.key === "Enter" || ev.key === " ") {
      ev.preventDefault();
      handleCardClick();
    }
  };

  return (
    <div
      className="card-container"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleCardClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex="0"
      aria-label={`View details for ${recipe.title}`}
    >
      <div className="card-image-wrapper">
        <img
          src={recipe.image}
          alt={recipe.title}
          className="card-img"
          loading="lazy"
          decoding="async"
          width="250"
          height="155"
        />
        <div className="card-overlay">
          <h3 className="card-main-title">{recipe.title}</h3>
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
              <img
                src={recipe.image}
                alt={recipe.title}
                width="450"
                height="253"
                loading="eager"
              />
            </div>

            <div className="card-info">
              <div className="card-actions">
                <div className="left-actions">
                  <button
                    className="icon-btn filled"
                    onClick={(e) => {
                      e.stopPropagation();
                      openFullView(source);
                    }}
                    title="Play"
                    aria-label="Play"
                  >
                    <FaPlay />
                  </button>

                  <button
                    className={`icon-btn ${isInList ? "added" : ""}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleMyList(source);
                    }}
                    title={isInList ? "Remove from My List" : "Add to My List"}
                    aria-label={
                      isInList ? "Remove from My List" : "Add to My List"
                    }
                  >
                    {isInList ? <FaCheck /> : <FaPlus />}
                  </button>

                  <button
                    className={`icon-btn ${isLiked ? "liked" : ""}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleLike(recipe.id);
                    }}
                    title={isLiked ? "Unlike" : "Like"}
                    aria-label={isLiked ? "Unlike" : "Like"}
                  >
                    <FaThumbsUp />
                  </button>
                </div>
                <div className="right-actions">
                  <button
                    className="icon-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      openModal(source);
                    }}
                    title="More info"
                    aria-label="More info"
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

export default memo(Card);
