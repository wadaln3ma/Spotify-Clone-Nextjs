import { getToken } from 'next-auth/jwt'
import { NextRequest, NextResponse } from 'next/server'

export async function middleware(req : NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXT_AUTH_SECRET })

  //const { pathname } = req.nextUrl

  const url = req.nextUrl.clone()
  //url.pathname = '/login'

  if (url.pathname.includes('/api/auth') || token) {
    return NextResponse.next()
  }


  if (!token && url.pathname !== '/login') {
    return NextResponse.redirect(`${url}login`)
  }
}
