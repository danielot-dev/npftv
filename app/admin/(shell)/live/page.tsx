import { prisma } from "@/lib/prisma";
import { updateLiveStream } from "@/lib/actions/liveActions";
import { inputClass, labelClass, primaryButtonClass } from "@/components/admin/formStyles";

function toDateTimeLocal(date: Date | null) {
  if (!date) return "";
  const d = new Date(date);
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
  return d.toISOString().slice(0, 16);
}

export default async function AdminLivePage() {
  const stream = await prisma.liveStream.findFirst({ orderBy: { updatedAt: "desc" } });

  return (
    <div>
      <h1 className="mb-2 font-heading text-2xl font-bold text-navy">Live TV Control</h1>
      <p className="mb-6 text-sm text-navy-dark/60">
        Toggling &ldquo;Currently live&rdquo; on immediately switches the public{" "}
        <code className="rounded bg-navy/5 px-1 py-0.5 text-xs">/live</code> page and the header
        badge to the live player. Turn it off the moment the broadcast ends.
      </p>

      <form action={updateLiveStream} className="max-w-xl space-y-5 rounded-lg border border-navy/10 bg-white p-6">
        <label className="flex items-center justify-between rounded-md border border-gold/40 bg-gold/5 px-4 py-3">
          <span className="font-heading text-sm font-semibold text-navy">Currently live</span>
          <input
            type="checkbox"
            name="isLive"
            defaultChecked={stream?.isLive ?? false}
            className="h-5 w-5 accent-crimson"
          />
        </label>

        <div>
          <label className={labelClass} htmlFor="title">
            Broadcast Title
          </label>
          <input
            id="title"
            name="title"
            required
            defaultValue={stream?.title ?? "NPF TV Live Broadcast"}
            className={inputClass}
          />
        </div>

        <div>
          <label className={labelClass} htmlFor="youtubeId">
            YouTube Live Video ID
          </label>
          <input
            id="youtubeId"
            name="youtubeId"
            required
            defaultValue={stream?.youtubeId ?? ""}
            className={inputClass}
            placeholder="The ID from your YouTube Live studio URL"
          />
        </div>

        <div>
          <label className={labelClass} htmlFor="scheduledAt">
            Next Scheduled Broadcast (shown when off air)
          </label>
          <input
            id="scheduledAt"
            name="scheduledAt"
            type="datetime-local"
            defaultValue={toDateTimeLocal(stream?.scheduledAt ?? null)}
            className={inputClass}
          />
        </div>

        <button type="submit" className={primaryButtonClass}>
          Save
        </button>
      </form>
    </div>
  );
}
