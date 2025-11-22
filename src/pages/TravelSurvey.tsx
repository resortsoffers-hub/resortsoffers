import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Send, Loader2 } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const surveySchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email required"),
  interestedDestination: z.string().min(2, "Please select a destination"),
  travelType: z.string().min(2, "Please select travel type"),
  budget: z.string().min(1, "Please select your budget range"),
  message: z.string().optional(),
});

type SurveyFormData = z.infer<typeof surveySchema>;

export default function TravelSurvey() {
  const surveyForm = useForm<SurveyFormData>({
    resolver: zodResolver(surveySchema),
  });

  const onSurveySubmit = async (data: SurveyFormData) => {
    try {
      console.log("Survey data:", data);
      toast.success("Thank you! We'll send you personalized offers soon.");
      surveyForm.reset();
    } catch (error: any) {
      toast.error("Error submitting survey: " + error.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 section-padding bg-gradient-to-b from-background to-muted">
        <div className="container-custom max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Travel Preferences Survey
            </h1>
            <p className="text-lg text-muted-foreground">
              Help us create your perfect travel package tailored to your preferences
            </p>
          </div>

          <Card className="border-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Send className="h-6 w-6 text-primary" />
                Tell Us About Your Dream Trip
              </CardTitle>
              <CardDescription>
                Share your travel preferences and we'll send you personalized recommendations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={surveyForm.handleSubmit(onSurveySubmit)} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="surveyName">Your Name *</Label>
                    <Input
                      id="surveyName"
                      {...surveyForm.register("name")}
                      placeholder="John Doe"
                    />
                    {surveyForm.formState.errors.name && (
                      <p className="text-sm text-destructive">
                        {surveyForm.formState.errors.name.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="surveyEmail">Email *</Label>
                    <Input
                      id="surveyEmail"
                      type="email"
                      {...surveyForm.register("email")}
                      placeholder="john@example.com"
                    />
                    {surveyForm.formState.errors.email && (
                      <p className="text-sm text-destructive">
                        {surveyForm.formState.errors.email.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="interestedDestination">Destination of Interest *</Label>
                  <Select onValueChange={(value) => surveyForm.setValue("interestedDestination", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a destination" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="maldives">Maldives</SelectItem>
                      <SelectItem value="seychelles">Seychelles</SelectItem>
                      <SelectItem value="mauritius">Mauritius</SelectItem>
                      <SelectItem value="greece">Greece</SelectItem>
                      <SelectItem value="italy">Italy</SelectItem>
                      <SelectItem value="switzerland">Switzerland</SelectItem>
                      <SelectItem value="norway">Norway</SelectItem>
                      <SelectItem value="japan">Japan</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="travelType">Travel Type *</Label>
                  <Select onValueChange={(value) => surveyForm.setValue("travelType", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select travel type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="honeymoon">Honeymoon</SelectItem>
                      <SelectItem value="family">Family Vacation</SelectItem>
                      <SelectItem value="group">Group Travel</SelectItem>
                      <SelectItem value="solo">Solo Adventure</SelectItem>
                      <SelectItem value="business">Business & Leisure</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="budget">Budget Range *</Label>
                  <Select onValueChange={(value) => surveyForm.setValue("budget", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select budget range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="budget">Budget ($1,000 - $3,000)</SelectItem>
                      <SelectItem value="moderate">Moderate ($3,000 - $7,000)</SelectItem>
                      <SelectItem value="luxury">Luxury ($7,000 - $15,000)</SelectItem>
                      <SelectItem value="ultra-luxury">Ultra Luxury ($15,000+)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="surveyMessage">Additional Information</Label>
                  <Textarea
                    id="surveyMessage"
                    {...surveyForm.register("message")}
                    placeholder="Tell us about your travel preferences, special requests, or any questions..."
                    rows={4}
                    className="resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full"
                  disabled={surveyForm.formState.isSubmitting}
                >
                  {surveyForm.formState.isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" />
                      Submit Survey
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
