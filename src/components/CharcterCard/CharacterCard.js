import HeadLine from "../../basics/HeadLine/HeadLine";
import Image from "../../basics/Image/Image";
import "./CharacterCard.css";

const CharacterCard = ({ image, name, status, species, type, gender }) => {
  return (
    <div className="character-card">
      <Image
        className="character-card__image"
        src={image}
        width={300}
        height={300}
        alt={name}
        aria-hidden="true"
        loading="lazy"
      />
      <div className="character-card__body">
        <HeadLine tag="h2" displayedAs="h4" className="charcter-card__name">
          {name}
        </HeadLine>
        <div className="character-card__gender">Gender: {gender}</div>
        <div className="charcter-card__status">Status: {status}</div>
        <div className="character-card__species">Species: {species}</div>
        <div className="character-card__type">Type: {type}</div>
      </div>
    </div>
  );
};

export default CharacterCard;
