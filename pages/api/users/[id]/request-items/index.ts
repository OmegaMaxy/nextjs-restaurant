import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../../util/prisma";
import APIUtils from "../../../../../util/APIUtils";


export default async function handle(req: NextApiRequest, res: NextApiResponse) {
    try {
        if (!req.query.id) return APIUtils.throwError(res, 'User ID is missing.')

        const requestItems = await prisma.requestItem.findMany({
            where: {
                user_id: Number(req.query.id)
            },
            include: {
                item_group: true,
                project: true
            }
        })

        res.status(200).json({ requestItems })
    } catch (error) {
        console.log(error)
        res.status(500).json({ errorMessage: 'Something went wrong..', error: error })
    }
}