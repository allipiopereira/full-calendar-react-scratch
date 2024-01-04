import { ElementType } from "react";

interface CalendarBtnNavigationProps {
  onClick: () => void;
  icon?: ElementType;
  text?: string;
}

export const CalendarBtnNavigation = ({
  onClick,
  icon: Icon,
  text,
}: CalendarBtnNavigationProps) => {
  return (
    <button onClick={onClick}>
      {Icon && <Icon />}

      {text && <span>{text}</span>}
    </button>
  );
};
