import useUser from '../hooks/useUser';
import "../styles/pages/MePage.scss";

const MePage = () => {
  const { user } = useUser();
  return (
    <div className='me-page'>
      {user ? user.userInfo.name : "no name"}
    </div>
  )
}

export default MePage