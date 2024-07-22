import { v4 as uuidv4 } from "uuid";
import db from "../../../lib/database";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";


export async function POST(req) {
    const session = await getServerSession(authOptions);
    const user_id = session?.user_id
    const user_role = session?.user?.role
    if (!session || !user_id) {
        return Response.json({ error: 'Unauthorized'}, { status: 401 });
    }

    const body = await req.json()
    const route = body['route']

    // check user role has permission to access route
    if (!user_role || (route.includes('admin') && user_role !== 'admin')) {
        return Response.json({ error: 'Unauthorized'}, { status: 401 });
    }

    // START audit logging middleware

    const logId = uuidv4()
    const action = req.method

    await db.execute(`
        INSERT INTO audit_logs (id, user_id, action, target, ip_address, date) 
        VALUES (?, ?, ?, ?, ?, ?)
    `, logId, user_id, action, route, null, (new Date()).toISOString());

    // END audit logging middleware

    return Response.json({}, { status: 200 })
}