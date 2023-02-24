import useUser from '../hooks/useUser';

const MePage = () => {
  const { user } = useUser();
  return (
    <div>
      {user ? user.userInfo.name : "no name"}
    </div>
  )
}

export default MePage