import { useDispatch, useSelector } from "react-redux";
import { useGetTypesQuery } from "../../features/Home/homeApi";
import ErrorPage from "../ErrorPage";
import Spinner from "../Spinner";
import styles from "./Preferences.module.scss"
import type { RootState } from "../../app/store";
import { setDate, setExtras, setFrequency, setHours, setRequirements, setRooms, setServiceType, setStartTime } from "../../features/Preferences/choiseSlice";

const Preferences = () => {
  const dispatch = useDispatch();
  const selector = useSelector((state: RootState) => state.choise);
    const {data, isLoading, isError, error} = useGetTypesQuery();
    if(isLoading) return <Spinner />
    if(isError) return <ErrorPage {...error}/>
  return (
            <div className={styles.options}>
            <div className={styles.pref}>Cleaning Preferences</div>
            <div className={styles.types}>
                <p>What type of cleaning?</p>
               <div className={styles.choise}>
                {data?.types.map((t)=>
                 <button key={t.id} 
                 className={selector.serviceType === t.type ? styles.active : ""}
                onClick={()=> dispatch(setServiceType(t.type))}>{t.type}</button>)}
              </div>            </div>
            <div className={styles.types}>
               <p>How often would you like cleaning?</p>
               <div className={styles.choise}>
                {data?.frequency.map((t)=>
                   <button key={t.id}
                   className={selector.frequency === t.type ? styles.active : ""}
                    onClick={()=> dispatch(setFrequency(t.type))}>{t.type}</button>)}
              </div>  

            </div >
            <div className={styles.types}>
              <h3>Tell us about your home</h3>
              <div className={styles.choise}>
                {data?.rooms.map((t) => (
                  <div key={t.id} className={styles.input}>
                    <button>
                      {t.type}
                      </button>
                    <input type="number" placeholder="Enter count" min={0} onChange={(e) => dispatch(setRooms({name: t.type, count: Number(e.target.value)}))}/>
                  </div>
                ))}
              </div>
            </div>
            <div className={styles.types}>
              <p>Need any extras?</p>
              <div className={styles.choise}>
                {data?.options.map((t)=> 
                <button key={t.id} 
                className={selector.extras.includes(t.type) ? styles.active : ""}
                onClick={()=> dispatch(setExtras(t.type))}>{t.type}</button>)}
              </div>  
            </div>
            <div className={styles.text}>
              <p>Do you have any special requerments?<span>(optional)</span></p>
              <textarea name="area" id="area" onChange={(e) => dispatch(setRequirements(e.target.value))}></textarea>
            </div>
             <div >
              <h3>Choose hours and dates</h3>
              <div className={styles.dates}>
                <div>
                  <p>How many hours?</p>
                  <input type="number" value={selector.hours}  placeholder="Enter number of hours"  required min={1} onChange={(e) => dispatch(setHours(Number(e.target.value)))}/>
                </div>
                <div>
                  <p>Choose a date?</p>
                  <input type="date" value={selector.date} name="date" id="date" required onChange={(e) => dispatch(setDate(e.target.value))} />
                </div>
              </div>
              <div className={styles.types}>
                <p>When do you like to start?</p>
                <div className={styles.choises} >
                 {data?.time.map((t)=> 
                 <button key={t.id}
                 className={selector.startTime === t.time ? styles.active : ""}
                  onClick={()=> dispatch(setStartTime(t.time))}>{t.time}</button>)}
                </div>
              </div>
            </div>
            </div>
  )
}

export default Preferences