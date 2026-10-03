import type { CSSProperties } from 'react';
const paths: Record<string, React.ReactNode> = {
 leaf:<><path d="M20 4C9 2 3 8 5 15s14 6 15-11Z"/><path d="m4 21 11-12M9 15v-4m3 1h4"/></>,
 grid:<><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/></>,
 people:<><circle cx="9" cy="8" r="3"/><path d="M3 21v-3a6 6 0 0 1 12 0v3M16 5a3 3 0 0 1 0 6m2 4a5 5 0 0 1 3 5"/></>,
 pin:<><path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/></>,
 gift:<><rect x="3" y="8" width="18" height="5" rx="1"/><path d="M5 13v8h14v-8M12 8v13"/><path d="M12 8C3 9 5 1 9 3c2 1 3 5 3 5s1-4 3-5c4-2 6 6-3 5Z"/></>,
 bolt:<path d="m13 2-9 12h7l-1 8 10-13h-7l1-7Z"/>,
 wind:<><path d="M3 8h12a3 3 0 1 0-3-3M2 12h17a3 3 0 1 1-3 3M5 16h5a3 3 0 1 1-3 3"/></>,
 check:<path d="m5 12 4 4L19 6"/>, search:<><circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 5 5"/></>,
 info:<><circle cx="12" cy="12" r="9"/><path d="M12 11v6m0-10v.1"/></>, close:<path d="m6 6 12 12M6 18 18 6"/>,
 chevron:<path d="m9 5 7 7-7 7"/>, clock:<><circle cx="12" cy="12" r="9"/><path d="M12 6v6l4 2"/></>,
 walk:<><circle cx="14" cy="4" r="2"/><path d="m7 10 4-3 4 2 3 4M11 8l-1 7-4 6m4-6 5 2 1 5M4 13l3-3"/></>,
 lock:<><rect x="5" y="10" width="14" height="11" rx="2"/><path d="M8 10V6a4 4 0 0 1 8 0v4m-4 5v2"/></>,
 share:<><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="m9 10 6-4m-6 8 6 4"/></>,
 sun:<><circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1 1m12 12 1 1M5 19l1-1M18 6l1-1"/></>,
};
export default function Icon({name,size=20,style,className=''}:{name:string;size?:number;style?:CSSProperties;className?:string}) { return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={style} className={className}>{paths[name] || paths.leaf}</svg> }
