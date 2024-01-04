import { getDay, isSameMonth, isToday, format, parse } from "date-fns";
import { useCalendar } from "./CalendarRoot";

export const CalendarMonth = () => {
  const { daysInMonth, date } = useCalendar();

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
          <div
            key={idx}
            className={`${
              colStartClasses[getDay(day)]
            }  h-20 w-[100px] cursor-pointer flex flex-col px-4 py-4 font-gilroy-extrabold rounded-2xl  select-none hover:text-white ${
              isSameMonth(day, firstDayCurrentMonth)
                ? "text-gray-900"
                : "text-gray-400 bg-gray-50"
            } ${!isToday(day) && "hover:bg-blue-500 bg-gray-100"} ${
              isToday(day) && "bg-black/90 text-white"
            } ${!isSameMonth(day, firstDayCurrentMonth) && "text-gray-600"}`}
          >
            <span>{format(day, "d")}</span>

            <div>
              <span className="text-xs font-gilroy-medium">1 Evento</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};
