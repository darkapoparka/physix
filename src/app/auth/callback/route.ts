import {hostedBackendEnabled} from '@/server/physix/hosted-config';
import {hostedCallback} from '@/server/physix/hosted-backend';
import type { NextRequest } from "next/server";
import { completeEmailLink } from "@/server/gymaf/email-link";

export const runtime = "nodejs";
export async function GET(request: NextRequest) { return hostedBackendEnabled()?hostedCallback(request):completeEmailLink(request); }
