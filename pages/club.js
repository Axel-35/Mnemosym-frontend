import Club from '../components/Club'
// Redux
import { useSelector } from "react-redux";
function ClubPage() {
  const user = useSelector((state) => state.user.value);
   if(!user.isAdmin) {
    return (
      <div>
        <p>Error 404</p>
      </div>
  );
    }
  return <Club />
}

export default ClubPage;