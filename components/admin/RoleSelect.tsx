"use client";

import { useRef } from "react";
import { selectClass } from "@/components/admin/formStyles";

export default function RoleSelect({
  action,
  defaultValue,
}: {
  action: (formData: FormData) => Promise<void>;
  defaultValue: string;
}) {
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <form ref={formRef} action={action}>
      <select
        name="role"
        defaultValue={defaultValue}
        onChange={() => formRef.current?.requestSubmit()}
        className={`${selectClass} w-auto py-1`}
      >
        <option value="EDITOR">Editor</option>
        <option value="ADMIN">Admin</option>
      </select>
    </form>
  );
}
