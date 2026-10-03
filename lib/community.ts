export type GreenPlace = { id: string; name: string; lat: number; lon: number; distance: number };
export type Environment = {
  postcode: string; district: string; region: string; lat: number; lon: number; demo: boolean; updated: string | null;
  air: { aqi: number; pm25: number; time: string } | null;
  electricity: { intensity: number; index: string; renewables: number; from: string; forecast: { time: string; value: number }[] } | null;
  green: { places: GreenPlace[] } | null;
  errors: string[];
};
export const demoEnvironment: Environment = {
  postcode: 'E8 1EA', district: 'Hackney', region: 'London', lat: 51.545, lon: -0.0553, demo: true, updated: null,
  air: { aqi: 24, pm25: 6.2, time: 'Illustrative snapshot' },
  electricity: { intensity: 112, index: 'low', renewables: 54, from: 'Illustrative snapshot', forecast: [180, 162, 139, 112, 86, 73, 92, 118, 151, 172, 143, 122].map((value, i) => ({ time: `${String(i * 2).padStart(2, '0')}:00`, value })) },
  green: { places: [{id:'demo-1', name:'London Fields', lat:51.5413, lon:-0.0604, distance:540}, {id:'demo-2',name:'Hackney Downs',lat:51.5537,lon:-0.0607,distance:1030}, {id:'demo-3',name:'St John’s Churchyard Gardens',lat:51.5498,lon:-0.0531,distance:550}] }, errors: [],
};
export type Action = { id: string; category: 'Nature'|'Energy'|'Travel'; title: string; description: string; points: number; duration: string; icon: string; verified: boolean };
export const actions: Action[] = [
  { id:'cleanup', category:'Nature', title:'A little care for your local green', description:'Join a neighbourhood litter pick. A cleaner park starts with a few of us.', points:20, duration:'30 minutes', icon:'leaf', verified:true },
  { id:'energy', category:'Energy', title:'Give your laundry a greener hour', description:'Move a flexible wash to a lower-carbon electricity window.', points:5, duration:'At home', icon:'bolt', verified:false },
  { id:'walk', category:'Travel', title:'Make your next short trip a walk', description:'Leave the car behind for one short journey, if you can.', points:5, duration:'15 minutes', icon:'walk', verified:false },
];
