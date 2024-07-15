import { NextResponse } from 'next/server'


export default async function middleware(req) {

    // only run middleware for API routes
    const path = req.nextUrl.pathname
    if (!path.startsWith('/api') || path.includes('middleware') || path.includes('auth')) {
        return NextResponse.next();
    }

    // create cookies header here for passing to middleware call
    let cookieString = '';
    for (const cookie of req.cookies.getAll()) {
        cookieString = cookieString + `${cookie.name}=${cookie.value}; `
    }
    
    // create our POST request body
    const body = { route: path }

    // send request to our middleware on the backend for processing
    const response = await fetch(
        `${process.env.NEXTAUTH_URL}/api/middleware`, 
        { 
            method: 'POST', 
            headers: {
                cookie: cookieString, 
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body),
        }
    );

    if (!response.ok) {
        return NextResponse.json({ error: 'Invalid status code'}, { status: response.status})
    }
    
    return NextResponse.next()
}
