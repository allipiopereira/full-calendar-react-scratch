import { format } from "date-fns";
import { type Event } from "@/types/events";

interface CalendarEventsProps {
  events: Event[];
  day: Date;
}

const CalendarEvents = ({ events, day }: CalendarEventsProps) => {
  return (
    <>
      {events.filter((event) => event.date === format(day, "yyyy-MM-dd"))
        .length === 1 && (
        <p className="text-xs font-gilroy-semibold">
          {events.filter((event) => event.date === format(day, "yyyy-MM-dd"))
            .length + " evento"}
        </p>
      )}

      {events.filter((event) => event.date === format(day, "yyyy-MM-dd"))
        .length > 1 && (
        <p className="text-xs font-gilroy-semibold">
          {events.filter((event) => event.date === format(day, "yyyy-MM-dd"))
            .length + " eventos"}
        </p>
      )}

      {/* {events
                .filter((event) => event.date === format(day, "yyyy-MM-dd"))
                .map((event, idx) => {
                  return (
                    <div key={idx}>
                      <h3>{event.title}</h3>
                      <p>{event.date}</p>
                    </div>
                  );
                })} */}
    </>
  );
};

export default CalendarEvents;
