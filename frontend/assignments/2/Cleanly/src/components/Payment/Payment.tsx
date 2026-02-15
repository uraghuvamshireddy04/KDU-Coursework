import { useDispatch, useSelector } from "react-redux";
import styles from "./Payment.module.scss"
import { setAddress, setCardName, setCardNumber, setCvv, setEmail, setMonth, setPhone, setYear } from "../../features/Details/detailsSplice";
import type { RootState } from "../../app/store";
import { useNavigate } from "react-router-dom";
import { useCreateBookingMutation } from "../../features/Home/homeApi";
import Spinner from "../Spinner";

const Payment = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const preferences = useSelector((state: RootState) => state.choise);
    const details = useSelector((state: RootState) => state.details);
    const [createBooking, { isLoading }] = useCreateBookingMutation();
    const handleSubmit = async(e: React.FormEvent)=> {
        e.preventDefault();
        if(!preferences.serviceType || !preferences.frequency || !preferences.rooms || !preferences.date || preferences.hours <0 || !preferences.startTime ){
            alert("Please complete your cleaning preferences first.");
            return;
        }
        else if(details.cardNumber.length != 12 ){
            alert("Check your card number");
            return;
        }
        else if(details.phone.length != 10 ){
            alert("Check your phone number");
            return;
        }
        const booking = {...preferences, ...details};
        try{
            await createBooking(booking).unwrap();
            navigate("/success");
        }catch(err: any){
            console.error(err);
            alert("Booking Failed, try again ")
        }
    }
  return (
    <form className={styles.payment} onSubmit={handleSubmit}>
        <h3>Payment Method</h3>
        <p>Credit Card Details</p>
        <div className={styles.inputs}>
            <input type="number" required placeholder="Card Number" value={details.cardNumber} minLength={12} maxLength={12} onChange={(e) => dispatch(setCardNumber(e.target.value))}/>
           <div className={styles.values}>
            <input type="number" required placeholder="MM" min={1} max={12} value={details.month} onChange={(e) =>dispatch(setMonth(Number(e.target.value)))} />
            <input type="number" required placeholder="YY" min={2000} max={2026} value={details.year} onChange={(e) => dispatch(setYear(Number(e.target.value)))} />
            <input type="number" required placeholder="CVV" minLength={4} maxLength={4} value={details.cvv} onChange={(e) => dispatch(setCvv(e.target.value))}/>
            <input type="text" required placeholder="Name as on card" value={details.cardName}  onChange={(e) => dispatch(setCardName(e.target.value))}/>

           </div>
        </div>

        <p>Personal Details</p>
        <div className={styles.personal}>
            <div className={styles.values}>
            <input type="email" placeholder="Email Address" value={details.email} required onChange={(e) => dispatch(setEmail(e.target.value))}/>
            <input type="number" placeholder="Phone Number" value={details.phone} required minLength={10} maxLength={10} onChange={(e) => dispatch(setPhone(e.target.value))}/>
        </div>
        <div>
            <input type="text" placeholder="Your Full Address" required onChange={(e) => dispatch(setAddress(e.target.value))}/>
        </div>
        <div> <input type="checkbox" required /><span> Check this custom checkbox</span></div>
          <div>
            <input type="checkbox" required /><span> I read and agree to the <a href="">terms & conditions</a></span>
          </div>  
        {isLoading ? <Spinner /> : <button className={styles.complete} aria-label="Save booking">Complete Booking via Secure Server</button>}
        </div>
        </form>
  )
}

export default Payment