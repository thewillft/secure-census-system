import db from '../../../../lib/database';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/route';


export async function GET() {
    const session = await getServerSession(authOptions);
    const user_id = session?.user_id
    if (!session || !user_id) {
        return Response.json({ error: 'Unauthorized'}, { status: 401 });
    }

    const logs = await db.query(`
        SELECT 
            id, user_id, action, target, date
        FROM 
            audit_logs
        LIMIT
            100
    `);


    return Response.json(logs, { status: 200 })
}