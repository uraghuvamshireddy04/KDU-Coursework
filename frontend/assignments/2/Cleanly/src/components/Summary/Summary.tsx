import { useSelector } from "react-redux"
import styles from "./Summary.module.scss"
import type { RootState } from "../../app/store"
import { useGetTypesQuery } from "../../features/Home/homeApi"
import { BASE_PRICE } from "../../utils/config"
const Summary = () => {
const {serviceType, date, hours, startTime, frequency, extras, rooms, requirements}  = useSelector((state: RootState) => state.choise)
const selector = useSelector((state: RootState) => state.details);
const { data } = useGetTypesQuery();

const calculateTotal = () => {
    if (!data) return 0;

    const price = BASE_PRICE; 
    const selectedType = data.types.find((t: any) => t.type === serviceType);
    const typeMultiplier = selectedType ? selectedType.price : 0;
    const serviceCost = price * typeMultiplier * hours;

    const extrasCost = extras.reduce((total: number, extraName: string) => {
      const extraItem = data.options.find((t: any) => t.type === extraName);
      return total + (extraItem ? extraItem.price : 0);
    }, 0);

    return serviceCost + extrasCost;
  };

  const total = calculateTotal();
  return (
    <div className={styles.summaryContainer}>
      <h3>Booking Summary</h3>
      <p>{serviceType}</p>
      <p>{frequency}</p>
      {startTime && <p>{date} at {startTime}</p>}
      {serviceType && <p>{hours} hours</p>}
       {extras.length > 0 && <h4>Extras: </h4>}
      {extras.map((e) => <p key={e}>{e}</p>)}
      <p>{requirements}</p>
      {rooms.length > 0 && <h4>Rooms: </h4>}
      {rooms.map((r)=> <p key={r.name}>{r.name}-{r.count}</p>)}
      <p>{selector.address}</p>
      <h3>Total Cost: ${total}</h3>
    </div>
  )
}

export default Summary