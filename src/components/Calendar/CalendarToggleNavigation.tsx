import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useCalendar } from "./CalendarRoot";

export const CalendarToggleNavigation = () => {
  const { setTypeNavigation, typeNavigation } = useCalendar();

  const onChangeTypeNavigation = (uniq: "month" | "week" | "day") => {
    setTypeNavigation(uniq);
  };
  return (
    <ToggleGroup
      type="single"
      value={typeNavigation}
      defaultValue="month"
      onValueChange={(value: "month" | "week" | "day") =>
        onChangeTypeNavigation(value)
      }
    >
      <ToggleGroupItem value="day">Dia</ToggleGroupItem>
      <ToggleGroupItem value="week">Semana</ToggleGroupItem>
      <ToggleGroupItem value="month">Mês</ToggleGroupItem>
    </ToggleGroup>
  );
};
