import { v4 as uuidv4 } from "uuid";
import db from "../../../lib/database";
import { submission } from "../../../lib/schemas";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";


export async function POST(request) {
    const session = await getServerSession(authOptions);
    const user_id = session?.user_id
    if (!session || !user_id) {
        return Response.json({ error: 'Unauthorized'}, { status: 401 });
    }

    // TODO: check if user already has a submission

    const body = await request.json()

    const { error } = submission.validate(body)
    if (error) {
        return Response.json({ error: error.message }, { status: 400 })
    }

    const demo = body["demographic"]
    const house = body["household"]
    const submission_id = uuidv4()
    const demo_id = uuidv4()
    const house_id = uuidv4()

    // TODO: should be done in a transaction
    try {
        await db.execute(`
            INSERT INTO demographics (id, age, gender, ethnicity, education, employment) 
            VALUES (?, ?, ?, ?, ?, ?)
        `, demo_id, demo["age"], demo["gender"], demo["ethnicity"], demo["education"], demo["employment"]);
        await db.execute(`
            INSERT INTO households (id, address, size, type, owner) VALUES (?, ?, ?, ?, ?);
        `, house_id, house["address"], house["size"], house["type"], house["owner"]);
        await db.execute(`
            INSERT INTO responses (id, user_id, house_id, demo_id) VALUES (?, ?, ?, ?);
        `, submission_id, user_id, house_id, demo_id);
    } catch {
        return Response.json( { error: 'Error' }, { status: 500 })
    }

    return Response.json({ submission_id }, { status: 200 })
}