"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "sonner"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Separator } from "@/components/ui/separator"
import Image from 'next/image'
import { Headset, SlidersHorizontal, ChartColumn, Sparkles, SquareActivity } from 'lucide-react';

export default function Home() {
  function reqAcess() {
    toast("Não implementado ainda, só realizar o cadastro utilizando uma empresa")
  }
  return (
    <div className="container relative space-y-5">
      <section className="mx-auto flex flex-col items-start gap-2 px-4 py-8 md:py-12 md:pb-8 lg:py-12 lg:pb-10">
        <div className="flex items-center space-x-3">
          <h1 className="text-3xl font-bold leading-tight tracking-tighter md:text-4xl lg:leading-[1.1]">
            Support Facility 
          </h1>
          <Headset width={40} height={40}/>
        </div>
        <p className="max-w-2xl text-lg font-light text-foreground">
          O software de atendimento ao cliente que aumenta a produtividade e facilita 
          a vida de ambos os técnicos quanto os clientes.
          Projeto feito para criar agilidade no atendimento de software houses.
        </p>
        <div className="flex w-full items-center justify-start gap-2">
          <Button variant="default" onClick={reqAcess}>Solicitar acesso</Button>
          <Link href="https://github.com/thalesms2" passHref={true} target="_blank">
            <Button variant="ghost">GitHub</Button>
          </Link>
        </div>
      </section>
      <Separator />
      <section className="flex justify-center px-4 py-8 md:py-12 md:pb-8 lg:py-12 lg:pb-10">
        <Tabs defaultValue="organize" className="w-[100%] flex flex-col items-center">
          <TabsList className="flex flex-row justify-around w-[70%]">
            <TabsTrigger value="organize">Organização do atendimento</TabsTrigger>
            <TabsTrigger value="produtivity">Mais produtividade</TabsTrigger>
            <TabsTrigger value="management">Gestão simples</TabsTrigger>
            <TabsTrigger value="fast">Rápido</TabsTrigger>
          </TabsList>
          <TabsContent value="organize">
            <div className="flex space-x-4">
              <p className="w-[300px]">
                Fácil acesso para clientes e técnicos, criado pensando na usabilidade de todos
                que irão utilizá-lo
              </p>
              <Image
                src="/1.jpg"
                width={300}
                height={300}
                alt="Image"
              />
            </div>
          </TabsContent>
          <TabsContent value="produtivity">
            <div className="flex space-x-4">
              <p className="w-[300px]">
                Feito para técnicos e simples para os clientes
              </p>
              <Image
                src="/2.jpg"
                width={300}
                height={300}
                alt="Image"
              />
            </div>
          </TabsContent>
          <TabsContent value="management">
            <div className="flex space-x-4">
              <p className="w-[300px]">
                Acesso fácil a dados e relatórios para controle dos atendimentos, problemas em andamento e gestão de técnicos
              </p>
              <Image
                src="/3.jpg"
                width={300}
                height={300}
                alt="Image"
              />
            </div>
          </TabsContent>
          <TabsContent value="fast">
            <div className="flex space-x-4">
              <p className="w-[300px]">
                Tempo é uma das métricas que mais impacta a satisfação dos clientes com problemas.
              </p>
              <Image
                src="/4.jpg"
                width={300}
                height={300}
                alt="Image"
              />
            </div>
          </TabsContent>
        </Tabs>
      </section>
      <section className="flex justify-center gap-x-5">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">Personalizavel <SlidersHorizontal width={20} height={20} /></CardTitle>
            <CardDescription>Totalmente configuravel</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Card Content</p>
          </CardContent>
          <CardFooter>
            <p>Card Footer</p>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">Card Title <ChartColumn width={20} height={20} /></CardTitle>
            <CardDescription>Card Description</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Card Content</p>
          </CardContent>
          <CardFooter>
            <p>Card Footer</p>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">Card Title <Sparkles width={20} height={20} /></CardTitle>
            <CardDescription>Card Description</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Card Content</p>
          </CardContent>
          <CardFooter>
            <p>Card Footer</p>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">Card Title <SquareActivity width={20} height={20} /></CardTitle>
            <CardDescription>Card Description</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Card Content</p>
          </CardContent>
          <CardFooter>
            <p>Card Footer</p>
          </CardFooter>
        </Card>
      </section>
      <section>
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>Is it accessible?</AccordionTrigger>
            <AccordionContent>
              Yes. It adheres to the WAI-ARIA design pattern.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Is it accessible?</AccordionTrigger>
            <AccordionContent>
              Yes. It adheres to the WAI-ARIA design pattern.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>Is it accessible?</AccordionTrigger>
            <AccordionContent>
              Yes. It adheres to the WAI-ARIA design pattern.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>
    </div>
  )
}