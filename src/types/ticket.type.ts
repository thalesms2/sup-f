import { IUser } from "@/types/auth.type";

interface ITicket {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  title: string;
  description: string;
  actions: Array<IAction>;
  userCreatorId: number;
  companyId: number;
  status: string;
  priority: number;
  public: boolean;
}

interface IAction {
  ticketId: number;
  description: string;
  clientUserId: number;
  clientUser: IUser;
  userCreatorId: number;
  userCreator: IUser;
  isActive: boolean;
}

interface ITicketDTO {
  title: string;
  description: string;
  companyId: string;
  public: string;
  status: string;
  actions: Array<{ description: string }>;
  priority: string;
}

export type { ITicket, IAction, ITicketDTO };
