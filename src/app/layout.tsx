import type {Metadata,Viewport} from 'next';
import type {ReactNode} from 'react';
import localFont from 'next/font/local';
import './physix.css';
const sans=localFont({src:'../assets/fonts/Manrope.ttf',weight:'200 800',variable:'--font-native',display:'swap'});
const serif=localFont({src:'../assets/fonts/Lora.ttf',weight:'400 700',variable:'--font-season',display:'swap'});
export const metadata:Metadata={title:{default:'PhysiX',template:'%s · PhysiX'},description:'Physiotherapy, appointments and your exercise plan, together.',robots:{index:false,follow:false}};
export const viewport:Viewport={width:'device-width',initialScale:1,viewportFit:'cover',themeColor:'#e7f1e8'};
export default function RootLayout({children}:{children:ReactNode}){return <html lang="en" className={sans.variable+' '+serif.variable}><body>{children}</body></html>;}