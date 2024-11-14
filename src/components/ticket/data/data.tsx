import {
  ArrowDownIcon,
  ArrowRightIcon,
  ArrowUpIcon,
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

export const priorities = [
  {
    label: "Baixa",
    value: 0,
    icon: ArrowDownIcon,
  },
  {
    label: "Média",
    value: 1,
    icon: ArrowRightIcon,
  },
  {
    label: "Alta",
    value: 2,
    icon: ArrowUpIcon,
  },
];
