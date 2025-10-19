import { useState } from "react";
import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Upload, X } from "lucide-react";

const Documents = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      
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
  };

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>Document Viewer - Resorts Offers</title>
        <meta name="description" content="View and review documents without saving" />
        <link rel="canonical" href="https://www.resortsoffers.com/documents" />
      </Helmet>
      <Navbar />
      
      <section className="section-padding mt-20">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
              Document Viewer
            </h1>
            <p className="text-xl text-muted-foreground">
              Upload and preview documents without saving them
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle>Upload Document for Preview</CardTitle>
                <CardDescription>
                  Select a file to view. Documents are not saved and will be cleared when you leave this page.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {!selectedFile ? (
                  <label className="flex flex-col items-center justify-center border-2 border-dashed border-muted rounded-lg p-12 cursor-pointer hover:border-primary transition-colors">
                    <Upload size={48} className="text-muted-foreground mb-4" />
                    <span className="text-lg font-medium mb-2">Click to upload a document</span>
                    <span className="text-sm text-muted-foreground">PDF, Images, Word, Excel files supported</span>
                    <input
                      type="file"
                      className="hidden"
                      onChange={handleFileSelect}
                      accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png,.gif"
                    />
                  </label>
                ) : (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between bg-muted p-4 rounded-lg">
                      <div className="flex items-center gap-3">
                        <FileText size={24} className="text-primary" />
                        <div>
                          <p className="font-medium">{selectedFile.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {(selectedFile.size / 1024).toFixed(2)} KB
                          </p>
                        </div>
                      </div>
                      <Button variant="ghost" size="icon" onClick={clearFile}>
                        <X size={20} />
                      </Button>
                    </div>

                    {filePreview && (
                      <div className="border rounded-lg overflow-hidden">
                        {selectedFile.type.startsWith('image/') ? (
                          <img 
                            src={filePreview} 
                            alt="Document preview" 
                            className="w-full h-auto"
                          />
                        ) : selectedFile.type === 'application/pdf' ? (
                          <iframe
                            src={filePreview}
                            className="w-full h-[600px]"
                            title="PDF preview"
                          />
                        ) : null}
                      </div>
                    )}

                    {!filePreview && (
                      <div className="text-center p-8 bg-muted rounded-lg">
                        <FileText size={48} className="mx-auto mb-4 text-muted-foreground" />
                        <p className="text-muted-foreground">
                          Preview not available for this file type
                        </p>
                      </div>
                    )}

                    <div className="flex gap-2">
                      <Button onClick={clearFile} variant="outline" className="flex-1">
                        Clear & Upload Another
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Documents;
