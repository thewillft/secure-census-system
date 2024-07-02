import db from "../../../../../lib/database";

export async function GET(request, { params: { id } }) {
    const submissions = await db.query(`
        SELECT 
            R.id as r_id, created_at, 
            user_id, age, size, type, owner, address,
            gender, ethnicity, education, employment
        FROM 
            responses as R 
        JOIN demographics as D
        JOIN households as H
        WHERE R.id = ?;
    `, id);
    if (submissions.length < 1) {
        return Response.json({ error: `Submission with id ${id} not found`}, { status: 404 });
    }
    const submission = submissions[0];

    // TODO: check if submission['user_id'] matches authenticated user_id

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