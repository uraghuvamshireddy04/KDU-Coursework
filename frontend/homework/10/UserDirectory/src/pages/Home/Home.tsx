import Spinner from '../../components/Spinner';
import ErrorPage from '../../components/ErrorPage';
import { useGetUsersQuery } from '../../store/slices/userApi';
import UserCard from '../../components/UserCard';
import styles from "./Home.module.scss"
import UserForm from '../../components/UserForm';

const Home = () => {
    const {data, isLoading, isError, error} = useGetUsersQuery();
    if(isLoading)return <Spinner />
    if(isError) return <ErrorPage {...error}/>
  return (
        (data?.users?.length) ? <div >
        <h1>User Directory</h1>
        <UserForm />
       <div className={styles.users}>
         <h2>Total Users: {data?.users.length}</h2>
        <div className={styles.grid}>
            {data?.users?.map((user)=> (<UserCard key={user.id} user={user}/>))}
        </div>
       </div>
    </div> : <div>
        <p>No Users found</p>
    </div>
  )
}

export default Home