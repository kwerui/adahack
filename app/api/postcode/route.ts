import { NextResponse } from 'next/server';
import { lookupPostcode, LookupError } from '@/lib/environment-server';
export async function GET(request:Request){
 try {return NextResponse.json(await lookupPostcode(new URL(request.url).searchParams.get('postcode') || ''))}
 catch(error){return NextResponse.json({error:error instanceof Error?error.message:'Postcode lookup failed.'},{status:error instanceof LookupError?error.status:503})}
}
