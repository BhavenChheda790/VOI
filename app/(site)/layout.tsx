import { EventPopup } from "@/components/EventPopup";
import { SiteChat } from "@/components/SiteChat";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { getSiteConfig, whatsappHref } from "@/lib/site";

export const dynamic = "force-dynamic";

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const config = await getSiteConfig();

  const popupWa = whatsappHref(
    config.whatsappCountryCode,
    config.whatsappLocalNumber,
    "Hello, I would like to donate to Voice of India."
  );

  return (
    <>
      <SiteHeader config={config} />
      <main className="voi-heritage-silk flex-1 overflow-x-hidden">{children}</main>
      <SiteFooter config={config} />
      <SiteChat orgName={config.orgName} />
      {config.popupEnabled ? (
        <EventPopup
          title={config.popupTitle?.trim() || "Thank you!"}
          message={
            config.popupMessage?.trim() ||
            "Thank you for being part of our event today. Your support powers women empowerment, cultural programs, and student mentorship across California."
          }
          zelleName={config.zelleRecipientName ?? "VOICE OF INDIA CORPORATION"}
          zellePhone={config.zellePhone ?? "909-696-0066"}
          zelleEmail={config.zelleEmail}
          whatsappHref={popupWa}
          logoUrl={config.logoUrl}
          orgName={config.orgName}
          imageUrl={config.popupImageUrl}
          ctaLabel={config.popupCtaLabel}
          ctaUrl={config.popupCtaUrl}
        />
      ) : null}
    </>
  );
}
