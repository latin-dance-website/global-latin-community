"use client";

import * as React from "react";
import { addDays, format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";

import { cn } from "@components/lib/utils";
import { Button } from "@components/components/ui/button";
import { Calendar } from "@components/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@components/components/ui/popover";

export function DatePickerWithRange() {
    const [date, setDate] = React.useState({
      from: new Date(2022, 0, 20),
      to: new Date(2022, 0, 30),
    });

    const isMobile = typeof window !== "undefined" && window.innerWidth < 640;
  
    return (
      <div className="p-4">
      <Calendar
        mode="range"
        selected={date}
        onSelect={setDate}
        numberOfMonths={isMobile ? 1 : 2} // Show 1 month on mobile
      />
    </div>
    );
  }
  