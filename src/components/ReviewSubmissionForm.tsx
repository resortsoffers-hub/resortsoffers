import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Star, Send, Loader2, Upload, X, Image, Video } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const nationalities = [
  "United Arab Emirates",
  "Saudi Arabia", 
  "Kuwait",
  "Qatar",
  "Bahrain",
  "Oman",
  "Egypt",
  "Jordan",
  "Lebanon",
  "Morocco",
  "United States",
  "United Kingdom",
  "Germany",
  "France",
  "Italy",
  "Spain",
  "Russia",
  "China",
  "India",
  "Australia",
  "Canada",
  "Japan",
  "South Korea",
  "Brazil",
  "South Africa",
  "Other"
];

const destinations = [
  "Maldives",
  "Dubai",
  "Thailand",
  "Bali",
  "Seychelles",
  "Mauritius",
  "Phuket",
  "Greece",
  "Italy",
  "Switzerland",
  "France",
  "Spain",
  "Morocco",
  "Turkey",
  "Japan",
  "Vietnam",
  "Other"
];

const reviewSchema = z.object({
  customer_name: z.string().trim().min(2, "Name must be at least 2 characters").max(100),
  nationality: z.string().min(1, "Please select your nationality"),
  destination: z.string().min(1, "Please select a destination"),
  hotel_name: z.string().trim().min(2, "Hotel name must be at least 2 characters").max(200),
  travel_start_date: z.string().min(1, "Please select travel start date"),
  travel_end_date: z.string().min(1, "Please select travel end date"),
  rating: z.number().min(1, "Please select a rating").max(5),
  review_text: z.string().trim().min(20, "Review must be at least 20 characters").max(2000),
});

type ReviewFormData = z.infer<typeof reviewSchema>;

interface MediaFile {
  file: File;
  preview: string;
  type: 'image' | 'video';
}

const MAX_FILES = 5;
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

const ReviewSubmissionForm = () => {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [mediaFiles, setMediaFiles] = useState<MediaFile[]>([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<ReviewFormData>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      rating: 0,
    },
  });

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newFiles: MediaFile[] = [];
    const remainingSlots = MAX_FILES - mediaFiles.length;

    for (let i = 0; i < Math.min(files.length, remainingSlots); i++) {
      const file = files[i];
      
      if (file.size > MAX_FILE_SIZE) {
        toast.error(`${file.name} is too large. Max size is 10MB.`);
        continue;
      }

      const isImage = file.type.startsWith('image/');
      const isVideo = file.type.startsWith('video/');

      if (!isImage && !isVideo) {
        toast.error(`${file.name} is not a valid image or video.`);
        continue;
      }

      newFiles.push({
        file,
        preview: URL.createObjectURL(file),
        type: isImage ? 'image' : 'video',
      });
    }

    if (files.length > remainingSlots) {
      toast.warning(`Only ${remainingSlots} more file(s) can be added. Max ${MAX_FILES} files.`);
    }

    setMediaFiles(prev => [...prev, ...newFiles]);
    
    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const removeFile = (index: number) => {
    setMediaFiles(prev => {
      const newFiles = [...prev];
      URL.revokeObjectURL(newFiles[index].preview);
      newFiles.splice(index, 1);
      return newFiles;
    });
  };

  const uploadMedia = async (): Promise<string[]> => {
    const urls: string[] = [];
    
    for (let i = 0; i < mediaFiles.length; i++) {
      const { file } = mediaFiles[i];
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
      const filePath = `reviews/${fileName}`;

      const { error } = await supabase.storage
        .from('review-media')
        .upload(filePath, file);

      if (error) {
        console.error('Upload error:', error);
        throw new Error(`Failed to upload ${file.name}`);
      }

      const { data: urlData } = supabase.storage
        .from('review-media')
        .getPublicUrl(filePath);

      urls.push(urlData.publicUrl);
      setUploadProgress(((i + 1) / mediaFiles.length) * 100);
    }

    return urls;
  };

  const onSubmit = async (data: ReviewFormData) => {
    setIsSubmitting(true);
    setUploadProgress(0);
    
    try {
      let mediaUrls: string[] = [];
      
      if (mediaFiles.length > 0) {
        mediaUrls = await uploadMedia();
      }

      const { error } = await supabase.from("customer_reviews").insert({
        customer_name: data.customer_name,
        nationality: data.nationality,
        destination: data.destination,
        hotel_name: data.hotel_name,
        travel_start_date: data.travel_start_date,
        travel_end_date: data.travel_end_date,
        rating: data.rating,
        review_text: data.review_text,
        media_urls: mediaUrls,
      });

      if (error) throw error;

      toast.success("Thank you for your review!", {
        description: "Your review has been submitted and will be published after approval.",
      });
      
      reset();
      setRating(0);
      setMediaFiles([]);
    } catch (error) {
      console.error("Error submitting review:", error);
      toast.error("Failed to submit review", {
        description: "Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
      setUploadProgress(0);
    }
  };

  const handleRatingClick = (value: number) => {
    setRating(value);
    setValue("rating", value, { shouldValidate: true });
  };

  return (
    <Card className="border-2 border-primary/20">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl md:text-3xl">Share Your Experience</CardTitle>
        <CardDescription className="text-base">
          Tell us about your luxury resort vacation
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Personal Information */}
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="customer_name">Your Name *</Label>
              <Input
                id="customer_name"
                placeholder="Enter your name"
                {...register("customer_name")}
              />
              {errors.customer_name && (
                <p className="text-sm text-destructive">{errors.customer_name.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="nationality">Nationality *</Label>
              <Select onValueChange={(value) => setValue("nationality", value, { shouldValidate: true })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your nationality" />
                </SelectTrigger>
                <SelectContent>
                  {nationalities.map((nat) => (
                    <SelectItem key={nat} value={nat}>
                      {nat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.nationality && (
                <p className="text-sm text-destructive">{errors.nationality.message}</p>
              )}
            </div>
          </div>

          {/* Trip Details */}
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="destination">Destination *</Label>
              <Select onValueChange={(value) => setValue("destination", value, { shouldValidate: true })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select destination" />
                </SelectTrigger>
                <SelectContent>
                  {destinations.map((dest) => (
                    <SelectItem key={dest} value={dest}>
                      {dest}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.destination && (
                <p className="text-sm text-destructive">{errors.destination.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="hotel_name">Hotel/Resort Name *</Label>
              <Input
                id="hotel_name"
                placeholder="Enter hotel or resort name"
                {...register("hotel_name")}
              />
              {errors.hotel_name && (
                <p className="text-sm text-destructive">{errors.hotel_name.message}</p>
              )}
            </div>
          </div>

          {/* Travel Dates */}
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="travel_start_date">Travel Start Date *</Label>
              <Input
                id="travel_start_date"
                type="date"
                {...register("travel_start_date")}
              />
              {errors.travel_start_date && (
                <p className="text-sm text-destructive">{errors.travel_start_date.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="travel_end_date">Travel End Date *</Label>
              <Input
                id="travel_end_date"
                type="date"
                {...register("travel_end_date")}
              />
              {errors.travel_end_date && (
                <p className="text-sm text-destructive">{errors.travel_end_date.message}</p>
              )}
            </div>
          </div>

          {/* Rating */}
          <div className="space-y-2">
            <Label>Your Rating *</Label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((value) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => handleRatingClick(value)}
                  onMouseEnter={() => setHoveredRating(value)}
                  onMouseLeave={() => setHoveredRating(0)}
                  className="focus:outline-none transition-transform hover:scale-110"
                >
                  <Star
                    className={`w-8 h-8 ${
                      value <= (hoveredRating || rating)
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-muted-foreground"
                    }`}
                  />
                </button>
              ))}
            </div>
            {errors.rating && (
              <p className="text-sm text-destructive">{errors.rating.message}</p>
            )}
          </div>

          {/* Review Text */}
          <div className="space-y-2">
            <Label htmlFor="review_text">Your Review *</Label>
            <Textarea
              id="review_text"
              placeholder="Share your experience... What did you love about your stay? Any highlights or recommendations?"
              rows={5}
              {...register("review_text")}
            />
            {errors.review_text && (
              <p className="text-sm text-destructive">{errors.review_text.message}</p>
            )}
          </div>

          {/* Media Upload */}
          <div className="space-y-3">
            <Label className="flex items-center gap-2">
              <Upload className="w-4 h-4" />
              Photos & Videos (Optional)
            </Label>
            <p className="text-sm text-muted-foreground">
              Add up to {MAX_FILES} photos or videos to share your experience (max 10MB each)
            </p>
            
            {/* Upload Button */}
            <div className="flex gap-2">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*,video/*"
                multiple
                onChange={handleFileSelect}
                className="hidden"
                disabled={mediaFiles.length >= MAX_FILES}
              />
              <Button
                type="button"
                variant="outline"
                onClick={() => fileInputRef.current?.click()}
                disabled={mediaFiles.length >= MAX_FILES}
                className="gap-2"
              >
                <Image className="w-4 h-4" />
                Add Photos
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => fileInputRef.current?.click()}
                disabled={mediaFiles.length >= MAX_FILES}
                className="gap-2"
              >
                <Video className="w-4 h-4" />
                Add Videos
              </Button>
            </div>

            {/* Preview Grid */}
            {mediaFiles.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 mt-4">
                {mediaFiles.map((media, index) => (
                  <div key={index} className="relative group aspect-square rounded-lg overflow-hidden bg-muted">
                    {media.type === 'image' ? (
                      <img
                        src={media.preview}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <video
                        src={media.preview}
                        className="w-full h-full object-cover"
                      />
                    )}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <button
                        type="button"
                        onClick={() => removeFile(index)}
                        className="p-1.5 bg-destructive text-destructive-foreground rounded-full hover:bg-destructive/90"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                    {media.type === 'video' && (
                      <div className="absolute bottom-1 right-1 bg-black/60 px-1.5 py-0.5 rounded text-xs text-white">
                        <Video className="w-3 h-3" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Upload Progress */}
            {isSubmitting && uploadProgress > 0 && uploadProgress < 100 && (
              <div className="space-y-1">
                <div className="text-sm text-muted-foreground">
                  Uploading media... {Math.round(uploadProgress)}%
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-primary transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
              </div>
            )}
          </div>

          <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Submitting...
              </>
            ) : (
              <>
                <Send className="w-4 h-4 mr-2" />
                Submit Review
              </>
            )}
          </Button>
          
          <p className="text-sm text-muted-foreground text-center">
            Your review will be published after approval
          </p>
        </form>
      </CardContent>
    </Card>
  );
};

export default ReviewSubmissionForm;