import { useEffect, useState } from "react"
import { DEBOUNCE_TIME } from "../config/Config"

export const useDebounce = <T>(value: T, delay = DEBOUNCE_TIME) =>{
    const [debouncedValue, setDebouncedValue] = useState(value)
    useEffect(()=> {
        const timeout = setTimeout(() => {
            setDebouncedValue(value)
        },delay)
        return () => clearTimeout(timeout)
    },[value, delay])
    return debouncedValue;
}