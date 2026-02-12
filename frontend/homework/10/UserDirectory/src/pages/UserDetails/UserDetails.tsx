import { useNavigate, useParams } from "react-router"
import { useGetUserByIdQuery } from "../../store/slices/userApi";
import Spinner from "../../components/Spinner";
import ErrorPage from "../../components/ErrorPage";
import styles from "./UserDetails.module.scss"

const UserDetails = () => {
    const navigate = useNavigate();
    const {id} = useParams<{id: string}>();
    if(!id)return <ErrorPage />
    const {data: user, isLoading, isError, error} = useGetUserByIdQuery(Number(id));
    if(isLoading)return <Spinner />
    if(isError) return <ErrorPage {...error}/>
  return (
    <div className={styles.userPage}>
        <button onClick={() => navigate('/')} aria-label="Go to home page">Back to Directory</button>
        <div className={styles.user}>
            <div className={styles.userInfo}>
                <div><img src={user?.image} alt={user?.firstName} /></div>
            <div className={styles.info}>
                <h2>{user?.firstName + " " + user?.lastName}</h2>
                <div className={styles.id}>ID: {user?.id}</div>
            </div>
            </div>
            <div className={styles.userPersonal}>
                <div className={styles.contactInfo}>
                    <h4>Contact Information</h4>
                    <div className={styles.email}>Email:<span>{user?.email}</span></div>
                    <div className={styles.phone}>Phone:<span>{user?.phone}</span></div>
                </div>
                <div className={styles.personalInfo}>
                    <h4>Personal Information</h4>
                    <div className={styles.age}>Age:<span>{user?.age}</span></div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default UserDetails