import { Helmet } from "react-helmet-async";
import Footer from "@/components/Footer";
import { useLocale } from "@/hooks/useLocale";

/**
 * Engagement Policy — private, membership-based advisory statement.
 * Editorial, single-column, no CTAs. Content provided verbatim by the CEO.
 */
const EngagementPolicy = () => {
  const ar = useLocale() === "ar";

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Helmet>
        <title>Engagement Policy · Resorts Offers</title>
        <meta
          name="description"
          content="Our private, membership-based travel advisory engagement policy."
        />
        <meta name="robots" content="noindex,follow" />
      </Helmet>

      <main className="flex-1">
        <article className="max-w-2xl mx-auto px-6 py-24 md:py-32">
          <div className="text-center mb-14">
            <div className="uppercase tracking-[0.3em] text-[10px] text-accent mb-6">
              Resorts Offers
            </div>
            <h1 className="font-serif text-3xl md:text-5xl text-primary leading-tight">
              Engagement Policy
            </h1>
          </div>

          <div className="space-y-6 text-[15px] md:text-base leading-[1.9] text-primary/80 font-light">
            <p>
              Please note that we operate as a private, membership-based travel
              advisory serving a limited clientele. Our model is designed for
              strategic, value-driven partnerships rather than transactional or
              price-led sourcing.
            </p>

            <h2 className="font-serif text-xl text-primary pt-6">
              Engagement policy
            </h2>

            <ul className="space-y-4 list-none ps-0">
              <li className="border-s-2 border-accent/40 ps-5">
                We do not function as a price-comparison platform or
                transactional booking agency.
              </li>
              <li className="border-s-2 border-accent/40 ps-5">
                Customized proposals and advisory services are provided
                exclusively to members, or prospective members, who demonstrate
                clear intent and maintain direct decision-making authority.
              </li>
              <li className="border-s-2 border-accent/40 ps-5">
                While clients may consider other providers, we do not
                participate in parallel sourcing, price circulation, or
                auction-style negotiations.
              </li>
              <li className="border-s-2 border-accent/40 ps-5">
                Repeated quotation requests without commitment, transparency,
                or constructive feedback will not be supported.
              </li>
            </ul>

            <p>
              We prioritize engagements grounded in mutual alignment,
              professional respect, and a long-term, value-based approach.
              Where alignment is absent, we will discontinue the engagement.
            </p>

            <p>
              This policy safeguards service quality, the integrity of our
              advisory model, and the value delivered to our members and
              resort partners.
            </p>

            <p>
              You are free to proceed with any provider of your choice.
              However, absent confirmed alignment with the above principles,
              we will pause communication at this stage. Should your
              expectations align in the future, you may contact us by email.
            </p>
          </div>

          <div className="mt-16 pt-10 border-t border-primary/10 text-start">
            <p className="text-sm text-primary/70 mb-1">Kind regards,</p>
            <p className="font-serif text-lg text-primary">
              Nora Abdullah Mohamed Elkhalifi
            </p>
            <p className="text-xs uppercase tracking-[0.2em] text-accent mt-1">
              Chief Executive Officer
            </p>
            <p className="text-sm text-primary/70 mt-3 leading-relaxed">
              Resorts Offers Tourism LLC
              <br />
              Noel Marketing and Design Management LLC
            </p>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
};

export default EngagementPolicy;
