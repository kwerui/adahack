import type { Environment, GreenPlace } from './community';
export class LookupError extends Error { constructor(message:string,public status:number){super(message)} }
export async function fetchJson(url:string, timeout=10000) {
 const response=await fetch(url,{signal:AbortSignal.timeout(timeout),next:{revalidate:900},headers:{Accept:'application/json','User-Agent':'GreenerByPostcode-AdaHack/1.0 (community environment prototype)'}});
 if(!response.ok) throw new LookupError('The data provider is temporarily unavailable.',502);
 return response.json();
}
export async function lookupPostcode(input:string) {
 const postcode=input.replace(/\s/g,'').toUpperCase();
 if(!/^[A-Z]{1,2}\d[A-Z\d]?\d[A-Z]{2}$/.test(postcode)) throw new LookupError('Enter a full UK postcode, for example E8 1EA.',400);
 let response:Response;
 try {response=await fetch(`https://api.postcodes.io/postcodes/${encodeURIComponent(postcode)}`,{signal:AbortSignal.timeout(8000),next:{revalidate:86400}})}catch{throw new LookupError('Postcode lookup is unavailable. Please try again or explore the demo.',503)}
 if(response.status===404) throw new LookupError('We couldn’t find that postcode. Check it and try again.',404);
 if(!response.ok) throw new LookupError('Postcode lookup is unavailable. Please try again.',503);
 const {result}=await response.json();
 if(!result || !Number.isFinite(result.latitude) || !Number.isFinite(result.longitude)) throw new LookupError('This postcode has no location data.',404);
 return {postcode:result.postcode as string, latitude:result.latitude as number, longitude:result.longitude as number, region:(result.region || result.country || 'United Kingdom') as string, adminDistrict:(result.admin_district || 'Your neighbourhood') as string, outcode:result.outcode as string};
}
function distance(lat1:number,lon1:number,lat2:number,lon2:number){const r=Math.PI/180;const a=Math.sin((lat2-lat1)*r/2)**2+Math.cos(lat1*r)*Math.cos(lat2*r)*Math.sin((lon2-lon1)*r/2)**2;return Math.round(6371000*2*Math.atan2(Math.sqrt(a),Math.sqrt(1-a)))}
export async function getEnvironment(input:string):Promise<Environment>{
 const place=await lookupPostcode(input);
 const {latitude:lat,longitude:lon}=place;
 const result:Environment={postcode:place.postcode,district:place.adminDistrict,region:place.region,lat,lon,demo:false,updated:new Date().toISOString(),air:null,electricity:null,green:null,errors:[]};
 const query=`[out:json][timeout:12];nwr[leisure~"^(park|garden|nature_reserve)$"](around:1500,${lat},${lon});out center;`;
 const start=new Date().toISOString().slice(0,16)+'Z';
 const results=await Promise.allSettled([
  fetchJson(`https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${lat}&longitude=${lon}&current=european_aqi,pm2_5&timezone=Europe%2FLondon`),
  fetchJson(`https://api.carbonintensity.org.uk/regional/intensity/${start}/fw24h/postcode/${encodeURIComponent(place.outcode)}`),
  fetchJson(`https://overpass.private.coffee/api/interpreter?data=${encodeURIComponent(query)}`,16000),
 ]);
 const air=results[0];
 if(air.status==='fulfilled'&&Number.isFinite(air.value.current?.european_aqi)&&Number.isFinite(air.value.current?.pm2_5)) result.air={aqi:air.value.current.european_aqi,pm25:air.value.current.pm2_5,time:air.value.current.time};
 else result.errors.push('Air quality is temporarily unavailable.');
 const carbon=results[1];
 if(carbon.status==='fulfilled'){
  const rows=carbon.value.data?.data;
  if(Array.isArray(rows)&&rows.length&&Number.isFinite(rows[0].intensity?.forecast)){
   const first=rows[0];
   const renewables=(first.generationmix || []).filter((x:{fuel:string})=>['wind','solar','hydro'].includes(x.fuel)).reduce((n:number,x:{perc:number})=>n+x.perc,0);
   result.electricity={intensity:first.intensity.forecast,index:first.intensity.index,renewables:Math.round(renewables),from:first.from,forecast:rows.filter((x:{intensity?:{forecast?:number}})=>Number.isFinite(x.intensity?.forecast)).map((x:{from:string;intensity:{forecast:number}})=>({time:x.from,value:x.intensity.forecast}))};
  }
 }
 if(!result.electricity) result.errors.push('Regional electricity data is unavailable for this postcode. Coverage is Great Britain.');
 const green=results[2];
 if(green.status==='fulfilled'&&!green.value.remark&&Array.isArray(green.value.elements)){
  const places:GreenPlace[]=[];const seen=new Set<string>();
  for(const item of green.value.elements){
   const plat=item.lat??item.center?.lat, plon=item.lon??item.center?.lon;
   if(!Number.isFinite(plat)||!Number.isFinite(plon))continue;
   const name=item.tags?.name || 'Unnamed green space';
   const key=`${name}:${plat.toFixed(3)}:${plon.toFixed(3)}`;
   if(seen.has(key))continue;seen.add(key);
   if(['private','no'].includes(item.tags?.access))continue;
   places.push({id:`${item.type}-${item.id}`,name,lat:plat,lon:plon,distance:distance(lat,lon,plat,plon)});
  }
  result.green={places:places.sort((a,b)=>a.distance-b.distance).slice(0,80)};
 }else result.errors.push('Nearby green spaces are temporarily unavailable.');
 return result;
}
