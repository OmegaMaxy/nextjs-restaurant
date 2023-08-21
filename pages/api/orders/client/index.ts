import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../util/prisma";
import APIUtils from '../../../../util/APIUtils'
import moment from "moment";

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
    try {

        if (!req.query.date) return APIUtils.throwError(res, 'Date is missing.')

        const date = req.query.date

        const orders = await prisma.order.findMany({
            where: {
                created_at: {
                    equals: moment(date).toISOString() // in
                }
            },
        })
        
        res.status(200).json({ orders })
    } catch (error) {
        res.status(500).json({ error, errorMessage: 'Something went badly wrong.' })
    }
}