import {
    useState,
    useEffect
} from "react"
import axios from 'axios';

const useFetch = (url) => {
    const BASE_URL = 'https://localhost:3000/'
    const [isLoading, setIsLoading] = useState(false);
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);
    const [options, setOptions] = useState({});

    const doFetch = (options = {}) => {
        setOptions(options);
        setIsLoading(true);
    };

    useEffect(() => {
        if (!isLoading) {
            return
        }
        axios(BASE_URL + url, options)
            .then(res => {
                console.log('succes', res)
                setIsLoading(false);
                setResponse(res.data);
            }).catch(err => {
                console.log('errrror', err)
                setIsLoading(false);
                setError(err)
            })
    }, [isLoading, options, url])
    return [{
        isLoading,
        response,
        error
    }, doFetch]
}

export default useFetch;