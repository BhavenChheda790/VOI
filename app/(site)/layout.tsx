import { SiteChat } from "@/components/SiteChat";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { getSiteConfig } from "@/lib/site";

export const dynamic = "force-dynamic";

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const config = await getSiteConfig();

  return (
    <>
      <SiteHeader config={config} />
      <main className="voi-heritage-silk flex-1 overflow-x-hidden">{children}</main>
      <SiteFooter config={config} />
      <SiteChat orgName={config.orgName} />
    </>
  );
}
