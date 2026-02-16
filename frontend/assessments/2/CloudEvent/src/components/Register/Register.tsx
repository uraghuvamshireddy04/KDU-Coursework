import { useDispatch, useSelector } from "react-redux"
import styles from "./Register.module.scss"
import type { AppDispatch, RootState } from "../../app/store";
import { setEmail, setEvent, setMessage, setName } from "../../features/Register/RegisterSplice";
import { getId } from "../../features/Register/RegisterThunk";
import { useNavigate } from "react-router";
import Spinner from "../Spinner";
import ErrorPage from "../ErrorPage";
const Register = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const details = useSelector((state: RootState) => state.register);
    const registerData = {
        name: details.name,
        email: details.email,
        event: details.event,
        message: details.message ?? ""

    }

    if(details.loading)return <Spinner />
    if(details.error)return <ErrorPage />
    const handleRegister= async (e:React.FormEvent) => {
        e.preventDefault();
        try{
            const response = await dispatch(getId(registerData));
            navigate(`/status/${response.payload.id}`)

        }catch(err){
            console.log(err);
        }
    }
  return (
    <div className={styles.main}>
        <h2 className={styles.register}>Registration Page</h2>
        <h2 className={styles.event}>Event Registration</h2>
        <form onSubmit={handleRegister}>
            <div className={styles.form}>
                <div className={styles.options}>
                    <p>Name *</p>
                    <input type="text" required placeholder="Enter your name" value={details.name} minLength={1} maxLength={50} onChange={(e) => dispatch(setName(e.target.value))}/>
                </div>
                <div className={styles.options}>
                    <p>Email *</p>
                    <input type="email" required placeholder="Enter your email" value={details.email} onChange={(e) => dispatch(setEmail(e.target.value))}  />
                </div>
                <div className={styles.options}>
                <label htmlFor="event">Event *</label>   
                 <div>
                    <select name="event" id="event" onChange={(e)=> (dispatch(setEvent(e.target.value)))}>
                    <option value="New Year">New Year</option>  
                    <option value="Holi">Holi</option>
                    <option value="Christmas">Christmas</option>
                    <option value="Comicon">Comicon</option>
                    <option value="Anime">Anime</option>
                </select>  
                </div>   
                </div>     
                <div className={styles.options}>
                    <p>Message (optional)</p>    
                    <textarea onChange={(e)=> dispatch(setMessage(e.target.value))}></textarea>   
                </div>
                <div>
                    <button aria-label="Call register api and go to status page" type="submit">Register for event</button>
                    <p className={styles.required}>* Required Fields</p>
                </div>
         </div>
        </form>
    </div>
  )
}

export default Register


