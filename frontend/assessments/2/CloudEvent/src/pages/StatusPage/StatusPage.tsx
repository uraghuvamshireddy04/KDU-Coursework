import { useParams } from "react-router"
import styles from "./StatusPage.module.scss"
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../app/store";
import { useEffect } from "react";
import { getStatus } from "../../features/Register/RegisterThunk";
import Spinner from "../../components/Spinner";
import ErrorPage from "../../components/ErrorPage";

const StatusPage = () => {
    const {id} = useParams<{id: string}>();
     const dispatch = useDispatch<AppDispatch>();
    const details = useSelector((state: RootState) => state.register);
    useEffect(()=>{
        if(id){
           const response = async()=>{
            try{
                await dispatch(getStatus(id));
            }catch(error){
                console.log(error);
            }
           }
           response();
        }
    }, [id])
     if(details.loading)return <Spinner />
    if(details.error)return <ErrorPage />
  return (
    <div className={styles.statusPage}>
        <h2 className={styles.status}>Status Page</h2>
        <h2 className={styles.register}>Registration Status</h2>
        <div className={styles.content}>
            <h4>Registration Id: {details.id}</h4>
            <p>Name: {details.name}</p>
            <p>Email: {details.email}</p>
            <p>Event: {details.event}</p>
            {details.message ? <p>Message: {details.message}</p>: ""}
            <h4>Status: <span>{details.status}</span></h4>
        </div>
    </div>
  )
}

export default StatusPage