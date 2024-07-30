import db from "../../../lib/database";

export async function GET(request) {
    const submissions = await db.query(`
        SELECT 
            R.id as r_id, D.id as d_id, H.id as h_id,
            demo_id, house_id, age, size, type, owner,
            gender, ethnicity, education, employment
        FROM 
            responses as R 
        JOIN demographics as D ON demo_id = d_id
        JOIN households as H ON house_id = h_id;
    `);

    const ages = [];
    const genders = [];
    const ethnicities = []
    for (const submission of submissions) {
        ages.push(submission['age']);
        genders.push(submission['gender']);
        ethnicities.push(submission['ethnicity']);
    }

    console.log(submissions)

    const resp_body = {
        submissions: submissions.length,
        age: {
            '18-24': ages.filter(a => a >= 18 && a <= 24).length / ages.length,
            '25-34': ages.filter(a => a >= 25 && a <= 34).length / ages.length,
            '35-54': ages.filter(a => a >= 35 && a <= 54).length / ages.length,
            '55+': ages.filter(a => a >= 55).length / ages.length,
        },
        gender: {
            male: genders.filter(g => g === 'male').length / genders.length,
            female: genders.filter(g => g === 'female').length / genders.length,
            other: genders.filter(g => g === 'other').length / genders.length,
        },
        ethnicity: {
           white: ethnicities.filter(e => e === 'white').length / ethnicities.length,
           black: ethnicities.filter(e => e === 'black').length / ethnicities.length,
           hispanic: ethnicities.filter(e => e === 'hispanic').length / ethnicities.length,
           asian: ethnicities.filter(e => e === 'asian').length / ethnicities.length,
           other: ethnicities.filter(e => e === 'other').length / ethnicities.length, 
        }

    }

    return Response.json(resp_body, { status: 200 });
}