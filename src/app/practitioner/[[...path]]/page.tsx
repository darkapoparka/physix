import {redirect} from 'next/navigation';
export const dynamic='force-dynamic';
// The practitioner surface is fail-closed until real clinic authorization is integrated.
export default function PractitionerBoundary(){redirect('/login');}