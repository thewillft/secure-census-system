import { v4 as uuidv4 } from "uuid";
import db from "../../../../lib/database";
import { submission } from "../../../../lib/schemas";


export async function POST(request) {
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
    // TODO: replace "TEMP" with user_id once auth is setup
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
        `, submission_id, "TEMP", house_id, demo_id);
    } catch {
        return Response.json( { error: 'Error' }, { status: 500 })
    }

    return Response.json({ submission_id }, { status: 200 })
}