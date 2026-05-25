import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { CreditCard, Banknote, FileText, AlertTriangle, Building, XCircle, DollarSign, Luggage, Plane, ExternalLink, ShieldCheck, Edit, RefreshCw } from "lucide-react";

const Terms = () => {
  return (
    <div className="min-h-screen">
      <Helmet>
        <link rel="canonical" href="https://resortsoffers.com/terms" />
      </Helmet>
      <Navbar />
      
      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-br from-primary to-primary/80 text-primary-foreground mt-20">
        <div className="container-custom text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
            Terms & Conditions
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto opacity-90">
            Important information about bookings, cancellations, and policies
          </p>
        </div>
      </section>

      {/* Payment Methods */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <Card className="shadow-sm">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-3">
                <CreditCard className="w-7 h-7 text-accent" />
                <CardTitle className="text-xl md:text-2xl">Accepted Payment Methods</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-6 text-left">
                We accept the following payment methods for your convenience:
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="flex flex-col items-center justify-center p-4 border rounded-lg bg-muted/30">
                  <CreditCard className="w-10 h-10 text-primary mb-2" />
                  <span className="font-medium text-sm">Visa</span>
                </div>
                <div className="flex flex-col items-center justify-center p-4 border rounded-lg bg-muted/30">
                  <CreditCard className="w-10 h-10 text-primary mb-2" />
                  <span className="font-medium text-sm">Amex</span>
                </div>
                <div className="flex flex-col items-center justify-center p-4 border rounded-lg bg-muted/30">
                  <Banknote className="w-10 h-10 text-primary mb-2" />
                  <span className="font-medium text-sm">Tabby</span>
                </div>
                <div className="flex flex-col items-center justify-center p-4 border rounded-lg bg-muted/30">
                  <Banknote className="w-10 h-10 text-primary mb-2" />
                  <span className="font-medium text-sm">Tamara</span>
                </div>
              </div>

              {/* Credit Card Processing Fees */}
              <div className="mt-6 pt-6 border-t">
                <h3 className="font-semibold text-base md:text-lg mb-3 text-left flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-primary" />
                  Credit Card Processing Fees
                </h3>
                <ul className="space-y-2 text-muted-foreground text-sm md:text-base text-left mb-4">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span><strong className="text-foreground">Domestic card</strong> (within the same country): <strong className="text-foreground">3% fee</strong></span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span><strong className="text-foreground">International card</strong> (issued abroad): <strong className="text-foreground">4% fee</strong></span>
                  </li>
                </ul>

                <div className="bg-accent/10 p-4 rounded-lg text-left">
                  <h4 className="font-semibold text-sm md:text-base mb-2">Credit Card Payment Charges</h4>
                  <p className="text-muted-foreground text-sm md:text-base leading-relaxed mb-2">
                    In case payment is made via a credit card payment link, the following processing fees will apply:
                  </p>
                  <ul className="space-y-1.5 text-muted-foreground text-sm md:text-base">
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span><strong className="text-foreground">3% surcharge</strong> for domestic credit cards</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span><strong className="text-foreground">4% surcharge</strong> for international credit cards</span>
                    </li>
                  </ul>
                  <p className="text-xs md:text-sm text-muted-foreground leading-relaxed mt-3">
                    These charges are applied by the payment processing provider and will be added to the total payable amount.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Terms Content */}
      <section className="py-12 md:py-16 bg-muted">
        <div className="container mx-auto px-4 max-w-4xl">
          <Accordion type="single" collapsible className="space-y-4">
            {/* No Show & Amendments */}
            <AccordionItem value="amendments" className="bg-background rounded-lg border shadow-sm px-4">
              <AccordionTrigger className="text-left hover:no-underline py-5">
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-primary shrink-0" />
                  <span className="text-lg md:text-xl font-semibold">No Show, Amendments & Other Terms</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pb-5">
                <div className="space-y-5 pt-2">
                  <div className="text-left">
                    <h3 className="font-semibold text-base mb-2">Date Changes</h3>
                    <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
                      Date changes are considered cancellations and subject to the applicable cancellation charges.
                    </p>
                  </div>
                  <div className="text-left">
                    <h3 className="font-semibold text-base mb-2">Name Amendments</h3>
                    <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
                      Name amendments for confirmed bookings are treated as cancellations and subject to cancellation charges. The previously confirmed villa will be released and offered to the next waitlisted guest.
                    </p>
                  </div>
                  <div className="text-left">
                    <h3 className="font-semibold text-base mb-2">Early Departures</h3>
                    <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
                      Early departures will be considered as no-shows.
                    </p>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Force Majeure */}
            <AccordionItem value="force-majeure" className="bg-background rounded-lg border shadow-sm px-4">
              <AccordionTrigger className="text-left hover:no-underline py-5">
                <div className="flex items-center gap-3">
                  <AlertTriangle className="w-5 h-5 text-primary shrink-0" />
                  <span className="text-lg md:text-xl font-semibold">Force Majeure Policy</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pb-5">
                <div className="space-y-5 pt-2">
                  <p className="text-muted-foreground text-sm md:text-base leading-relaxed text-left">
                    "Force Majeure" (also known as "impossibility") covers events beyond a party's reasonable control—such as acts of God, natural disasters, terrorism, war, or government restrictions—under which either party may terminate relevant agreements without liability.
                  </p>
                  
                  <p className="text-muted-foreground text-sm md:text-base leading-relaxed text-left">
                    In hotel management agreements, pandemics or epidemics may or may not be explicitly stated as force majeure—often appearing only as "events beyond reasonable control."
                  </p>

                  <div className="text-left">
                    <h3 className="font-semibold text-base mb-3">Typical Events Include:</h3>
                    <ul className="space-y-2 text-muted-foreground text-sm md:text-base">
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        <span>Natural disasters (storms, flooding, tsunami)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        <span>Government travel restrictions or curfews</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        <span>Terrorist or violent incidents</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        <span>Health emergencies & pandemic restrictions</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        <span>Resort closure or unavailability</span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-accent/10 p-4 rounded-lg text-left">
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      <strong className="text-foreground">Note:</strong> Regular weather (monsoon rain), transient illness, or mild disruptions usually do not qualify unless they trigger official government restrictions.
                    </p>
                  </div>

                  <div className="bg-primary/5 border border-primary/20 p-4 rounded-lg text-left">
                    <h3 className="font-semibold text-base mb-3">If Your Reservation Is Affected:</h3>
                    <ul className="space-y-2 text-muted-foreground text-sm md:text-base">
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        <span>Request documentation of the force majeure event</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        <span>Discuss rebooking options or deposit application</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        <span>Inquire about points recovery if applicable</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Resort Response */}
            <AccordionItem value="resort-response" className="bg-background rounded-lg border shadow-sm px-4">
              <AccordionTrigger className="text-left hover:no-underline py-5">
                <div className="flex items-center gap-3">
                  <Building className="w-5 h-5 text-primary shrink-0" />
                  <span className="text-lg md:text-xl font-semibold">Resort Response to Force Majeure</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pb-5">
                <div className="space-y-4 pt-2 text-left">
                  <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
                    In force majeure circumstances, if an event beyond control prevents operation, the resort may:
                  </p>
                  <ul className="space-y-2 text-muted-foreground text-sm md:text-base">
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Allow termination or postponement of reservations</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Retain deposits for rescheduled reservations</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Offer postponement or rebooking options</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Provide refunds or compensation per contract terms</span>
                    </li>
                  </ul>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* General Cancellation */}
            <AccordionItem value="cancellation" className="bg-background rounded-lg border shadow-sm px-4">
              <AccordionTrigger className="text-left hover:no-underline py-5">
                <div className="flex items-center gap-3">
                  <XCircle className="w-5 h-5 text-primary shrink-0" />
                  <span className="text-lg md:text-xl font-semibold">General Cancellation Policy</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pb-5">
                <p className="text-muted-foreground text-sm md:text-base leading-relaxed text-left pt-2">
                  Hotel cancellation terms vary depending on the property and package booked. Please refer to the specific hotel's policy for applicable charges in case of modification, no-show, or cancellation.
                </p>
              </AccordionContent>
            </AccordionItem>

            {/* Maldives Transfers - Baggage Allowance */}
            <AccordionItem value="maldives-baggage" className="bg-background rounded-lg border shadow-sm px-4">
              <AccordionTrigger className="text-left hover:no-underline py-5">
                <div className="flex items-center gap-3">
                  <Luggage className="w-5 h-5 text-primary shrink-0" />
                  <span className="text-lg md:text-xl font-semibold">Maldives Transfers — Baggage Allowance Policy</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pb-5">
                <div className="space-y-5 pt-2 text-left">
                  {/* 1. Seaplane / Domestic Flight */}
                  <div>
                    <h3 className="font-semibold text-base mb-2">1. Seaplane / Domestic Flight Transfers</h3>
                    <p className="text-muted-foreground text-sm md:text-base leading-relaxed mb-2">
                      Each passenger is entitled to:
                    </p>
                    <ul className="space-y-2 text-muted-foreground text-sm md:text-base">
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        <span><strong className="text-foreground">20 kg</strong> of checked luggage</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        <span><strong className="text-foreground">1 piece</strong> of hand luggage not exceeding <strong className="text-foreground">5 kg</strong></span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        <span>Infants are <strong className="text-foreground">not entitled</strong> to any baggage allowance.</span>
                      </li>
                    </ul>
                  </div>

                  {/* 2. Excess Baggage */}
                  <div>
                    <h3 className="font-semibold text-base mb-2">2. Excess Baggage</h3>
                    <ul className="space-y-2 text-muted-foreground text-sm md:text-base">
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        <span>Any excess baggage will be chargeable and must be paid directly to the Seaplane or Domestic Airline Company.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        <span>Charges apply at <strong className="text-foreground">USD 5.00 per kg + applicable GST</strong>.</span>
                      </li>
                    </ul>
                  </div>

                  {/* 3. Luggage Handling */}
                  <div>
                    <h3 className="font-semibold text-base mb-2">3. Luggage Handling</h3>
                    <ul className="space-y-2 text-muted-foreground text-sm md:text-base">
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        <span>In exceptional or operational circumstances, luggage may be transported on a later flight.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        <span>All such situations are handled in accordance with the Seaplane Carrier or Domestic Airline regulations.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        <span>The resort does not accept liability for any delays in luggage delivery due to these reasons.</span>
                      </li>
                    </ul>
                  </div>

                  {/* 4. Speedboat Transfers */}
                  <div>
                    <h3 className="font-semibold text-base mb-2">4. Speedboat Transfers</h3>
                    <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
                      No strict baggage weight limitations apply for speedboat transfers.
                    </p>
                  </div>

                  <div className="bg-accent/10 p-4 rounded-lg">
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      <strong className="text-foreground">Note:</strong> Baggage policies are set by the seaplane and domestic airline carriers and are subject to change without prior notice.
                    </p>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Service Charges */}
            <AccordionItem value="service-charges" className="bg-background rounded-lg border shadow-sm px-4">
              <AccordionTrigger className="text-left hover:no-underline py-5">
                <div className="flex items-center gap-3">
                  <DollarSign className="w-5 h-5 text-primary shrink-0" />
                  <span className="text-lg md:text-xl font-semibold">Service Charges</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pb-5">
                <p className="text-muted-foreground text-sm md:text-base leading-relaxed text-left pt-2">
                  A fixed service charge applies to all bookings. This fee is non-refundable under all circumstances, including when a cancellation results in a full or partial refund from the hotel.
                </p>
              </AccordionContent>
            </AccordionItem>

            {/* Booking, Credit & Refund Policy */}
            <AccordionItem value="booking-credit-refund" className="bg-background rounded-lg border shadow-sm px-4">
              <AccordionTrigger className="text-left hover:no-underline py-5">
                <div className="flex items-center gap-3">
                  <RefreshCw className="w-5 h-5 text-primary shrink-0" />
                  <span className="text-lg md:text-xl font-semibold">Booking, Credit & Refund Policy</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pb-5">
                <div className="space-y-3 pt-2 text-left text-muted-foreground text-sm md:text-base leading-relaxed">
                  <p>
                    The <strong className="text-foreground">25% service fee</strong> is part of the agreement between our company and our partner resorts and applies in the case of any refund request.
                  </p>
                  <p>
                    If a refund is requested, the 25% service fee will be deducted in accordance with the agreed terms.
                  </p>
                  <p>
                    Alternatively, guests may choose to keep the full amount paid as a <strong className="text-foreground">credit with the hotel</strong> for a future booking. In this case, no service fee will be applied.
                  </p>
                  <p>
                    The credit remains valid for a future stay and can be used subject to the hotel's availability.
                  </p>
                  <p>
                    As per our agreement with partner resorts and financial policies, we are unable to waive the service fee for refunds.
                  </p>
                  <div className="bg-accent/10 p-4 rounded-lg">
                    <p>
                      As a gesture of goodwill, we will extend a <strong className="text-foreground">significant additional discount</strong> on your future booking to compensate for the service charges.
                    </p>
                  </div>
                  <div className="bg-primary/5 border border-primary/20 p-4 rounded-lg">
                    <p>
                      Please note that airport operations are expected to resume fully soon. In the meantime, some routes are already operating, including flights from Kuwait, as well as connections via Dubai to the Maldives.
                    </p>
                  </div>
                  <p className="text-xs md:text-sm italic pt-2">
                    By proceeding with the booking, guests acknowledge and accept these terms and conditions.
                  </p>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Refund Policy FAQ */}
            <AccordionItem value="refund-faq" className="bg-background rounded-lg border shadow-sm px-4">
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center gap-3 text-left">
                  <FileText className="w-5 h-5 text-primary shrink-0" />
                  <span className="font-semibold">Refund Policy – Frequently Asked Questions</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground space-y-4 pt-2">
                <div>
                  <p className="font-semibold text-foreground mb-1">How long is my hotel credit valid?</p>
                  <p>Hotel credit is typically valid for 12 months from the original booking date and can be applied to any future stay at the same partner resort, subject to availability and seasonal rates.</p>
                </div>
                <div>
                  <p className="font-semibold text-foreground mb-1">Can I transfer my credit to another guest?</p>
                  <p>Credits are issued in the original guest's name. Transfers may be possible on a case-by-case basis with the resort's approval — please contact us via WhatsApp to request this.</p>
                </div>
                <div>
                  <p className="font-semibold text-foreground mb-1">Why is the 25% service fee deducted on refunds?</p>
                  <p>The 25% service fee covers the operational, advisory, and partner commitments made on your behalf at the time of booking. It is part of our agreement with partner resorts and applies only when a refund is requested instead of a credit.</p>
                </div>
                <div>
                  <p className="font-semibold text-foreground mb-1">Can the service fee be waived?</p>
                  <p>The service fee cannot be waived for refunds. However, if you choose to keep your payment as hotel credit, no service fee is deducted, and we extend an additional goodwill discount on your future booking.</p>
                </div>
                <div>
                  <p className="font-semibold text-foreground mb-1">How long does a refund take to process?</p>
                  <p>Once approved, refunds are typically processed within 14–21 business days, depending on the resort and the original payment method.</p>
                </div>
                <div>
                  <p className="font-semibold text-foreground mb-1">Can I change my destination when using credit?</p>
                  <p>Credit is generally tied to the original partner resort. Changing destinations may be possible subject to the resort's policy — our advisory team can help explore options.</p>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Terms;
