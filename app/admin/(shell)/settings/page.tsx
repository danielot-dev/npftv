import { prisma } from "@/lib/prisma";
import { updateSiteSettings } from "@/lib/actions/settingsActions";
import { inputClass, labelClass, primaryButtonClass } from "@/components/admin/formStyles";

export default async function AdminSettingsPage() {
  const settings = await prisma.siteSettings.findUnique({ where: { id: "singleton" } });

  return (
    <div>
      <h1 className="mb-2 font-heading text-2xl font-bold text-navy">Site Settings</h1>
      <p className="mb-6 text-sm text-navy-dark/60">
        These values power the footer&apos;s social links and the Contact page&apos;s emergency
        information across the whole site.
      </p>

      <form action={updateSiteSettings} className="max-w-xl space-y-6 rounded-lg border border-navy/10 bg-white p-6">
        <div>
          <h2 className="mb-3 font-heading text-sm font-bold uppercase tracking-wide text-royal-dark">
            Emergency Contact
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass} htmlFor="emergencyPhone">
                Emergency Phone
              </label>
              <input
                id="emergencyPhone"
                name="emergencyPhone"
                defaultValue={settings?.emergencyPhone ?? ""}
                className={inputClass}
                placeholder="112"
              />
            </div>
            <div>
              <label className={labelClass} htmlFor="emergencyEmail">
                Emergency Email
              </label>
              <input
                id="emergencyEmail"
                name="emergencyEmail"
                type="email"
                defaultValue={settings?.emergencyEmail ?? ""}
                className={inputClass}
              />
            </div>
          </div>
        </div>

        <div>
          <h2 className="mb-3 font-heading text-sm font-bold uppercase tracking-wide text-royal-dark">
            Social Media Links
          </h2>
          <div className="space-y-4">
            <div>
              <label className={labelClass} htmlFor="facebookUrl">Facebook</label>
              <input
                id="facebookUrl"
                name="facebookUrl"
                defaultValue={settings?.facebookUrl ?? ""}
                className={inputClass}
                placeholder="https://facebook.com/..."
              />
            </div>
            <div>
              <label className={labelClass} htmlFor="twitterUrl">X (Twitter)</label>
              <input
                id="twitterUrl"
                name="twitterUrl"
                defaultValue={settings?.twitterUrl ?? ""}
                className={inputClass}
                placeholder="https://x.com/..."
              />
            </div>
            <div>
              <label className={labelClass} htmlFor="instagramUrl">Instagram</label>
              <input
                id="instagramUrl"
                name="instagramUrl"
                defaultValue={settings?.instagramUrl ?? ""}
                className={inputClass}
                placeholder="https://instagram.com/..."
              />
            </div>
            <div>
              <label className={labelClass} htmlFor="youtubeUrl">YouTube</label>
              <input
                id="youtubeUrl"
                name="youtubeUrl"
                defaultValue={settings?.youtubeUrl ?? ""}
                className={inputClass}
                placeholder="https://youtube.com/@..."
              />
            </div>
            <div>
              <label className={labelClass} htmlFor="tiktokUrl">TikTok</label>
              <input
                id="tiktokUrl"
                name="tiktokUrl"
                defaultValue={settings?.tiktokUrl ?? ""}
                className={inputClass}
                placeholder="https://tiktok.com/@..."
              />
            </div>
          </div>
          <p className="mt-2 text-xs text-navy-dark/50">
            Leave any field blank to hide that link from the footer entirely.
          </p>
        </div>

        <button type="submit" className={primaryButtonClass}>
          Save Settings
        </button>
      </form>
    </div>
  );
}
