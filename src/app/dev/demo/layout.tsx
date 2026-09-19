import {notFound} from 'next/navigation';
import type {ReactNode} from 'react';
import {demoEnabled} from '@/shared/physix/demo';
import {DemoProvider} from '@/features/physix/demo-context';
export const dynamic='force-dynamic';
export default function DemoLayout({children}:{children:ReactNode}){if(!demoEnabled(process.env))notFound();return <DemoProvider>{children}</DemoProvider>;}