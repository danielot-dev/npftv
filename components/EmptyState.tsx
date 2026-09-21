export default function EmptyState({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="border border-dashed border-navy/20 bg-white px-6 py-16 text-center">
      <h3 className="font-heading text-lg font-semibold text-navy">{title}</h3>
      <p className="mx-auto mt-2 max-w-md text-sm text-navy-dark/70">{description}</p>
    </div>
  );
}
