import { v4 as uuidv4 } from "uuid";
import db from "../../../../lib/database";
import { RegisterRequest } from "../../../../lib/schemas/";
import bcrypt from 'bcrypt';


export async function POST(request) {
    const body = await request.json()

    const { error } = RegisterRequest.validate(body)
    if (error) {
        return Response.json({ error: error.message }, { status: 400 })
    }

    // TODO: check for duplicate emails

    const id = uuidv4()
    const hash = await bcrypt.hash(body['password'], 10);

    await db.execute(`
        INSERT INTO 
            users (id, name, email, password, role, last_login) 
        VALUES 
            (?, ?, ?, ?, ?, ?);`,
        id, body['name'], body['email'], hash, 'user', null);


    return Response.json({}, { status: 200 });
}