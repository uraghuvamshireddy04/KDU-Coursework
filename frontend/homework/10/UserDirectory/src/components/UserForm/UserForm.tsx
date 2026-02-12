import { useState } from "react"
import { useAddUserMutation } from "../../store/slices/userApi";
import Spinner from "../Spinner";
import ErrorPage from "../ErrorPage";
import styles from "./UserForm.module.scss"

const UserForm = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [age, setAge] = useState(0);
    const [email, setEmail] = useState("");

    const [addUser, {isLoading, isError, error}] = useAddUserMutation();
    if(isLoading)return <Spinner />
    if(isError)return <ErrorPage {...error} />
    const handleUser = async(e: React.SubmitEvent)=> {
        e.preventDefault();
        if(!firstName.trim() || !lastName.trim() || !email.trim() || (age < 1 || age > 120))return;
        try{
            await addUser({firstName, lastName, email, age}).unwrap();
            alert("User added successfully");
            setAge(0);
            setEmail("");
            setFirstName("");
            setLastName("");

        }catch(error){
            console.error("Failed to add user: ", error);
        }
    }
  return (
    <div className={styles.userForm}>
        <h3>Add New User</h3>
        <form onSubmit={handleUser}>
            <div className={styles.formdetails}>
                <div>
                    <p>First Name</p>
                    <input type="text"value={firstName} required onChange={(e) => setFirstName(e.target.value) } placeholder="Enter first name"/>
                </div>
                <div>
                    <p>Last Name</p>
                    <input type="text"value={lastName} required onChange={(e) => setLastName(e.target.value)} placeholder="Enter last name"/>
                </div>
                <div>
                    <p>Email</p>
                    <input type="email"value={email} required onChange={(e) => setEmail(e.target.value)} placeholder="Enter email"/>
                </div>
                <div>
                    <p>Age</p>
                    <input type="number" value={age} required onChange={(e) => setAge(Number(e.target.value))} placeholder="Enter age"/>
                </div>
            </div>
            <div>
                <button type="submit" aria-label="Submit user details to post">Add User</button>
            </div>
        </form>
    </div>
  )
}

export default UserForm