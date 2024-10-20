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
import { Headset, SlidersHorizontal, ChartColumn, Sparkles, SquareActivity, Instagram, Linkedin, Twitter, Github } from 'lucide-react';

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
      <section className="flex justify-center px-4">
        <Tabs defaultValue="organize" className="w-[100%] flex flex-col items-center">
          <TabsList className="flex flex-row justify-around w-[70%]">
            <TabsTrigger value="organize">Organização do atendimento</TabsTrigger>
            <TabsTrigger value="produtivity">Mais produtividade</TabsTrigger>
            <TabsTrigger value="management">Gestão simples</TabsTrigger>
            <TabsTrigger value="fast">Rápido</TabsTrigger>
          </TabsList>
          <TabsContent value="organize">
            <h3 className="text-center mb-2 font-bold">
              Organização do atendimento
            </h3>
            <div className="flex space-x-4">
              <p className="w-[300px]">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed id justo sapien. Pellentesque quis sapien rutrum, 
                ullamcorper lectus sit amet, consectetur tortor. Integer tempor orci velit, nec dignissim nisi accumsan in. In hac habitasse platea dictumst. 
                Duis erat velit, ultricies suscipit elit ac, luctus tempus sem. Nulla ut ullamcorper dolor. Pellentesque habitant morbi tristique senectus et 
                netus et malesuada fames ac turpis egestas.
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
            <h3 className="text-center mb-2 font-bold">
              Mais produtividade
            </h3>
            <div className="flex space-x-4">
              <p className="w-[300px]">
              Nullam pretium dui vitae nunc sodales, ut mollis dui rhoncus. Nam non mauris et tellus auctor congue. 
              Phasellus dignissim nulla sit amet velit tincidunt, ut finibus sapien egestas. Vivamus quis efficitur orci. 
              Cras sed ullamcorper tellus. In malesuada diam dui, sed ornare nunc euismod a. Nullam pharetra lectus sit amet efficitur volutpat. 
              Maecenas est nibh, bibendum eget sodales ut, pharetra et ex.
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
            <h3 className="text-center mb-2 font-bold">
              Gestão simples
            </h3>
            <div className="flex space-x-4">
              <p className="w-[300px]">
              Sed vel ullamcorper libero. Donec auctor turpis lacinia, dignissim metus mattis, semper ex. 
              Duis vitae tellus eget nisi facilisis mattis. Vivamus at nibh justo. Nunc aliquet congue nisi, 
              in vehicula nibh tincidunt ut. Etiam at orci pharetra, dignissim magna vel, ullamcorper mauris. Quisque ultricies ut ipsum nec aliquam. 
              Donec facilisis est quis purus facilisis rutrum. Quisque enim lorem, volutpat et ultricies quis, tristique non arcu.
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
            <h3 className="text-center mb-2 font-bold">
              Rápido
            </h3>
            <div className="flex space-x-4">
              <p className="w-[300px]">
              Etiam consectetur vestibulum erat, et tempor ipsum accumsan eu. Nulla facilisi. Integer et elit volutpat, iaculis lacus eu, 
              hendrerit orci. Nullam efficitur ex id suscipit placerat. Vivamus mattis ac mauris ac pulvinar. In eget elit a orci posuere molestie non a purus. 
              Phasellus eu sodales ipsum. Donec pretium euismod nulla, vel volutpat turpis finibus vitae. In hac habitasse platea dictumst. 
              Praesent eu maximus ante, vel laoreet augue.
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
      <Separator />
      <section className="flex justify-center gap-x-5">
        <Card className="w-[250px]">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">Personalizavel <SlidersHorizontal width={20} height={20} /></CardTitle>
            <CardDescription>Totalmente configuravel</CardDescription>
          </CardHeader>
          <CardContent>
            <p>
              Nullam pretium dui vitae nunc sodales, ut mollis dui rhoncus. Nam non mauris et tellus auctor congue. 
              Phasellus dignissim nulla sit amet velit tincidunt, ut finibus sapien egestas.
            </p>
          </CardContent>
        </Card>
        <Card className="w-[250px]">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Estatísticas <ChartColumn width={20} height={20} />
            </CardTitle>
            <CardDescription>Gerenciamento facilitado</CardDescription>
          </CardHeader>
          <CardContent>
            <p>
              Nullam pretium dui vitae nunc sodales, ut mollis dui rhoncus. Nam non mauris et tellus auctor congue. 
              Phasellus dignissim nulla sit amet velit tincidunt, ut finibus sapien egestas.
            </p>
          </CardContent>
        </Card>
        <Card className="w-[250px]">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Card Title <Sparkles width={20} height={20} />
            </CardTitle>
            <CardDescription>Card Description</CardDescription>
          </CardHeader>
          <CardContent>
            <p>
              Nullam pretium dui vitae nunc sodales, ut mollis dui rhoncus. Nam non mauris et tellus auctor congue. 
              Phasellus dignissim nulla sit amet velit tincidunt, ut finibus sapien egestas.
            </p>
          </CardContent>
        </Card>
        <Card className="w-[250px]">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">Card Title <SquareActivity width={20} height={20} /></CardTitle>
            <CardDescription>Card Description</CardDescription>
          </CardHeader>
          <CardContent>
            <p>
              Nullam pretium dui vitae nunc sodales, ut mollis dui rhoncus. Nam non mauris et tellus auctor congue. 
              Phasellus dignissim nulla sit amet velit tincidunt, ut finibus sapien egestas.
            </p>
          </CardContent>
        </Card>
      </section>
      <section>
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>Técnologias utilizadas</AccordionTrigger>
            <AccordionContent>
              Front-end: Next.js 
              Back-end: Nest.js
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
      <section>
        <div className="flex justify-between">
          <p>thalesms2 | Dev Full-stack</p>
          <div className="flex space-x-2">
            <Link href="https://github.com/thalesms2" passHref={true} target="_blank">
              <Instagram />
            </Link>
            <Link href="https://github.com/thalesms2" passHref={true} target="_blank">
              <Linkedin />
            </Link>
            <Link href="https://github.com/thalesms2" passHref={true} target="_blank">
              <Twitter />
            </Link>
            <Link href="https://github.com/thalesms2" passHref={true} target="_blank">
              <Github />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}