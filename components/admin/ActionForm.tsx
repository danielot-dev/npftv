"use client";

import { useEffect, useRef } from "react";
import { useFormState, useFormStatus } from "react-dom";

export type ActionState = { error?: string; success?: string } | null;

export function SubmitButton({
  label = "Save",
  pendingLabel = "Saving…",
  className,
}: {
  label?: string;
  pendingLabel?: string;
  className?: string;
}) {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending} className={className}>
      {pending ? pendingLabel : label}
    </button>
  );
}

export default function ActionForm({
  action,
  children,
  className,
}: {
  action: (prevState: ActionState, formData: FormData) => Promise<ActionState>;
  children: React.ReactNode;
  className?: string;
}) {
  const [state, formAction] = useFormState(action, null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state?.success) {
      formRef.current?.reset();
    }
  }, [state]);

  return (
    <form ref={formRef} action={formAction} className={className}>
      {state?.error && (
        <div
          role="alert"
          className="mb-5 rounded-md border border-signal/40 bg-signal/5 px-4 py-3 text-sm text-signal sm:col-span-2"
        >
          {state.error}
        </div>
      )}
      {state?.success && (
        <div
          role="status"
          className="mb-5 rounded-md border border-green-600/30 bg-green-50 px-4 py-3 text-sm text-green-800 sm:col-span-2"
        >
          {state.success}
        </div>
      )}
      {children}
    </form>
  );
}
