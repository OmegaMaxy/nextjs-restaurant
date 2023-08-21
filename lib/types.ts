/**
 * Model User
 * 
 */
export type User = {
    id: number
    name: string
    email_address: string
    icon: string | null
    password: string
    created_at: Date
    updated_at: Date
}
/**
 * Model Order
 * 
 */
export type Order = {
    id: number
    order_nr: number
    order_items: OrderItem[]
    created_at: Date
    updated_at: Date
}

/**
 * Model OrderItem
 * 
 */
export type OrderItem = {
    id: number
    order: Order
    item: Item
    amount: number
    created_at: Date
}

/**
 * Model Item
 * 
 */
export type Item = {
    id: number
    category: Category
    name: string
    created_at: Date
    updated_at: Date
}

/**
 * Model Category
 * 
 */
export type Category = {
    id: number
    name: string
    created_at: Date
    updated_at: Date
}

export type Event = {
    event: "order-placed" | "order-removed",
    message: any
}

export type ResponseError = {
    error: string,
    errorMessage: string,
}

export type DataResponse<T> = {
    res: T | ResponseError
}