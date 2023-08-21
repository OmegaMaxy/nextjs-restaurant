

export default class Formatting {
    public static format(amount: number) {
        amount = (amount / 100) * 100
        return `$ ${amount}`
    }
}