import { prisma } from "@/lib/prisma";
import { markMessageRead, deleteMessage } from "@/lib/actions/messageActions";
import DeleteButton from "@/components/admin/DeleteButton";
import { formatDate } from "@/lib/format";

export default async function AdminMessagesPage() {
  const messages = await prisma.contactMessage.findMany({
    orderBy: { createdAt: "desc" },
  });
  const unreadCount = messages.filter((m) => !m.read).length;

  return (
    <div>
      <div className="mb-6 flex items-center gap-3">
        <h1 className="font-heading text-2xl font-bold text-navy">General Inquiries</h1>
        {unreadCount > 0 && (
          <span className="rounded-full bg-crimson px-2.5 py-0.5 font-condensed text-xs font-semibold text-white">
            {unreadCount} unread
          </span>
        )}
      </div>

      {messages.length === 0 ? (
        <p className="rounded-lg border border-dashed border-navy/20 bg-white px-6 py-16 text-center text-sm text-navy-dark/60">
          No inquiries submitted yet. These come from the Contact page form.
        </p>
      ) : (
        <div className="space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`rounded-lg border bg-white p-5 ${
                msg.read ? "border-navy/10" : "border-gold/60 shadow-gold"
              }`}
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="font-heading text-base font-semibold text-navy">{msg.subject}</p>
                  <p className="mt-1 text-sm text-navy-dark/70">
                    {msg.name} &lt;{msg.email}&gt;
                    {msg.phone && <span className="ml-2">{msg.phone}</span>}
                  </p>
                  <p className="mt-1 font-condensed text-xs text-navy-dark/50">
                    {formatDate(msg.createdAt)}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  {!msg.read && (
                    <form action={markMessageRead.bind(null, msg.id)}>
                      <button type="submit" className="text-sm font-semibold text-navy hover:text-gold-dark">
                        Mark as read
                      </button>
                    </form>
                  )}
                  <DeleteButton action={deleteMessage.bind(null, msg.id)} />
                </div>
              </div>
              <p className="mt-3 whitespace-pre-line text-sm text-navy-dark">{msg.message}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
