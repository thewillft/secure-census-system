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

export async function GET(request) {
    const session = await getServerSession(authOptions);
    const user_id = session?.user_id
    if (!session || !user_id) {
        return Response.json({ error: 'Unauthorized'}, { status: 401 });
    }

    const submissions = await db.query(`
        SELECT 
            R.id as r_id, R.user_id as r_user_id, created_at, 
            user_id, age, size, type, owner, address,
            gender, ethnicity, education, employment
        FROM 
            responses as R 
        JOIN demographics as D
        JOIN households as H
        WHERE r_user_id = ?;
    `, user_id);
    if (submissions.length < 1) {
        return Response.json({ error: `Submission for user with id ${user_id} not found`}, { status: 404 });
    }
    const submission = submissions[0];

    if (user_id != submission['user_id']) {
        return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const resp_body = {
        id: submission['r_id'],
        household: {
            size: submission['size'],
            type: submission['type'],
            owner: submission['owner'],
            address: submission['address']
        },
        demographic: {
            age: submission['age'],
            gender: submission['gender'],
            ethnicity: submission['ethnicity'],
            education: submission['education'],
            employment: submission['employment']
        },
        created_at: submission['created_at']
    }

    return Response.json(resp_body, { status: 200 });
}