import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CalendarIcon, MapPin, Users, Minus, Plus } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface SearchBarProps {
  selectedDestination?: string;
  onDestinationChange?: (destination: string) => void;
}

const SearchBar = ({ selectedDestination = "All", onDestinationChange }: SearchBarProps) => {
  const [destination, setDestination] = useState("");
  const [checkIn, setCheckIn] = useState<Date>();
  const [checkOut, setCheckOut] = useState<Date>();
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [rooms, setRooms] = useState(1);

  const destinations = [
    "All",
    "Finland",
    "Japan",
    "China",
    "Zanzibar",
    "Maldives",
    "Seychelles",
    "Mauritius",
    "Greece",
    "Bali",
    "Thailand",
    "UK",
    "Turkey",
    "Europe",
    "Cruise"
  ];

  const handleSearch = () => {
    console.log("Search:", { destination, checkIn, checkOut, adults, children, rooms });
    // Add search logic here
  };

  return (
    <div className="w-full max-w-6xl mx-auto bg-white rounded shadow-2xl p-3 md:p-4 border-4 border-[#003B95]">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-2 md:gap-3">
        {/* Destination */}
        <div className="relative">
          <label className="text-xs font-semibold text-gray-800 mb-1 block">
            Where are you going?
          </label>
          <Select value={destination || selectedDestination} onValueChange={(value) => {
            setDestination(value);
            onDestinationChange?.(value);
          }}>
            <SelectTrigger className="w-full h-14 border-2 border-gray-300 focus:border-[#003B95] bg-white text-gray-900 font-medium">
              <div className="flex items-center">
                <MapPin className="mr-2 w-5 h-5 text-[#003B95]" />
                <SelectValue placeholder="Select destination" />
              </div>
            </SelectTrigger>
            <SelectContent className="bg-white z-50 max-h-[300px]">
              {destinations.map((dest) => (
                <SelectItem 
                  key={dest} 
                  value={dest}
                  className="cursor-pointer hover:bg-gray-100 focus:bg-gray-100"
                >
                  {dest}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Check-in Date */}
        <div>
          <label className="text-xs font-semibold text-gray-800 mb-1 block">
            Check-in date
          </label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full h-14 justify-start text-left font-medium border-2 border-gray-300 hover:border-[#003B95] bg-white text-gray-900",
                  !checkIn && "text-gray-500"
                )}
              >
                <CalendarIcon className="mr-2 h-5 w-5 text-[#003B95]" />
                {checkIn ? format(checkIn, "MMM dd, yyyy") : "Select date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 bg-white border-2 border-[#003B95]" align="start">
              <Calendar
                mode="single"
                selected={checkIn}
                onSelect={setCheckIn}
                initialFocus
                className="pointer-events-auto"
                disabled={(date) => date < new Date()}
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Check-out Date */}
        <div>
          <label className="text-xs font-semibold text-gray-800 mb-1 block">
            Check-out date
          </label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full h-14 justify-start text-left font-medium border-2 border-gray-300 hover:border-[#003B95] bg-white text-gray-900",
                  !checkOut && "text-gray-500"
                )}
              >
                <CalendarIcon className="mr-2 h-5 w-5 text-[#003B95]" />
                {checkOut ? format(checkOut, "MMM dd, yyyy") : "Select date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 bg-white border-2 border-[#003B95]" align="start">
              <Calendar
                mode="single"
                selected={checkOut}
                onSelect={setCheckOut}
                initialFocus
                className="pointer-events-auto"
                disabled={(date) => date < (checkIn || new Date())}
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Guests Selector */}
        <div>
          <label className="text-xs font-semibold text-gray-800 mb-1 block">
            Guests & Rooms
          </label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full h-14 justify-start text-left font-medium border-2 border-gray-300 hover:border-[#003B95] bg-white text-gray-900"
              >
                <Users className="mr-2 h-5 w-5 text-[#003B95]" />
                {adults} adults · {children} children · {rooms} room{rooms > 1 ? 's' : ''}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-4 bg-white border-2 border-[#003B95]" align="start">
              <div className="space-y-4">
                {/* Adults */}
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Adults</p>
                    <p className="text-xs text-muted-foreground">Ages 18+</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => setAdults(Math.max(1, adults - 1))}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-8 text-center font-medium">{adults}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => setAdults(adults + 1)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Children */}
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Children</p>
                    <p className="text-xs text-muted-foreground">Ages 0-17</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => setChildren(Math.max(0, children - 1))}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-8 text-center font-medium">{children}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => setChildren(children + 1)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Rooms */}
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Rooms</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => setRooms(Math.max(1, rooms - 1))}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-8 text-center font-medium">{rooms}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => setRooms(rooms + 1)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>

      {/* Search Button - Full Width on Mobile */}
      <div className="mt-3">
        <Button 
          onClick={handleSearch} 
          size="lg" 
          className="w-full md:w-auto md:px-16 h-14 text-base font-bold bg-[#003B95] hover:bg-[#0052CC] text-white"
        >
          Search
        </Button>
      </div>

    </div>
  );
};

export default SearchBar;
