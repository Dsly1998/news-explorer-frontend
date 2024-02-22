import "./NotFound.css";
import NotFoundIcon from "../../images/not-found.svg";

function NotFound() {
  return (
    <div className="not-found">
      <div className="not-found__container">
        <img
          src={NotFoundIcon}
          alt="Not found icon"
          className="not-found__image"
        />
        <h1 className="not-found__title">Nothing found</h1>
        <p className="not-found__text">Sorry, but nothing matched your search terms.</p>
      </div>
    </div>
  );
}

export default NotFound;
