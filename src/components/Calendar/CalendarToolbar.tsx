import { ReactNode, useEffect, useState } from "react";
import LogoFCRS from "../LogoFCRS";
import { CalendarBtnNavigation } from "./CalendarBtnNavigation";
import { ArrowLeftCircle, ArrowRightCircle } from "lucide-react";
import { useCalendar } from "./CalendarRoot";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface CalendarToolbarProps {
  children: ReactNode;
}

export const CalendarToolbar = ({ children }: CalendarToolbarProps) => {
  const { onHandleNext, onHandlePrev, onHandleToday, date } = useCalendar();

  const [monthName, setMonthName] = useState<string>("");

  useEffect(() => {
    setMonthName(format(date, "MMMM", { locale: ptBR }));
  }, [date]);

  return (
    <div className="flex justify-between items-center px-4 py-2">
      <div className="flex items-center space-x-4 divide-x divide-black">
        <LogoFCRS width={38} height={38} />

        <div className="flex flex-col pl-4">
          <div className="text-xl font-bold">
            {monthName.charAt(0).toUpperCase() + monthName.slice(1)}
          </div>
          <div className="flex items-center">
            <span className="text-xs text-gray-600">{format(date, "dd")},</span>

            <span className="text-xs ml-1">
              {format(date, "EEEE", { locale: ptBR })
                .slice(0, 3)
                .toLowerCase()
                .replace(/./, (v) => v.toUpperCase())}
              ,
            </span>

            <span className="text-xs text-gray-600 ml-1">
              {format(date, "yyyy")}
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-end">
        <div className="flex space-x-2">
          <CalendarBtnNavigation
            onClick={() => onHandlePrev()}
            icon={() => <ArrowLeftCircle className="w-4 h-4" />}
          />

          <CalendarBtnNavigation onClick={() => onHandleToday()} text="Hoje" />

          <CalendarBtnNavigation
            onClick={() => onHandleNext()}
            icon={() => <ArrowRightCircle className="w-4 h-4" />}
          />
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
};
