import { v4 as uuidv4 } from 'uuid';
import { getServerSession } from "next-auth/next";
import { authOptions } from "../[...nextauth]/route";
import { aesCreateKey } from '../../../../lib/encryption';
import db from '../../../../lib/database'


export async function GET(request) {
    const session = await getServerSession(authOptions);
    const user_id = session?.user_id
    if (!session || !user_id) {
        return Response.json({ error: 'Unauthorized'}, { status: 401 });
    }

    const keys = await db.query(`
        SELECT 
            aes_key
        FROM 
            encryption_keys
        WHERE user_id = ?;
    `, user_id);
    if (keys.length == 1) {
        return Response.json({ aes: keys[0]['aes_key'] }, { statusCode: 200 })
    }

    const id = uuidv4()
    const aesKey = aesCreateKey();

    await db.execute(`
        INSERT INTO 
            encryption_keys (id, user_id, aes_key) 
        VALUES 
            (?, ?, ?);`,
        id, user_id, aesKey);

    return Response.json({ aes: aesKey }, { statusCode: 200 })
}