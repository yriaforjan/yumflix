import "./HeroSkeleton.css";

const HeroSkeleton = () => {
  return (
    <div className="hero-skeleton">
      <div className="hero-skeleton-content">
        <div className="shimmer sk-title"></div>
        <div className="shimmer sk-tags"></div>
        <div className="shimmer sk-desc"></div>
        <div className="hero-skeleton-buttons">
          <div className="shimmer sk-button"></div>
          <div className="shimmer sk-button"></div>
        </div>
      </div>
      
      <div className="hero-fade-bottom" />
    </div>
  );
};

export default HeroSkeleton;
