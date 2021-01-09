import { useState, useEffect } from 'react'


export const fetchPayments = () => fetch('https://darthvader.fronix.se/payment-api/users')
.then(x => x.json())
.then(result => result,
(error) => error) 

const useGetAllPayments = () => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [payments, setPayments] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchPayments()
        .then(result => {
            setIsLoaded(true);
            setPayments(result);
        },
        (error) => {
            setIsLoaded(true);
            setError(error);
        })
    }, [])

    return { payments, error, isLoaded, setPayments };
}

export default useGetAllPayments;