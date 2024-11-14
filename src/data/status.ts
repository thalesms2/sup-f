import {
  CheckCircledIcon,
  CrossCircledIcon,
  StopwatchIcon,
} from "@radix-ui/react-icons";

export const statuses = [
  {
    value: "progress",
    label: "Em andamento",
    icon: StopwatchIcon,
  },
  {
    value: "done",
    label: "Concluido",
    icon: CheckCircledIcon,
  },
  {
    value: "canceled",
    label: "Cancelado",
    icon: CrossCircledIcon,
  },
];
