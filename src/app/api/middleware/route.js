import { v4 as uuidv4 } from "uuid";
import db from "../../../lib/database";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";


export async function POST(req) {
    const session = await getServerSession(authOptions);
    const user_id = session?.user_id
    if (!session || !user_id) {
        return Response.json({ error: 'Unauthorized'}, { status: 401 });
    }

    const body = await req.json()


    // START audit logging middleware

    const logId = uuidv4()
    const action = req.method
    const target = body['route']

    await db.execute(`
        INSERT INTO audit_logs (id, user_id, action, target, ip_address, date) 
        VALUES (?, ?, ?, ?, ?, ?)
    `, logId, user_id, action, target, null, (new Date()).toISOString());

    // console.log(await db.query(`select * from audit_logs;`))

    // END audit logging middleware

    return Response.json({}, { status: 200 })
}