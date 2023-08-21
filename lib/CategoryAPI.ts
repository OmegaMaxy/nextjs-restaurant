import { Order, DataResponse, ResponseError } from './types'
import PREDEFINED_API_URL from './api_url'
import APIUtils from '../util/APIUtils'

export default class CategoryAPI {
    static API_URL = PREDEFINED_API_URL + '/categories'


    public static async get(order_id: number): Promise<Order> {
        const res = await fetch(`${this.API_URL}/${order_id}`)
        const data = await res.json()
        return data
    }

    public static async getAll() {
        const res = await fetch(`${this.API_URL}`)
        const data = await res.json()
        return data
    }
}