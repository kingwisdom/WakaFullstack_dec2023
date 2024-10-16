import { create } from "zustand"
import toast from "react-hot-toast"
import { axiosInstance } from "../lib/axios"


export const usePlacesStore = create((set) => ({
    places: [],
    loading: false,
    getPlaces: async () => {
        try {
            const res = await axiosInstance.get('/place/allPlaces')
            set({ places: res.data.places })
        } catch (err) {
            console.log(err)
            set({ places: [] })
            toast.error(err.response.data.message || "Something went wrong")
        }
    },
    searchPlaces: async (search) => {
        try {
            set({ loading: true })
            const res = await axiosInstance.get(`place/placesfromapi?loc=${search.search}`)
            // set({ places: res.data })
            console.log(res.data)
            toast.success("Places found")
        } catch (err) {
            console.log(err)
            set({ places: [] })
            toast.error(err.response.data.message || "Something went wrongsss")
        }
        finally {
            set({ loading: false })
        }
    }

}))