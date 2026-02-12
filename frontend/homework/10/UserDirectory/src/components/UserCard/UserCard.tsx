import { useNavigate } from "react-router";
import type { User } from "../../store/types/user";
import styles from "./UserCard.module.scss"
interface Props{
    user: User;
}
const UserCard = ({user}: Props) => {
    const navigate = useNavigate();
  return (
    <div className={styles.details} onClick={() => navigate(`/user/${user.id}`)}>
        <div><img src={user.image} alt={user.firstName} /></div>
        <div>
            <h3>{user.firstName + " " + user.lastName}</h3>
            <div className={styles.email}>{user.email}</div>
            <div className={styles.phone}>{user.phone}</div>
            <div className={styles.age}>Age: {user.age}</div>
        </div>
    </div>
  )
}

export default UserCard
