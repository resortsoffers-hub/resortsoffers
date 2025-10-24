import { useState } from "react";
import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Upload, X, Download, Eye, Shield } from "lucide-react";
import packagesImage from "@/assets/packages.jpg";

const Documents = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [showCompanyDoc, setShowCompanyDoc] = useState(true);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setShowCompanyDoc(false);
      
      // Create preview for images and PDFs
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setFilePreview(reader.result as string);
        };
        reader.readAsDataURL(file);
      } else if (file.type === 'application/pdf') {
        const fileUrl = URL.createObjectURL(file);
        setFilePreview(fileUrl);
      } else {
        setFilePreview(null);
      }
    }
  };

  const clearFile = () => {
    setSelectedFile(null);
    setFilePreview(null);
    setShowCompanyDoc(true);
  };

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>Download Center - Company Profile & Documents | Resorts Offers</title>
        <meta name="description" content="Download Resorts Offers company profile and documents. Access our comprehensive travel consultancy information and service offerings." />
        <link rel="canonical" href="https://www.resortsoffers.com/documents" />
      </Helmet>
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden mt-24">
        <div className="absolute inset-0">
          <img 
            src={packagesImage} 
            alt="Document management" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-primary/80 to-primary/60" />
        </div>
        
        <div className="relative z-10 container-custom text-center">
          <h1 className="text-4xl md:text-6xl font-bold hero-text mb-6 animate-fade-in">
            Download Center
          </h1>
          <p className="text-xl md:text-2xl hero-text max-w-3xl mx-auto">
            Access and download our company documents and offers catalog
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 md:py-32 bg-muted">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <Card className="text-center hover:shadow-xl transition-all duration-300 animate-fade-in">
              <CardHeader>
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <Download className="w-8 h-8 text-primary" />
                </div>
                <CardTitle>Easy Download</CardTitle>
                <CardDescription>
                  Download documents instantly with one click
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center hover:shadow-xl transition-all duration-300 animate-fade-in" style={{ animationDelay: '0.1s' }}>
              <CardHeader>
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <Shield className="w-8 h-8 text-primary" />
                </div>
                <CardTitle>Secure Viewing</CardTitle>
                <CardDescription>
                  Documents are not stored and are cleared automatically
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center hover:shadow-xl transition-all duration-300 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <CardHeader>
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <FileText className="w-8 h-8 text-primary" />
                </div>
                <CardTitle>Multiple Formats</CardTitle>
                <CardDescription>
                  Support for PDF, images, Word, and Excel documents
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Document Viewer Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="max-w-5xl mx-auto">
            <Card className="shadow-2xl">
              <CardHeader className="bg-gradient-to-r from-primary/5 to-accent/5">
                <CardTitle className="text-2xl">Company Documents</CardTitle>
                <CardDescription className="text-base">
                  Download our company profile and offers catalog
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                {showCompanyDoc && !selectedFile ? (
                  <div className="space-y-6 animate-fade-in">
                    <div className="p-6 bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg">
                      <div className="flex items-start gap-4 mb-4">
                        <div className="w-16 h-16 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
                          <FileText className="w-8 h-8 text-primary-foreground" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold mb-2">
                            Resorts Offers Company Profile
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            View our comprehensive company information and service offerings. Download the PDF to keep for your records.
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <Button variant="default" size="lg" asChild className="flex-1">
                          <a href="/Resorts_Offers_REP.pdf" download="Resorts_Offers_Company_Profile.pdf">
                            <Download size={18} className="mr-2" />
                            Download Company Profile
                          </a>
                        </Button>
                        <Button variant="outline" size="lg" asChild>
                          <a href="/Resorts_Offers_REP.pdf" target="_blank" rel="noopener noreferrer">
                            <Eye size={18} className="mr-2" />
                            Preview
                          </a>
                        </Button>
                      </div>
                    </div>
                    <div className="border-2 border-primary/20 rounded-xl overflow-hidden shadow-lg">
                      <iframe
                        src="/Resorts_Offers_REP.pdf"
                        className="w-full h-[700px]"
                        title="Resorts Offers Company Profile"
                      />
                    </div>
                  </div>
                ) : !selectedFile ? (
                  <label className="flex flex-col items-center justify-center border-2 border-dashed border-primary/40 rounded-xl p-16 cursor-pointer hover:border-primary hover:bg-primary/5 transition-all duration-300 animate-fade-in">
                    <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                      <Upload size={40} className="text-primary" />
                    </div>
                    <span className="text-xl font-semibold mb-2">Click to upload a document</span>
                    <span className="text-base text-muted-foreground mb-4">or drag and drop your file here</span>
                    <span className="text-sm text-muted-foreground bg-muted px-4 py-2 rounded-full">
                      PDF, Images, Word, Excel files supported
                    </span>
                    <input
                      type="file"
                      className="hidden"
                      onChange={handleFileSelect}
                      accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png,.gif"
                    />
                  </label>
                ) : (
                  <div className="space-y-6 animate-fade-in">
                    <div className="flex items-center justify-between bg-gradient-to-r from-primary/10 to-accent/10 p-6 rounded-xl shadow-md">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                          <FileText size={24} className="text-primary-foreground" />
                        </div>
                        <div>
                          <p className="font-semibold text-lg">{selectedFile.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {(selectedFile.size / 1024).toFixed(2)} KB
                          </p>
                        </div>
                      </div>
                      <Button variant="destructive" size="icon" onClick={clearFile} className="hover-scale">
                        <X size={20} />
                      </Button>
                    </div>

                    {filePreview && (
                      <div className="border-2 border-primary/20 rounded-xl overflow-hidden shadow-lg">
                        {selectedFile.type.startsWith('image/') ? (
                          <img 
                            src={filePreview} 
                            alt="Document preview" 
                            className="w-full h-auto"
                          />
                        ) : selectedFile.type === 'application/pdf' ? (
                          <iframe
                            src={filePreview}
                            className="w-full h-[700px]"
                            title="PDF preview"
                          />
                        ) : null}
                      </div>
                    )}

                    {!filePreview && (
                      <div className="text-center p-12 bg-muted rounded-xl">
                        <FileText size={64} className="mx-auto mb-6 text-muted-foreground" />
                        <p className="text-lg font-medium text-muted-foreground mb-2">
                          Preview not available for this file type
                        </p>
                        <p className="text-sm text-muted-foreground">
                          The file has been loaded but cannot be displayed in the browser
                        </p>
                      </div>
                    )}

                    <div className="flex gap-4">
                      <Button onClick={clearFile} variant="outline" size="lg" className="flex-1">
                        <X size={18} className="mr-2" />
                        Clear & Upload Another
                      </Button>
                      <label className="flex-1 cursor-pointer">
                        <Button variant="default" size="lg" className="w-full" asChild>
                          <span>
                            <Upload size={18} className="mr-2" />
                            Upload Different File
                          </span>
                        </Button>
                        <input
                          type="file"
                          className="hidden"
                          onChange={handleFileSelect}
                          accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png,.gif"
                        />
                      </label>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="section-padding bg-primary text-primary-foreground">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Need Personalized Offers?
          </h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
            Contact our team to receive detailed brochures, customized packages, and personalized resort recommendations.
          </p>
          <a href="/contact">
            <Button size="lg" variant="secondary" className="text-lg px-8">
              Contact Our Team
            </Button>
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Documents;
