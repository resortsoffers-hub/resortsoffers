import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Linkedin } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Team = () => {
  const teamMembers = [
    {
      name: "Sarah Al-Rashid",
      position: "Managing Director",
      bio: "With over 20 years in luxury hospitality, Sarah leads our regional operations with strategic vision and industry expertise.",
      email: "sarah@yourbusiness.com"
    },
    {
      name: "Michael Chen",
      position: "Head of Sales & Marketing",
      bio: "Michael brings 15+ years of experience in luxury hotel sales across the Middle East and Asian markets.",
      email: "michael@yourbusiness.com"
    },
    {
      name: "Layla Hassan",
      position: "Director of Client Relations",
      bio: "Layla specializes in building lasting partnerships with premium travel agencies and corporate clients throughout the region.",
      email: "layla@yourbusiness.com"
    },
    {
      name: "James Anderson",
      position: "Revenue Management Director",
      bio: "James optimizes pricing strategies and revenue performance for our portfolio of luxury partner properties.",
      email: "james@yourbusiness.com"
    },
    {
      name: "Fatima Al-Mahmoud",
      position: "Marketing Manager",
      bio: "Fatima crafts compelling brand stories and digital marketing campaigns for our luxury hotel partners.",
      email: "fatima@yourbusiness.com"
    },
    {
      name: "David Martinez",
      position: "Business Development Manager",
      bio: "David identifies new market opportunities and develops strategic partnerships across the hospitality sector.",
      email: "david@yourbusiness.com"
    }
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-br from-primary to-primary/80 text-primary-foreground mt-20">
        <div className="container-custom text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
            Our Team
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto opacity-90">
            Meet the passionate professionals driving luxury hospitality excellence in the Middle East
          </p>
        </div>
      </section>

      {/* Team Intro */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Years of Combined Experience
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Our dedicated team brings together decades of expertise in luxury hospitality, sales, 
              marketing, and client relations. We're committed to delivering exceptional results 
              for our partner properties and creating unforgettable experiences for discerning travelers.
            </p>
          </div>

          {/* Team Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <Card key={index} className="hover:shadow-xl transition-all duration-300">
                <CardHeader>
                  <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 mx-auto mb-4" />
                  <CardTitle className="text-xl text-center">{member.name}</CardTitle>
                  <CardDescription className="text-center font-semibold text-accent">
                    {member.position}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm mb-4 text-center">
                    {member.bio}
                  </p>
                  <div className="flex justify-center gap-4 pt-4 border-t">
                    <a 
                      href={`mailto:${member.email}`} 
                      className="text-muted-foreground hover:text-primary transition-colors"
                      aria-label={`Email ${member.name}`}
                    >
                      <Mail size={20} />
                    </a>
                    <a 
                      href="#" 
                      className="text-muted-foreground hover:text-primary transition-colors"
                      aria-label={`${member.name} LinkedIn profile`}
                    >
                      <Linkedin size={20} />
                    </a>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="section-padding bg-muted">
        <div className="container-custom">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Our Core Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Excellence",
                description: "We strive for the highest standards in everything we do, from partner relationships to client service."
              },
              {
                title: "Integrity",
                description: "Transparency and honesty form the foundation of our business relationships and operations."
              },
              {
                title: "Innovation",
                description: "We continuously evolve our strategies to stay ahead in the dynamic luxury hospitality market."
              }
            ].map((value, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-4">
                  <div className="w-8 h-8 rounded-full bg-accent" />
                </div>
                <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                <p className="text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Join Our Growing Team
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            We're always looking for talented professionals passionate about excellence. 
            Explore career opportunities with us.
          </p>
          <a href="/contact">
            <button className="bg-primary text-primary-foreground px-8 py-3 rounded-lg text-lg font-semibold hover:bg-primary/90 transition-colors">
              View Career Opportunities
            </button>
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Team;
