import axios from 'axios'
import { BASE_URL } from "./config"

export const GetCategory = async () => {
    return await axios.get(`${BASE_URL}category`, {
        "headers": {
            'Content-Type': 'application/json'
        }
    })
}

export const GetAllPlaces = async () => {
    return await axios.get(`${BASE_URL}places`, {
        "headers": {
            'Content-Type': 'application/json'
        }
    })
}
export const GetCategoryPlaces = async (id) => {
    return await axios.get(`${BASE_URL}place/categoryplace/${id}`, {
        "headers": {
            'Content-Type': 'application/json'
        }
    })
}
export const GetAllPlace = async (id) => {
    return await axios.get(`${BASE_URL}place/${id}`, {
        "headers": {
            'Content-Type': 'application/json'
        }
    })
}