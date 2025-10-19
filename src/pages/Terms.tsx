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
      <section className="section-padding">
        <div className="container-custom">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <CreditCard className="w-8 h-8 text-accent" />
                <CardTitle className="text-2xl">Accepted Payment Methods</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-6">
                We accept the following payment methods for your convenience:
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="flex flex-col items-center p-4 border rounded-lg">
                  <CreditCard className="w-12 h-12 text-primary mb-2" />
                  <span className="font-semibold">Visa</span>
                </div>
                <div className="flex flex-col items-center p-4 border rounded-lg">
                  <CreditCard className="w-12 h-12 text-primary mb-2" />
                  <span className="font-semibold">Amex</span>
                </div>
                <div className="flex flex-col items-center p-4 border rounded-lg">
                  <Banknote className="w-12 h-12 text-primary mb-2" />
                  <span className="font-semibold">Tabby</span>
                </div>
                <div className="flex flex-col items-center p-4 border rounded-lg">
                  <Banknote className="w-12 h-12 text-primary mb-2" />
                  <span className="font-semibold">Tamara</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Terms Content */}
      <section className="section-padding bg-muted">
        <div className="container-custom max-w-4xl">
          <div className="space-y-8">
            {/* No Show & Amendments */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">No Show, Amendments, and Other Terms</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold text-lg mb-2">Date Changes</h3>
                  <p className="text-muted-foreground">
                    Date changes are considered cancellations and subject to the applicable cancellation charges.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Name Amendments</h3>
                  <p className="text-muted-foreground">
                    Name amendments for confirmed bookings are treated as cancellations and subject to cancellation charges. 
                    The previously confirmed villa will be released and offered to the next waitlisted guest.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Early Departures</h3>
                  <p className="text-muted-foreground">
                    Early departures will be considered as no-shows.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Force Majeure */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Force Majeure Policy</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  "Force Majeure" (also known as "impossibility") covers events beyond a party's reasonable control—such 
                  as acts of God, natural disasters, terrorism, war, or government restrictions—under which either party 
                  may terminate relevant agreements without liability. The clause often requires written notice and provides 
                  a mechanism to reschedule events or reservations based on availability and negotiation.
                </p>
                
                <p className="text-muted-foreground">
                  In hotel management agreements, pandemics or epidemics may or may not be explicitly stated as force 
                  majeure—often appearing only as "events beyond reasonable control." Legal interpretations differ globally, 
                  and some agreements now add explicit references to epidemics and quarantine mandates.
                </p>

                <div>
                  <h3 className="font-semibold text-lg mb-2">Under Force Majeure - Typical Events Include:</h3>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                    <li>Natural disasters (e.g., storms, flooding, tsunami)</li>
                    <li>Government travel restrictions or curfews</li>
                    <li>Terrorist or violent incidents</li>
                    <li>Health emergencies under government regulation</li>
                    <li>Pandemic-related government restrictions</li>
                    <li>Resort closure or unavailability</li>
                  </ul>
                </div>

                <div className="bg-accent/10 p-4 rounded-lg">
                  <p className="text-sm text-muted-foreground">
                    <strong>Note:</strong> Regular weather (such as monsoon rain), transient illness, or mild disruptions 
                    usually do not meet the threshold unless they trigger official government restrictions or prevent the 
                    resort from operating at all.
                  </p>
                </div>

                <div className="bg-accent/10 p-4 rounded-lg mt-4">
                  <h3 className="font-semibold text-lg mb-2">If Your Reservation Is Affected:</h3>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                    <li>Request documentation or written notice of the force majeure event</li>
                    <li>Discuss options to rebook your stay or apply paid deposits toward a future stay</li>
                    <li>If you paid in points, inquire whether you can recover them or retain them for rescheduling</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Resort Response to Force Majeure */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Resort Response to Force Majeure Events</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  In force majeure circumstances, if an event beyond control (e.g., severe cyclone, government travel ban) 
                  prevents operation, the resort may:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                  <li>Allow termination or postponement of events/reservations</li>
                  <li>Retain deposits and apply them to rebooked or rescheduled reservations</li>
                  <li>Offer postponement or rebooking options</li>
                  <li>Retain deposits to apply to a new booking in lieu of refunds</li>
                  <li>Leave refunds or compensation, depending on contract terms</li>
                  <li>Allow termination or postponement of events/reservation</li>
                </ul>
              </CardContent>
            </Card>

            {/* General Cancellation Policy */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">General Cancellation Policy</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Hotel cancellation terms vary depending on the property and package booked. Please refer to the 
                  specific hotel's policy for applicable charges in case of modification, no-show, or cancellation.
                </p>
              </CardContent>
            </Card>

            {/* Service Charges */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Service Charges</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  A fixed service charge applies to all bookings. This fee is non-refundable under all circumstances, 
                  including when a cancellation results in a full or partial refund from the hotel.
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
