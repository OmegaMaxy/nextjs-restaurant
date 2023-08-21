import { User, DataResponse, ResponseError } from './types'
import PREDEFINED_API_URL from './api_url'
import APIUtils from '../util/APIUtils'

export default class UserAPI {
    static API_URL = PREDEFINED_API_URL + '/users'
    

    public static async get(user_id: number): Promise<User> {
        const res = await fetch(`${UserAPI.API_URL}/${user_id}`)
        const data = await res.json()
        return data
    }

    public static async login({ email_address, password } : {email_address: string, password: string}): Promise<any> { // Promise<DataResponse<User>>
        console.log('Logging in with', { email_address, password })
        const res = await fetch(`${this.API_URL}/login`, {
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email_address,
                password,
            }),
            method: 'POST'
        })
        const data = await res.json()
        return data
    }

    public static async createAccount({ name, email_address, password }: { name: string, email_address: string, password: string }) {
        const res = await fetch(`${UserAPI.API_URL}/`, {
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name,
                email_address,
                password,
            }),
            method: 'POST'
        })
        const data = await res.json()
        return data
    }

    public static async updatePassword({ user_id, password }: { user_id: number, password: string }) {
        const res = await fetch(`${UserAPI.API_URL}/${user_id}/update-password`, {
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                {
                    password,
                }
            )
        })
        const data = await res.json()
        return data
    }
    public static async updateAccountData({ user_id, name, icon }: { user_id: number, name: string, icon: string }) {
        const res = await fetch(`${UserAPI.API_URL}/${user_id}/update-account-data`, {
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                {
                    name,
                    icon,
                }
            )
        })
        const data = await res.json()
        return data
    }
}