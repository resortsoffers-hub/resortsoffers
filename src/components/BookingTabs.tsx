import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plane, Hotel, Calendar, MapPin } from "lucide-react";
import SearchBar from "./SearchBar";

const BookingTabs = () => {
  return (
    <div className="bg-white rounded-lg shadow-xl p-6 -mt-20 relative z-20 max-w-6xl mx-auto">
      <Tabs defaultValue="package" className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-6 bg-muted">
          <TabsTrigger value="package" className="flex items-center gap-2">
            <Plane className="w-4 h-4" />
            <span>Flight + Hotel</span>
          </TabsTrigger>
          <TabsTrigger value="hotels" className="flex items-center gap-2">
            <Hotel className="w-4 h-4" />
            <span>Hotels</span>
          </TabsTrigger>
          <TabsTrigger value="resorts" className="flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            <span>Resorts</span>
          </TabsTrigger>
          <TabsTrigger value="offers" className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <span>Special Offers</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="package">
          <SearchBar />
        </TabsContent>

        <TabsContent value="hotels">
          <SearchBar />
        </TabsContent>

        <TabsContent value="resorts">
          <SearchBar />
        </TabsContent>

        <TabsContent value="offers">
          <SearchBar />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BookingTabs;
