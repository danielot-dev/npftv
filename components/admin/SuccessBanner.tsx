export default function SuccessBanner({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <div
      role="status"
      className="mb-6 rounded-md border border-green-600/30 bg-green-50 px-4 py-3 text-sm text-green-800"
    >
      {message}
    </div>
  );
}
