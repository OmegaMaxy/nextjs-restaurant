import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../util/prisma";
import APIUtils from '../../../../util/APIUtils'


export default async function handle(req: NextApiRequest, res: NextApiResponse) {

    try {

        const body = req.body
        if (!req.query.user_id) return APIUtils.throwError(res)
        if (!body.name) return APIUtils.throwError(res)
        if (!body.icon) return APIUtils.throwError(res)

        const user = await prisma.user.update({
            where: {
                id: Number(req.query.user_id),
            },
            data: {
                name: body.name,
                icon: body.icon,
            }
        })

        res.status(200).json({ user })
    } catch (error) {
        res.status(500).json({ error: error, errorMessage: 'Something went wrong...' })
    }
}