import {
  ReactNode,
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";

import {
  addDays,
  addWeeks,
  addMonths,
  subDays,
  subWeeks,
  subMonths,
  format,
  set,
} from "date-fns";

import { useBreakpoint } from "use-breakpoint";

import { CalendarMonth } from "./CalendarMonth";
import { CalendarWeek } from "./CalendarWeek";
import { CalendarDay } from "./CalendarDay";

interface CalendarContextData {
  onHandleNext: () => void;
  onHandlePrev: () => void;
  onHandleToday: () => void;
  setTypeNavigation: (type: "month" | "week" | "day") => void;
  typeNavigation: "month" | "week" | "day";
}

const CalendarContext = createContext<CalendarContextData>(
  {} as CalendarContextData
);

export const CalendarRoot = ({ children }: { children: ReactNode }) => {
  const { breakpoint } = useBreakpoint({
    mobile: 0,
    tablet: 768,
    desktop: 1024,
  });

  const [date, setDate] = useState<Date>(new Date());
  const [typeNavigation, setTypeNavigation] = useState<
    "month" | "week" | "day"
  >("month");

  const onHandleNext = useCallback(() => {
    setDate((currentDate) => {
      switch (typeNavigation) {
        case "day":
          return addDays(currentDate, 1);
        case "week":
          return addWeeks(currentDate, 1);
        case "month":
        default:
          return addMonths(currentDate, 1);
      }
    });
  }, [typeNavigation]);

  const onHandlePrev = useCallback(() => {
    setDate((currentDate) => {
      switch (typeNavigation) {
        case "day":
          return subDays(currentDate, 1);
        case "week":
          return subWeeks(currentDate, 1);
        case "month":
        default:
          return subMonths(currentDate, 1);
      }
    });
  }, [typeNavigation]);

  const onHandleToday = useCallback(() => {
    setDate(new Date());
  }, []);

  useEffect(() => {
    const formattedDate = format(date, "yyyy/MM/dd");
    console.log(formattedDate);
  }, [date]);

  useEffect(() => {
    switch (breakpoint) {
      case "mobile":
        return setTypeNavigation("day");
      case "tablet":
        return setTypeNavigation("week");
      case "desktop":
      default:
        return setTypeNavigation("month");
    }
  }, [breakpoint]);

  return (
    <CalendarContext.Provider
      value={{
        onHandleNext,
        onHandlePrev,
        onHandleToday,
        setTypeNavigation,
        typeNavigation,
      }}
    >
      <div className="w-full">{children}</div>

      {breakpoint}

      {(breakpoint === "desktop" || breakpoint === "tablet") &&
        typeNavigation === "week" && <CalendarWeek />}
      {breakpoint === "desktop" && typeNavigation === "month" && (
        <CalendarMonth />
      )}
      {typeNavigation === "day" && <CalendarDay />}
      {/* Default => <CalendarMonth /> */}
    </CalendarContext.Provider>
  );
};

export function useCalendar(): CalendarContextData {
  const context = useContext(CalendarContext);

  if (!context) {
    throw new Error("useCalendar must be used within a NavigationProvider");
  }

  return context;
}
