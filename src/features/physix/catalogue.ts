// Candidates from Motion Makers. Not a published clinical/service catalogue.
export const serviceCandidates=[
 {id:'physiotherapy',name:'Physiotherapy',category:'Assessment & care',image:'/physix/manual.jpg',modes:['in_clinic','online'],search:'physiotherapy back neck pain assessment'},
 {id:'sports-rehabilitation',name:'Sports rehabilitation',category:'Return to movement',image:'/physix/sports.jpg',modes:['in_clinic'],search:'sports injury knee shoulder rehabilitation'},
 {id:'movement',name:'Movement & mobility',category:'Exercise & movement',image:'/physix/movement.jpg',modes:['in_clinic','online'],search:'mobility posture movement flexibility exercise'},
] as const;
export type VisitMode='in_clinic'|'online';