// Candidates from Motion Makers. Not a published clinical/service catalogue.
export const serviceCandidates=[
 {id:'physiotherapy',name:'Physiotherapy',category:'Assessment & care',image:'/physix/illustrations/assessment.webp',modes:['in_clinic','online'],search:'physiotherapy back neck pain assessment'},
 {id:'sports-rehabilitation',name:'Sports rehabilitation',category:'Return to movement',image:'/physix/illustrations/sports.webp',modes:['in_clinic'],search:'sports injury knee shoulder rehabilitation'},
 {id:'movement',name:'Movement & mobility',category:'Exercise & movement',image:'/physix/illustrations/mobility.webp',modes:['in_clinic','online'],search:'mobility posture movement flexibility exercise'},
] as const;
export type VisitMode='in_clinic'|'online';