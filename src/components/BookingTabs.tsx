import { useState } from "react";
import { Plane, Hotel, MapPin, Car, Search, Calendar, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const BookingTabs = () => {
  const [activeTab, setActiveTab] = useState("hotels");

  const tabs = [
    { id: "hotels", label: "Hotels", icon: Hotel },
    { id: "package", label: "Flight & Hotel", icon: Plane },
    { id: "flights", label: "Flights", icon: Plane },
    { id: "transfers", label: "Transfers", icon: Car },
  ];

  const destinations = [
    "Maldives",
    "Dubai",
    "Seychelles",
    "Mauritius",
    "Bali",
    "Thailand",
    "Greece",
    "Turkey",
    "Morocco",
    "Egypt"
  ];

  const whatsappNumber = "971567622484";

  const handleSearch = () => {
    const message = `Hi! I want to search for ${activeTab} deals. Please help me find the best options.`;
    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="bg-white rounded-lg shadow-xl max-w-5xl mx-auto overflow-hidden">
      {/* Tabs - dnata style */}
      <div className="flex border-b">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 py-4 px-6 text-sm font-medium transition-colors relative ${
              activeTab === tab.id
                ? "text-[#00A4E4]"
                : "text-gray-600 hover:text-[#00A4E4]"
            }`}
          >
            {tab.label}
            {activeTab === tab.id && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#00A4E4]" />
            )}
          </button>
        ))}
      </div>

      {/* Search Form */}
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Destination */}
          <div className="space-y-2">
            <label className="text-xs text-gray-500 font-medium">Going to</label>
            <Select>
              <SelectTrigger className="h-12 border-gray-200">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  <SelectValue placeholder="All" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Destinations</SelectItem>
                {destinations.map((dest) => (
                  <SelectItem key={dest} value={dest.toLowerCase()}>{dest}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Check-in */}
          <div className="space-y-2">
            <label className="text-xs text-gray-500 font-medium">Check-in - Check-out</label>
            <div className="flex items-center h-12 border rounded-md px-3 border-gray-200">
              <Calendar className="w-4 h-4 text-gray-400 mr-2" />
              <span className="text-sm text-gray-600">Select dates</span>
            </div>
          </div>

          {/* Guests */}
          <div className="space-y-2">
            <label className="text-xs text-gray-500 font-medium">Guests</label>
            <div className="flex items-center h-12 border rounded-md px-3 border-gray-200">
              <Users className="w-4 h-4 text-gray-400 mr-2" />
              <span className="text-sm text-gray-600">2 Adults, 1 Room</span>
            </div>
          </div>

          {/* Search Button */}
          <div className="flex items-end">
            <Button 
              onClick={handleSearch}
              className="w-full h-12 bg-[#00A4E4] hover:bg-[#0090c9] text-white font-semibold"
            >
              <Search className="w-5 h-5 mr-2" />
              Search
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingTabs;