"use client";

export default function DeleteButton({
  action,
  confirmMessage = "Delete this item? This can't be undone.",
  label = "Delete",
}: {
  action: () => Promise<void>;
  confirmMessage?: string;
  label?: string;
}) {
  return (
    <form
      action={action}
      onSubmit={(e) => {
        if (!confirm(confirmMessage)) {
          e.preventDefault();
        }
      }}
    >
      <button type="submit" className="text-sm font-semibold text-crimson hover:underline">
        {label}
      </button>
    </form>
  );
}
