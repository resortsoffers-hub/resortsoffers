import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Shield, Users, Award, Handshake, Mail, ExternalLink, Building2, Megaphone, Palette, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";

const AboutUs = () => {
  const policyPrinciples = [
    "We do not operate as a price-comparison platform or a transactional booking agency.",
    "Customized proposals and advisory services are extended exclusively to members, or prospective members, who demonstrate clear intent and hold direct decision-making authority.",
    "Clients are free to explore alternative providers; however, we do not participate in parallel sourcing, price circulation, or auction-style negotiations.",
    "Requests for repeated quotations without commitment, transparency, or constructive feedback are not supported.",
    "We prioritize engagements where there is mutual alignment, professional respect, and a shared commitment to a long-term, value-based relationship. Where such alignment is not present, we respectfully and decisively discontinue the engagement."
  ];

  return (
    <>
      <Helmet>
        <title>About Us | Resorts Offers - Private Membership Travel Advisory</title>
        <meta 
          name="description" 
          content="Resorts Offers is a private, membership-based travel advisory serving select clientele who value discretion, expertise, and long-term collaboration." 
        />
      </Helmet>

      <Navbar />

      <main className="pt-14">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-primary to-primary/90 text-white py-20 md:py-28">
          <div className="container-custom text-center">
            <h1 className="text-3xl md:text-5xl font-bold mb-6">
              Private Membership Travel Advisory
            </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              We operate as a private, membership-based travel advisory, serving a select clientele who value discretion, expertise, and long-term collaboration.
            </p>
          </div>
        </section>

        {/* Founding Vision */}
        <section className="py-16 bg-white">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto text-center">
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center">
                  <Award className="w-8 h-8 text-accent-strong" />
                </div>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-primary mb-6">
                Our Vision
              </h2>
              <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
                <p>
                  Founded Resorts Offers with a clear vision — to redefine bespoke luxury travel.
                </p>
                <p>
                  Together with a passionate team of experts, we create tailor-made travel experiences designed to exceed your expectations. With deep industry knowledge, exclusive partnerships, and a commitment to exceptional service, we offer unique experiences and privileged access you won't find elsewhere.
                </p>
                <p>
                  From private events and personalized excursions to exclusive tours, we bring your travels to life — carefully curating every detail to perfection.
                </p>
                <p>
                  We're here for you at every step, ready to answer questions, offer recommendations, and make sure your experience is seamless.
                </p>
                <p className="font-semibold text-primary">
                  Discretion and confidentiality are always at the core of what we do.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Mission Statement */}
        <section className="py-16 bg-slate-50">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto text-center">
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <Handshake className="w-8 h-8 text-primary" />
                </div>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-primary mb-6">
                Our Philosophy
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Our services are intentionally designed to support strategic, value-driven relationships rather than transactional engagements. We believe in building lasting partnerships based on mutual respect, transparency, and shared commitment to excellence.
              </p>
            </div>
          </div>
        </section>

        {/* Policy Principles */}
        <section className="py-16 bg-slate-50">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <div className="flex justify-center mb-6">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                    <Shield className="w-8 h-8 text-primary" />
                  </div>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4">
                  Policy Principles
                </h2>
                <p className="text-muted-foreground">
                  Our commitment to quality and integrity guides every engagement.
                </p>
              </div>

              <div className="space-y-4">
                {policyPrinciples.map((principle, index) => (
                  <div 
                    key={index}
                    className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
                  >
                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center">
                        <span className="text-accent-strong font-bold text-sm">{index + 1}</span>
                      </div>
                      <p className="text-gray-700 leading-relaxed">{principle}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 p-6 bg-primary/5 rounded-xl border border-primary/10">
                <p className="text-center text-muted-foreground italic">
                  This policy exists to protect the quality of our service, the integrity of our advisory model, and the value delivered to our resort partners and members.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Commitment Statement */}
        <section className="py-16 bg-white">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto">
              <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-8 md:p-12 text-white">
                <div className="flex justify-center mb-6">
                  <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center">
                    <Award className="w-8 h-8 text-accent-strong" />
                  </div>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-center mb-6">
                  Our Commitment
                </h2>
                <p className="text-white/90 leading-relaxed text-center mb-8">
                  You are, of course, free to proceed with any provider of your choice. However, given that our work requires direct decision-making authority and a committed approach, it would not be an effective use of our time or resources to continue in the absence of that alignment. For this reason, we will respectfully pause the conversation at this stage.
                </p>
                <p className="text-white/90 leading-relaxed text-center">
                  Should your expectations align with a relationship based on transparency, authority, and long-term value in the future, you are welcome to contact us by email.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Sister Agency */}
        <section className="py-16 bg-white">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-10">
                <div className="flex justify-center mb-6">
                  <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center">
                    <Building2 className="w-8 h-8 text-accent-strong" />
                  </div>
                </div>
                <span className="inline-block text-xs font-semibold tracking-widest uppercase text-accent-strong mb-3">
                  Sister Agency
                </span>
                <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4">
                  Noel Marketing & Design Management
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Our trusted creative partner, delivering branding, marketing, and design solutions that complement our luxury travel advisory services.
                </p>
              </div>

              <div className="bg-gradient-to-br from-slate-50 to-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-8 md:p-10">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-8">
                    <div>
                      <h3 className="text-2xl font-bold text-primary mb-1">Noel.ae</h3>
                      <p className="text-sm text-muted-foreground">
                        Marketing & Design Management LLC — United Arab Emirates
                      </p>
                    </div>
                    <Button
                      asChild
                      size="lg"
                      className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold shadow-md"
                    >
                      <a
                        href="https://noel.ae"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Visit Noel.ae website (opens in a new tab)"
                      >
                        Visit Noel.ae
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </Button>
                  </div>

                  <p className="text-muted-foreground leading-relaxed mb-8">
                    Founded under the same leadership as Resorts Offers, Noel.ae specializes in elevating brands through strategic marketing, bespoke design, and full-service creative management. From concept to execution, Noel.ae crafts visual identities and campaigns that resonate with discerning audiences across hospitality, lifestyle, and luxury sectors.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="bg-white p-5 rounded-xl border border-gray-100">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                        <Megaphone className="w-5 h-5 text-primary" />
                      </div>
                      <h4 className="font-semibold text-primary mb-1">Brand Marketing</h4>
                      <p className="text-sm text-muted-foreground">
                        Strategic campaigns tailored to luxury and lifestyle brands.
                      </p>
                    </div>
                    <div className="bg-white p-5 rounded-xl border border-gray-100">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                        <Palette className="w-5 h-5 text-primary" />
                      </div>
                      <h4 className="font-semibold text-primary mb-1">Creative Design</h4>
                      <p className="text-sm text-muted-foreground">
                        Visual identities, print, and digital design with refined craft.
                      </p>
                    </div>
                    <div className="bg-white p-5 rounded-xl border border-gray-100">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                        <Globe className="w-5 h-5 text-primary" />
                      </div>
                      <h4 className="font-semibold text-primary mb-1">Digital Management</h4>
                      <p className="text-sm text-muted-foreground">
                        End-to-end digital presence, content, and brand stewardship.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>


        <section className="py-16 bg-slate-50">
          <div className="container-custom">
            <div className="max-w-2xl mx-auto text-center">
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center">
                  <Users className="w-8 h-8 text-accent-strong" />
                </div>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-primary mb-8">
                Leadership
              </h2>
              
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                <h3 className="text-xl font-bold text-primary mb-2">
                  Nora Abdullah
                </h3>
                <p className="text-accent-strong font-semibold mb-6">
                  CEO & Founder
                </p>
                
                <div className="space-y-2 text-muted-foreground">
                  <p className="font-medium text-gray-700">Resorts Offers Tourism LLC</p>
                  <p>Noel Marketing and Design Management LLC</p>
                </div>

                <div className="mt-8 pt-6 border-t border-gray-100">
                  <a 
                    href="mailto:info@resortsoffers.com"
                    className="inline-flex items-center gap-2 text-accent-strong hover:text-accent-strong/80 font-semibold transition-colors"
                  >
                    <Mail className="w-5 h-5" />
                    info@resortsoffers.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default AboutUs;
