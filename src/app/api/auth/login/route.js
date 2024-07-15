import db from "../../../../lib/database";
import { LoginRequest } from "../../../../lib/schemas/";
import bcrypt from 'bcrypt';


export async function POST(request) {
    const body = await request.json()

    const { error } = LoginRequest.validate(body)
    if (error) {
        console.log('Invalid request during login')
        return Response.json({ error: 'Invalid login request' }, { status: 400 });
    }

    const { email, password } = body;

    const users = await db.query(`SELECT * FROM users WHERE email = ?;`, email);
    if (users.length < 1) {
      console.log('Invalid email during login')
      return Response.json({ error: 'Email not found' }, { status: 404 });
    }
    const user = users[0];

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      console.log('Passwords did not match during login')
      return Response.json({ error: 'Invalid password' }, { status: 401 });
    }

    return Response.json(user, { status: 200 });
}