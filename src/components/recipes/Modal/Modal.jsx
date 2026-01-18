import { FaTimes, FaPlay, FaPlus, FaCheck, FaThumbsUp } from "react-icons/fa";
import { useModalData, useModalActions } from "../../../context/ModalContext/ModalContext";
import { useUserData, useUserActions } from "../../../context/UserContext/UserContext";
import { truncateText } from "../../../utils/formatters";
import Portal from "../../Portal/Portal";
import useBodyScrollLock from "../../../hooks/useBodyScrollLock";
import "./Modal.css";

const Modal = () => {
  const { isOpen, content } = useModalData();
  const { closeModal, openFullView } = useModalActions();

  const { myList, favorites } = useUserData();
  const { toggleMyList, toggleLike } = useUserActions();

  useBodyScrollLock(isOpen);

  if (!isOpen || !content) return null;

  const isInList = myList.some((item) => item.id === content.id);
  const isLiked = favorites.includes(content.id);

  return (
    <Portal>
      <div className="modal-overlay" onClick={closeModal}>
        <div
          className="modal-content"
          onClick={(e) => e.stopPropagation()}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          <button
            className="modal-close-btn"
            onClick={closeModal}
            aria-label="Close modal"
          >
            <FaTimes />
          </button>

          <div className="modal-header">
            <img src={content.image} alt={content.title} />
            <div className="modal-header-gradient" />

            <div className="modal-header-info">
              <h1 id="modal-title" className="modal-title">
                {content.title}
              </h1>

              <div className="modal-buttons">
                <button
                  className="hero-btn play"
                  onClick={() => openFullView(content)}
                >
                  <FaPlay /> Play
                </button>

                <button
                  className={`icon-btn round ${isInList ? "active" : ""}`}
                  onClick={() => toggleMyList(content)}
                  aria-label={
                    isInList ? "Remove from My List" : "Add to My List"
                  }
                >
                  {isInList ? <FaCheck /> : <FaPlus />}
                </button>

                <button
                  className={`icon-btn round ${isLiked ? "liked" : ""}`}
                  onClick={() => toggleLike(content.id)}
                  aria-label={isLiked ? "Unlike" : "Like"}
                >
                  <FaThumbsUp />
                </button>
              </div>
            </div>
          </div>

          <div className="modal-body">
            <div className="modal-left-col">
              <div className="modal-meta-row">
                <span className="match-score">{content.match}% Match</span>
                <span>{content.area}</span>
              </div>
              <p className="modal-description">
                {content.description
                  ? truncateText(content.description, 250)
                  : "No description available for this recipe."}
              </p>
            </div>
            <div className="modal-right-col">
              <div className="modal-tags-line">
                <span className="label">Ingredients:</span>
                <span className="value">
                  {content.ingredients && content.ingredients.length > 0
                    ? content.ingredients
                      .slice(0, 5)
                      .map((item) => item.name)
                      .join(", ")
                    : "See full details..."}
                  {content.ingredients &&
                    content.ingredients.length > 5 &&
                    "..."}
                </span>
              </div>
              <div className="modal-tags-line">
                <span className="label">Tags:</span>
                <span className="value">
                  {content.category}, {content.area} Cuisine
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Portal>
  );
};

export default Modal;
