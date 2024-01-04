import { ReactNode } from "react";
import LogoFCRS from "../LogoFCRS";
import { CalendarBtnNavigation } from "./CalendarBtnNavigation";
import { ArrowLeftCircle, ArrowRightCircle } from "lucide-react";
import { useCalendar } from "./CalendarRoot";

interface CalendarToolbarProps {
  children: ReactNode;
}

export const CalendarToolbar = ({ children }: CalendarToolbarProps) => {
  const { onHandleNext, onHandlePrev, onHandleToday } = useCalendar();

  return (
    <div className="flex justify-between items-center px-4 py-2">
      <div className="flex items-center space-x-4 divide-x divide-black">
        <LogoFCRS width={38} height={38} />

        <div className="flex flex-col pl-4">
          <div className="text-xl font-bold">Janeiro</div>
          <div className="text-xs text-gray-600">04, Qui, 2024</div>
        </div>
      </div>

      <div className="flex flex-col items-center">
        <div className="flex space-x-2">
          <CalendarBtnNavigation
            onClick={() => onHandlePrev("day")}
            icon={() => <ArrowLeftCircle className="w-4 h-4" />}
          />

          <CalendarBtnNavigation onClick={() => onHandleToday()} text="Hoje" />

          <CalendarBtnNavigation
            onClick={() => onHandleNext("day")}
            icon={() => <ArrowRightCircle className="w-4 h-4" />}
          />
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
};
