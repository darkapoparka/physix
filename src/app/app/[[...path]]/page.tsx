import {redirect} from 'next/navigation';
export const dynamic='force-dynamic';
// No PhysiX identity provider is configured. Never render reference patient data here.
export default function PatientBoundary(){redirect('/login');}