"use client";
import { createContext, useContext, useState, type ReactNode, type Dispatch, type SetStateAction } from 'react';
import { newAttempt, type Attempt, type DemoMode } from '@/shared/physix/demo';
import { newBookingDraft, type BookingDraft, type BookingReceipt } from '@/shared/physix/booking-preview';
type DemoState = {
  mode: DemoMode;
  setMode: (mode: DemoMode) => void;
  attempt: Attempt;
  setAttempt: Dispatch<SetStateAction<Attempt>>;
  booking: BookingDraft;
  setBooking: Dispatch<SetStateAction<BookingDraft>>;
  receipt: BookingReceipt | null;
  setReceipt: Dispatch<SetStateAction<BookingReceipt | null>>;
  reset: () => void;
};
const DemoContext = createContext<DemoState | null>(null);
/** All synthetic activity is scoped to this development layout and memory only. */
export function DemoProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<DemoMode>('assigned');
  const [attempt, setAttempt] = useState<Attempt>(() => newAttempt('unstarted-preview'));
  const [booking, setBooking] = useState<BookingDraft>(newBookingDraft);
  const [receipt, setReceipt] = useState<BookingReceipt | null>(null);
  function reset() {
    setAttempt(newAttempt(crypto.randomUUID()));
    setBooking(newBookingDraft());
    setReceipt(null);
  }
  return <DemoContext value={{ mode, setMode, attempt, setAttempt, booking, setBooking, receipt, setReceipt, reset }}>{children}</DemoContext>;
}
export function useDemo(): DemoState {
  const state = useContext(DemoContext);
  if (!state) throw new Error('Demo requires its development-only layout.');
  return state;
}
