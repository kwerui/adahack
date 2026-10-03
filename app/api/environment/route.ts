import { NextResponse } from 'next/server';
import { getEnvironment, LookupError } from '@/lib/environment-server';
export async function GET(request:Request){
 try{return NextResponse.json(await getEnvironment(new URL(request.url).searchParams.get('postcode') || ''))}
 catch(error){return NextResponse.json({error:error instanceof LookupError?error.message:'Could not load local data. Please try again.'},{status:error instanceof LookupError?error.status:503})}
}
