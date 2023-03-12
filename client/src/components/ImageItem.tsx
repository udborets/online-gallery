import "../styles/components/PhotoItem.scss";

const PhotoItem = ({ url: photoUrl, name: photoName }:
  { url: string; name: string }) => {
  return (
    <div className="photo-item" key={photoUrl} >
      <div
        className="photo-item__container"
        onClick={() => window.open(photoUrl)}
      >
        <img
          className="photo-item__image"
          src={photoUrl}
        />
        <span
          className="photo-item__name"
          onClick={(e) => e.stopPropagation()}
        >
          {photoName}
        </span>
      </div>
    </div>
  )
}

export default PhotoItem