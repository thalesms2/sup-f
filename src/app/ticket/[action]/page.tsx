"use client";

import * as React from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Check, ChevronsUpDown } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { cn } from "@/lib/utils";
import { getCookie } from "cookies-next";
import { ticketFormSchema } from "@/components/schema/ticket-create";
import { statuses } from "@/data/status";
import { toast } from "sonner";

export default function TicketCreate() {
  const form = useForm<z.infer<typeof ticketFormSchema>>({
    resolver: zodResolver(ticketFormSchema),
    defaultValues: {
      companyId: "",
      title: "",
      description: "",
      public: "true",
      status: "",
      actions: [],
      priority: "",
    },
  });

  const watchCompanyId = form.watch("companyId");
  const [openUser, setOpenUser] = React.useState(false);
  const [companys, setCompanys] = React.useState<
    Array<{
      id: number;
      name: string;
      User: Array<{ id: number; username: string }>;
    }>
  >([]);
  const [users, setUsers] = React.useState<
    Array<{ id: number; username: string }>
  >([]);
  const [openCompany, setOpenCompany] = React.useState(false);
  const [numActions, setNumActions] = React.useState(1);

  React.useEffect(() => {
    async function fetchCompanys() {
      let res = await fetch("http://localhost:3030/company/list-users");
      let data = await res.json();
      setCompanys(data);
    }
    fetchCompanys();
  }, []);

  React.useEffect(() => {
    async function updateUsers(companyId: string) {
      const arr = companys.find(
        (company) => company.id.toString() === companyId
      )?.User;
      if (arr != undefined) {
        setUsers(arr);
      }
    }
    updateUsers(watchCompanyId);
  }, [watchCompanyId, companys]);

  async function onSubmit(values: z.infer<typeof ticketFormSchema>) {
    const token = getCookie("token");
    const user = getCookie("user");
    values.actions = values.actions.filter(
      (action) => action.description != ""
    );
    let response = await fetch(`http://localhost:3030/ticket`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        companyId: Number(values.companyId),
        title: values.title,
        description: values.description,
        public: values.public === "true",
        status: values.status,
        priority: Number(values.priority),
        actions: values.actions,
        userCreatorId: Number(user),
      }),
    });
    let data = await response.json();
    toast(`Ticket ${data.id} criado com sucesso!`);
    form.reset();
    return data;
  }

  function showActions() {
    let actions: Array<{ description: string; clientUserId: string }> =
      form.getValues("actions");
    actions = actions.filter((action) => action.description);
    return (
      <div className="space-y-3 col-span-12">
        {actions.map((action, index) => {
          return (
            <Card key={index}>
              <CardHeader>
                <CardTitle>Ação {index + 1}</CardTitle>
              </CardHeader>
              <CardContent>{action.description}</CardContent>
            </Card>
          );
        })}
      </div>
    );
  }

  async function addAction() {
    setNumActions(numActions + 1);
    form.setValue(
      `actions.${numActions - 1}.description`,
      form.getValues(`actions.${numActions}.description`)
    );
    form.setValue(
      `actions.${numActions - 1}.clientUserId`,
      form.getValues(`actions.${numActions}.clientUserId`)
    );
    form.setValue(`actions.${numActions}.description`, "");
  }

  return (
    <div className="container h-full flex-1 flex-col space-y-3 md:flex px-24">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Novo ticket</h2>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="container grid grid-cols-12 gap-2">
            <FormField
              control={form.control}
              name="public"
              render={({ field }) => (
                <FormItem className="col-span-3">
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="true">Publico</SelectItem>
                      <SelectItem value="false">Interno</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="companyId"
              render={({ field }) => (
                <FormItem className="col-span-6 justify-self-center">
                  <Popover open={openCompany} onOpenChange={setOpenCompany}>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn(
                            "w-[300px] justify-between",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value
                            ? companys.find(
                                (company) =>
                                  company.id.toString() === field.value
                              )?.name
                            : "Selecione a empresa"}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-[300px] p-0">
                      <Command>
                        <CommandInput placeholder="Pesquise a empresa..." />
                        <CommandList>
                          <CommandEmpty>
                            Nenhuma empresa encontrada
                          </CommandEmpty>
                          <CommandGroup>
                            {companys.map((item) => (
                              <CommandItem
                                key={item.id}
                                value={item.id.toString()}
                                onSelect={(currentValue) => {
                                  form.setValue(
                                    "companyId",
                                    item.id.toString()
                                  );
                                  setOpenCompany(false);
                                }}
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    field.value === item.id.toString()
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                                {item.name}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem className="col-span-3">
                  <Select onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {statuses.map(
                        (status: {
                          value: string;
                          label: string;
                          icon: any;
                        }) => {
                          return (
                            <SelectItem key={status.value} value={status.value}>
                              {status.label}
                            </SelectItem>
                          );
                        }
                      )}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem className="col-span-9">
                  <FormControl>
                    <Input placeholder="Título" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="priority"
              render={({ field }) => (
                <FormItem className="col-span-3">
                  <Select onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Prioridade" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="0">Baixo</SelectItem>
                      <SelectItem value="1">Médio</SelectItem>
                      <SelectItem value="2">Alto</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="col-span-12">
                  <FormControl>
                    <Textarea
                      placeholder="Descrição do ticket"
                      className="min-h-[150px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Separator className="col-span-12" />
            <FormField
              control={form.control}
              name={`actions.${numActions}.clientUserId`}
              render={({ field }) => (
                <FormItem className="col-span-12">
                  <FormControl>
                    <Popover open={openUser} onOpenChange={setOpenUser}>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn(
                            "w-[300px] justify-between",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value
                            ? users.find(
                                (user) => user.id.toString() === field.value
                              )?.username
                            : "Selecione o usuário"}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-[300px] p-0">
                        <Command>
                          <CommandInput placeholder="Pesquise um usuário..." />
                          <CommandList>
                            <CommandEmpty>
                              Nenhum usuário encontrado
                            </CommandEmpty>
                            <CommandGroup>
                              {users.map((item) => (
                                <CommandItem
                                  key={item.id}
                                  value={item.id.toString()}
                                  onSelect={(currentValue) => {
                                    form.setValue(
                                      `actions.${numActions}.clientUserId`,
                                      item.id.toString()
                                    );
                                    setOpenUser(false);
                                  }}
                                >
                                  <Check
                                    className={cn(
                                      "mr-2 h-4 w-4",
                                      field.value === item.id.toString()
                                        ? "opacity-100"
                                        : "opacity-0"
                                    )}
                                  />
                                  {item.username}
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={`actions.${numActions}.description`}
              render={({ field }) => (
                <FormItem className="col-span-12">
                  <FormControl>
                    <Textarea
                      placeholder="Descrição da ação"
                      className="min-h-[150px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="self-end col-span-12 justify-self-end">
              <Button type="button" onClick={addAction}>
                Adicionar ação
              </Button>
            </div>
            <div className="self-end col-span-12 justify-self-end">
              <Button type="submit">Salvar ticket</Button>
            </div>
            <Separator className="col-span-12" />
            {showActions()}
          </div>
        </form>
      </Form>
    </div>
  );
}
