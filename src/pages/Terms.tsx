import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CreditCard, Banknote } from "lucide-react";

const Terms = () => {
  return (
    <div className="min-h-screen">
      <Helmet>
        <link rel="canonical" href="https://www.resortsoffers.com/terms" />
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
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Terms Content */}
      <section className="py-12 md:py-16 bg-muted">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="space-y-6">
            {/* No Show & Amendments */}
            <Card className="shadow-sm">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl md:text-2xl text-left">No Show, Amendments, and Other Terms</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-left">
                  <h3 className="font-semibold text-base md:text-lg mb-2">Date Changes</h3>
                  <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
                    Date changes are considered cancellations and subject to the applicable cancellation charges.
                  </p>
                </div>
                <div className="text-left">
                  <h3 className="font-semibold text-base md:text-lg mb-2">Name Amendments</h3>
                  <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
                    Name amendments for confirmed bookings are treated as cancellations and subject to cancellation charges. The previously confirmed villa will be released and offered to the next waitlisted guest.
                  </p>
                </div>
                <div className="text-left">
                  <h3 className="font-semibold text-base md:text-lg mb-2">Early Departures</h3>
                  <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
                    Early departures will be considered as no-shows.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Force Majeure */}
            <Card className="shadow-sm">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl md:text-2xl text-left">Force Majeure Policy</CardTitle>
              </CardHeader>
              <CardContent className="space-y-5">
                <p className="text-muted-foreground text-sm md:text-base leading-relaxed text-left">
                  "Force Majeure" (also known as "impossibility") covers events beyond a party's reasonable control—such as acts of God, natural disasters, terrorism, war, or government restrictions—under which either party may terminate relevant agreements without liability. The clause often requires written notice and provides a mechanism to reschedule events or reservations based on availability and negotiation.
                </p>
                
                <p className="text-muted-foreground text-sm md:text-base leading-relaxed text-left">
                  In hotel management agreements, pandemics or epidemics may or may not be explicitly stated as force majeure—often appearing only as "events beyond reasonable control." Legal interpretations differ globally, and some agreements now add explicit references to epidemics and quarantine mandates.
                </p>

                <div className="text-left">
                  <h3 className="font-semibold text-base md:text-lg mb-3">Under Force Majeure - Typical Events Include:</h3>
                  <ul className="space-y-2 text-muted-foreground text-sm md:text-base">
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Natural disasters (e.g., storms, flooding, tsunami)</span>
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
                      <span>Health emergencies under government regulation</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Pandemic-related government restrictions</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Resort closure or unavailability</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-accent/10 p-4 rounded-lg text-left">
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    <strong className="text-foreground">Note:</strong> Regular weather (such as monsoon rain), transient illness, or mild disruptions usually do not meet the threshold unless they trigger official government restrictions or prevent the resort from operating at all.
                  </p>
                </div>

                <div className="bg-primary/5 border border-primary/20 p-4 rounded-lg text-left">
                  <h3 className="font-semibold text-base md:text-lg mb-3">If Your Reservation Is Affected:</h3>
                  <ul className="space-y-2 text-muted-foreground text-sm md:text-base">
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Request documentation or written notice of the force majeure event</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Discuss options to rebook your stay or apply paid deposits toward a future stay</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>If you paid in points, inquire whether you can recover them or retain them for rescheduling</span>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Resort Response to Force Majeure */}
            <Card className="shadow-sm">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl md:text-2xl text-left">Resort Response to Force Majeure Events</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-left">
                <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
                  In force majeure circumstances, if an event beyond control (e.g., severe cyclone, government travel ban) prevents operation, the resort may:
                </p>
                <ul className="space-y-2 text-muted-foreground text-sm md:text-base">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Allow termination or postponement of events/reservations</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Retain deposits and apply them to rebooked or rescheduled reservations</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Offer postponement or rebooking options</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Leave refunds or compensation, depending on contract terms</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* General Cancellation Policy */}
            <Card className="shadow-sm">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl md:text-2xl text-left">General Cancellation Policy</CardTitle>
              </CardHeader>
              <CardContent className="text-left">
                <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
                  Hotel cancellation terms vary depending on the property and package booked. Please refer to the specific hotel's policy for applicable charges in case of modification, no-show, or cancellation.
                </p>
              </CardContent>
            </Card>

            {/* Service Charges */}
            <Card className="shadow-sm">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl md:text-2xl text-left">Service Charges</CardTitle>
              </CardHeader>
              <CardContent className="text-left">
                <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
                  A fixed service charge applies to all bookings. This fee is non-refundable under all circumstances, including when a cancellation results in a full or partial refund from the hotel.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Terms;
