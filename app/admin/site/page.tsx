import Link from "next/link";
import { updateSiteConfigAction } from "@/app/admin/actions";
import { ImageUpload } from "@/components/ImageUpload";
import { getSiteConfig } from "@/lib/site";

export default async function AdminSitePage({
  searchParams,
}: {
  searchParams: Promise<{ ok?: string }>;
}) {
  const sp = await searchParams;
  const c = await getSiteConfig();

  return (
    <div className="min-h-screen bg-stone-100">
      <div className="mx-auto max-w-3xl px-6 py-10">
        <Link href="/admin" className="text-sm text-amber-900 hover:underline">
          ← Dashboard
        </Link>
        <h1 className="mt-4 font-display text-3xl font-semibold text-stone-900">Site settings</h1>
        {sp.ok ? <p className="mt-2 text-sm text-emerald-700">Saved.</p> : null}
        <form action={updateSiteConfigAction} className="mt-8 space-y-6 rounded-2xl border border-stone-200 bg-white p-8 shadow-sm">
          <fieldset className="space-y-4">
            <legend className="text-sm font-semibold text-stone-900">Branding</legend>
            <Field label="Organization name" name="orgName" defaultValue={c.orgName} />
            <Field label="Tagline" name="tagline" defaultValue={c.tagline} />
            <ImageUpload
              label="Logo"
              name="logoUrl"
              defaultValue={c.logoUrl ?? ""}
              hint="PNG/SVG with transparent background works best. Max 8 MB."
              previewAspect="square"
            />
          </fieldset>
          <fieldset className="space-y-4">
            <legend className="text-sm font-semibold text-stone-900">Home hero</legend>
            <Field label="Hero title" name="homeHeroTitle" defaultValue={c.homeHeroTitle} />
            <Area label="Hero subtitle" name="homeHeroSubtitle" defaultValue={c.homeHeroSubtitle} rows={3} />
            <Area label="Quote" name="homeQuote" defaultValue={c.homeQuote} rows={3} />
            <Area label="Footer tagline" name="footerTagline" defaultValue={c.footerTagline} rows={2} />
          </fieldset>
          <fieldset className="space-y-4">
            <legend className="text-sm font-semibold text-stone-900">Contact & social</legend>
            <Field label="Contact email" name="contactEmail" defaultValue={c.contactEmail} type="email" />
            <Field label="Instagram URL" name="instagramUrl" defaultValue={c.instagramUrl ?? ""} />
            <Field label="Facebook URL" name="facebookUrl" defaultValue={c.facebookUrl ?? ""} />
          </fieldset>
          <fieldset className="space-y-4">
            <legend className="text-sm font-semibold text-stone-900">WhatsApp & Zelle (public / bot)</legend>
            <p className="text-xs text-stone-500">
              WhatsApp number: country code + local digits only (no +). Used for wa.me links on the site.
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="WhatsApp country code" name="whatsappCountryCode" defaultValue={c.whatsappCountryCode} />
              <Field label="WhatsApp local number" name="whatsappLocalNumber" defaultValue={c.whatsappLocalNumber} />
            </div>
            <Field label="Zelle email (shown on donate page & bot greeting)" name="zelleEmail" defaultValue={c.zelleEmail} type="email" />
          </fieldset>
          <fieldset className="space-y-4">
            <legend className="text-sm font-semibold text-stone-900">Zelle (phone + QR)</legend>
            <p className="text-xs text-stone-500">
              These show on the public donate page. Leave blank to hide.
            </p>
            <Field label="Zelle recipient name" name="zelleRecipientName" defaultValue={c.zelleRecipientName ?? ""} />
            <Field label="Zelle phone number" name="zellePhone" defaultValue={c.zellePhone ?? ""} />
            <ImageUpload
              label="Zelle QR code"
              name="zelleQrUrl"
              defaultValue={c.zelleQrUrl ?? ""}
              hint="Upload the Zelle 'Send money' QR from your banking app. PNG works best."
              previewAspect="square"
            />
          </fieldset>
          <fieldset className="space-y-4">
            <legend className="text-sm font-semibold text-stone-900">Bank details (bot shares with donors)</legend>
            <p className="text-xs text-stone-500">
              The WhatsApp bot auto-sends these details when a donor messages. Leave blank to omit from the greeting.
            </p>
            <Field label="Bank name" name="bankName" defaultValue={c.bankName ?? ""} />
            <Field label="Account holder name" name="bankAccountName" defaultValue={c.bankAccountName ?? ""} />
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Account number" name="bankAccountNumber" defaultValue={c.bankAccountNumber ?? ""} />
              <Field label="Routing number" name="bankRoutingNumber" defaultValue={c.bankRoutingNumber ?? ""} />
            </div>
            <Area
              label="Extra payment instructions (optional)"
              name="paymentInstructions"
              defaultValue={c.paymentInstructions ?? ""}
              rows={3}
            />
          </fieldset>
          <fieldset className="space-y-4 rounded-lg border border-amber-200 bg-amber-50/40 p-5">
            <legend className="-ml-1 px-1 text-sm font-semibold text-stone-900">
              Event thank-you popup
            </legend>
            <p className="text-xs text-stone-600">
              When enabled, every visitor sees a centered modal thanking them and offering Zelle /
              WhatsApp donate options. Suppressed for the rest of their browser session once
              dismissed; reappears on next visit. Toggle off when no longer relevant.
            </p>
            <label className="flex items-center gap-3 text-sm font-semibold text-stone-900">
              <input
                type="checkbox"
                name="popupEnabled"
                defaultChecked={c.popupEnabled}
                className="h-4 w-4 rounded border-stone-300 text-[#1e40af] focus:ring-[#1e40af]"
              />
              Enable popup site-wide
            </label>
            <Field
              label="Popup title"
              name="popupTitle"
              defaultValue={c.popupTitle ?? ""}
            />
            <Area
              label="Popup message"
              name="popupMessage"
              defaultValue={c.popupMessage ?? ""}
              rows={4}
            />
            <ImageUpload
              label="Popup image (event flyer)"
              name="popupImageUrl"
              defaultValue={c.popupImageUrl ?? ""}
              hint="Optional. Shows at top of the popup. If empty, popup uses the navy hero design instead."
              previewAspect="square"
            />
            <div className="grid gap-4 sm:grid-cols-2">
              <Field
                label="Primary button label (optional)"
                name="popupCtaLabel"
                defaultValue={c.popupCtaLabel ?? ""}
              />
              <Field
                label="Primary button URL (e.g. Eventbrite)"
                name="popupCtaUrl"
                defaultValue={c.popupCtaUrl ?? ""}
              />
            </div>
          </fieldset>
          <fieldset className="space-y-4">
            <legend className="text-sm font-semibold text-stone-900">Bot message templates (optional overrides)</legend>
            <p className="text-xs text-stone-500">
              Leave blank to use built-in bilingual defaults. Supported placeholders:{" "}
              <code>{"{{name}}"}</code> <code>{"{{org}}"}</code> <code>{"{{zelle}}"}</code>{" "}
              <code>{"{{bankName}}"}</code> <code>{"{{bankAccountName}}"}</code>{" "}
              <code>{"{{bankAccountNumber}}"}</code> <code>{"{{bankRoutingNumber}}"}</code>.
            </p>
            <Area label="Greeting (first message / donation intent)" name="botGreeting" defaultValue={c.botGreeting ?? ""} rows={6} />
            <Area label="Proof acknowledgement (after screenshot)" name="botProofAck" defaultValue={c.botProofAck ?? ""} rows={4} />
            <Area label="Confirmed message (admin approves)" name="botConfirmed" defaultValue={c.botConfirmed ?? ""} rows={4} />
            <Area label="Rejected message (admin rejects)" name="botRejected" defaultValue={c.botRejected ?? ""} rows={4} />
          </fieldset>
          <button type="submit" className="rounded-full bg-stone-900 px-6 py-2.5 text-sm font-semibold text-white hover:bg-stone-800">
            Save
          </button>
        </form>
      </div>
    </div>
  );
}

function Field({
  label,
  name,
  defaultValue,
  type = "text",
}: {
  label: string;
  name: string;
  defaultValue: string;
  type?: string;
}) {
  return (
    <div>
      <label className="block text-xs font-semibold uppercase text-stone-500" htmlFor={name}>
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        defaultValue={defaultValue}
        className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2 text-stone-900"
      />
    </div>
  );
}

function Area({
  label,
  name,
  defaultValue,
  rows,
}: {
  label: string;
  name: string;
  defaultValue: string;
  rows: number;
}) {
  return (
    <div>
      <label className="block text-xs font-semibold uppercase text-stone-500" htmlFor={name}>
        {label}
      </label>
      <textarea
        id={name}
        name={name}
        rows={rows}
        defaultValue={defaultValue}
        className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2 text-stone-900"
      />
    </div>
  );
}
