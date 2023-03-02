import { IAlbum } from "../models/dbTypes";

const AlbumItem = (album: IAlbum) => {
  return (
    <div className="album">
      <div>
        {album.name}
      </div>
    </div>
  )
}

export default AlbumItem