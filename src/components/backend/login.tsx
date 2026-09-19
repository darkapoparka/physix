"use client";
import { X } from "lucide-react";
import Link from "next/link";
import { LoginForm, PasswordLoginForm } from "@/features/gymaf/auth-ui";

export function BackendLogin({ onSignedIn, initialError = "", linkMode=false, passwordEnabled=false }: { onSignedIn: () => Promise<void>; initialError?: string; linkMode?:boolean; passwordEnabled?:boolean }) {
  return <main className="app-shell immersive gymaf-connected connected-login">
    <header>
      <Link href="/" className="icon-button" aria-label="Close"><X /></Link>
      <span className="login-wordmark">Gymaf</span>
    </header>
    <h1>Enter your email<br/>to get started.</h1>
    {passwordEnabled ? <>
      <PasswordLoginForm onSignedIn={onSignedIn} />
      <details className="connected-login-alternate">
        <summary>Sign in by email instead</summary>
        <LoginForm linkMode={linkMode} initialError={initialError} onSignedIn={onSignedIn} />
      </details>
    </> : <LoginForm linkMode={linkMode} initialError={initialError} onSignedIn={onSignedIn} />}
    <p className="login-build-note">Pre-release validation build. Use synthetic accounts.</p>
  </main>;
}
