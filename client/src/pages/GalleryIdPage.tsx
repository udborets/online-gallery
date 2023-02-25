import { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import useServer from "../hooks/useServer";
import { RoutePaths } from "../utils/consts";
import IUserInfo from './../models/IUserInfo';

const GalleryIdPage = () => {
  const { id: paramId } = useParams();
  const { getUserById } = useServer();
  const [userPageInfo, setUserPageInfo] = useState<any | IUserInfo>(null);
  const navigate = useNavigate();
  if (!paramId) {
    navigate(RoutePaths.NOTFOUND);
    return;
  }
  useEffect(() => {
    getUserById(paramId).then((user) => {
      setUserPageInfo(user);
    })
  })
  return (
    <div>
      {userPageInfo && userPageInfo.id}
    </div>
  )
}

export default GalleryIdPage