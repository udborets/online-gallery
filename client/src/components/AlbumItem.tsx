import { IdbAlbum } from "../models/dbTypes";

const AlbumItem = (album: IdbAlbum) => {
  return (
    <div className="album">
      <div>
        {album.name}
      </div>
    </div>
  )
}

export default AlbumItem