const STYLES: Record<string, string> = {
  PUBLISHED: "bg-green-100 text-green-800",
  DRAFT: "bg-gray-200 text-gray-700",
  ARCHIVED: "bg-amber-100 text-amber-800",
};

export default function StatusBadge({ status }: { status: string }) {
  return (
    <span
      className={`inline-block rounded px-2 py-0.5 font-condensed text-xs font-semibold uppercase tracking-wide ${
        STYLES[status] ?? "bg-gray-200 text-gray-700"
      }`}
    >
      {status}
    </span>
  );
}
