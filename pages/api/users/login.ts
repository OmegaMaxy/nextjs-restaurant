import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../util/prisma";
import APIUtils from '../../../util/APIUtils'


// Login
export default async function handle(req: NextApiRequest, res: NextApiResponse) {

    try {

        const body = req.body
        if (!body.email_address) return APIUtils.throwError(res)
        if (!body.password) return APIUtils.throwError(res)

        const user = await prisma.user.findFirst({
            select: {
                id: true,
                name: true,
                icon: true,
                email_address: true,
                password: false,
            },
            where: {
                email_address: body.email_address,
                password: await APIUtils.encryptPassword(body.password),
            }
        })

        res.status(200).json({ user })
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error, errorMessage: 'Something went wrong...' })
    }
}