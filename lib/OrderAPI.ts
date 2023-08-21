import { Order, DataResponse, ResponseError } from './types'
import PREDEFINED_API_URL from './api_url'
import APIUtils from '../util/APIUtils'

export default class OrderAPI {
    static API_URL = PREDEFINED_API_URL + '/orders'


    public static async get(order_id: number): Promise<Order> {
        const res = await fetch(`${this.API_URL}/${order_id}`)
        const data = await res.json()
        return data
    }

    public static async getAllForClient(dateInMilliseconds: number) {
        const res = await fetch(`${this.API_URL}/client?date=${dateInMilliseconds}`)
        const data = await res.json()
        return data
    }
    public static async getAllForAdmin(dateInMilliseconds: number) {
        const res = await fetch(`${this.API_URL}/admin?date=${dateInMilliseconds}`)
        const data = await res.json()
        return data
    }
}