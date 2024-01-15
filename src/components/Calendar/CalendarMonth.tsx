import {
  getDay,
  isSameMonth,
  isToday,
  format,
  parse,
  getMonth,
  getYear,
} from "date-fns";
import { useCalendar } from "./CalendarRoot";
import CalendarEvents from "./CalendarEvents";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

export const CalendarMonth = () => {
  const {
    daysInMonth,
    date,
    events,
    onHandleNext,
    onHandlePrev,
    onHandleSetDate,
  } = useCalendar();

  let firstDayCurrentMonth = parse(
    format(date, "MMM-yyyy"),
    "MMM-yyyy",
    new Date()
  );

  const days = ["seg", "ter", "qua", "qui", "sex", "sáb", "dom"];
  const colStartClasses = [
    "",
    "col-start-2",
    "col-start-3",
    "col-start-4",
    "col-start-5",
    "col-start-6",
    "col-start-7",
  ];

  const selectDay = (day: Date) => {
    onHandleSetDate(day);
  };

  return (
    <div className="grid grid-cols-7 gap-4 place-items-center">
      {days.map((day, idx) => {
        return (
          <div key={idx} className="font-semibold">
            {day.charAt(0).toUpperCase() + day.slice(1)}
          </div>
        );
      })}

      {daysInMonth?.map((day, idx) => {
        return (
          <>
            {isSameMonth(day, firstDayCurrentMonth) ? (
              <>
                {events.filter(
                  (event) => event.date === format(day, "yyyy-MM-dd")
                ).length > 0 ? (
                  <HoverCard key={idx}>
                    <HoverCardTrigger>
                      <div
                        className={`${
                          colStartClasses[getDay(day)]
                        }  h-20 w-[100px] cursor-pointer flex flex-col px-4 py-4 font-gilroy-extrabold rounded-2xl  select-none hover:text-white ${
                          isSameMonth(day, firstDayCurrentMonth)
                            ? "text-gray-900"
                            : "text-gray-400 bg-gray-50"
                        } ${!isToday(day) && "hover:bg-blue-500 bg-gray-100"} ${
                          isToday(day) && "bg-black/90 text-white"
                        } ${
                          !isSameMonth(day, firstDayCurrentMonth) &&
                          "text-gray-600"
                        }`}
                      >
                        <span>{format(day, "d")}</span>

                        <div className="text-xs">
                          <CalendarEvents events={events} day={day} />
                        </div>
                      </div>
                    </HoverCardTrigger>
                    <HoverCardContent
                      side="right"
                      className="rounded-xl divide-y divide-gray-100"
                    >
                      {events
                        .filter(
                          (event) => event.date === format(day, "yyyy-MM-dd")
                        )
                        .map((event, idx) => {
                          return (
                            <div key={idx}>
                              <h3>{event.title}</h3>
                            </div>
                          );
                        })}
                    </HoverCardContent>
                  </HoverCard>
                ) : (
                  <div
                    onClick={() => selectDay(day)}
                    className={`${
                      colStartClasses[getDay(day)]
                    }  h-20 w-[100px] cursor-pointer flex flex-col px-4 py-4 font-gilroy-extrabold rounded-2xl  select-none hover:text-white ${
                      isSameMonth(day, firstDayCurrentMonth)
                        ? "text-gray-900"
                        : "text-gray-400 bg-gray-50"
                    } ${!isToday(day) && "hover:bg-blue-500 bg-gray-100"} ${
                      isToday(day) && "bg-black/90 text-white"
                    } ${
                      !isSameMonth(day, firstDayCurrentMonth) && "text-gray-600"
                    }`}
                  >
                    <span>{format(day, "d")}</span>

                    <div className="text-xs">
                      <CalendarEvents events={events} day={day} />
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div
                key={idx}
                className={`${
                  colStartClasses[getDay(day)]
                } text-gray-400 bg-gray-50 h-20 w-[100px] cursor-pointer flex flex-col px-4 py-4 font-gilroy-extrabold rounded-2xl  select-none hover:text-white ${
                  !isToday(day) && "hover:bg-blue-500 bg-gray-100"
                } ${isToday(day) && "bg-black/90 text-white"}`}
                onClick={() => {
                  const clickedMonth = getMonth(day);
                  const currentMonth = getMonth(date);
                  const clickedYear = getYear(day);
                  const currentYear = getYear(date);

                  if (
                    clickedYear > currentYear ||
                    (clickedYear === currentYear && clickedMonth > currentMonth)
                  ) {
                    onHandleNext();
                    console.log("next");
                  } else if (
                    clickedYear < currentYear ||
                    (clickedYear === currentYear && clickedMonth < currentMonth)
                  ) {
                    onHandlePrev();
                    console.log("prev");
                  }
                }}
              >
                <span>{format(day, "d")}</span>

                <div className="text-xs">
                  <CalendarEvents events={events} day={day} />
                </div>
              </div>
            )}
          </>
        );
      })}
    </div>
  );
};
