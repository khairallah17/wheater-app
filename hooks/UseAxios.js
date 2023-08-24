import { useState, useEffect } from 'react'

const UseAxios = (configObj) => {

    const {
        axiosInstance,
        method,
        url,
        requestConfig = {}
    } = configObj

    const [response, setResponse] = useState([])
    const [error, setError] = useState()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const controller = new AbortController()

        const fetchData = async () => {
            try {
                
                const { data } = await axiosInstance[method.toLowerCase()](url, {
                    ...requestConfig,
                    signal: controller.signal()
                })

                setResponse(data)

            } catch (err) {
                console.log(err.message)
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }

        fetchData()

        return () => controller.abort()

    }, [])
    return [loading, response, error]
}

export default UseAxios