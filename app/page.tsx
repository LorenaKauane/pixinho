'use client';
import { Button } from '@/components/ui/button';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { QrCodePix } from 'qrcode-pix';
import { useEffect, useRef, useState } from 'react';
import domtoimage from 'dom-to-image';
import { GradientPicker } from '@/components/GradientPicker';

const formSchema = z.object({
  key: z.string().min(2, {
    message: 'Chave obrigatoria',
  }),
  name: z.string().min(2, {
    message: 'Nome obrigatorio',
  }),
  city: z.string().min(2, {
    message: 'Cidade',
  }),
  transactionId: z.string().min(2, {
    message: 'Identificador obrigatoria',
  }),
  message: z.string(),
  value: z.number(),
});

const formatter = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
});

export default function Home() {
  const [background, setBackground] = useState<string>(
    'linear-gradient(to top left,#000000,#434343)'
  );
  const [color, setColor] = useState<string>(
    'linear-gradient(to top left,#d5d4d0,#d5d4d0,#eeeeec)'
  );
  const [qrCode, setQrCode] = useState<string>('');
  const [codigo, setCodigo] = useState<string>('');
  const divRef = useRef(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      key: 'e99b457e-08a8-42dc-ab84-5ee3dffd45a3',
      name: 'Lorena',
      city: 'Londrina',
      transactionId: 'lorenapixinho',
      message: 'Pixinho da amizadeee',
      value: 10,
    },
  });

  async function generatePix(values: z.infer<typeof formSchema>) {
    const qrcodePix = QrCodePix({
      version: '01',
      ...values,
    });

    const raw = qrcodePix.payload();
    const base64 = await qrcodePix.base64();
    setQrCode(base64);
    setCodigo(raw);
  }

  useEffect(() => {
    generatePix(form.getValues());
  }, []);

  function onSubmit(values: z.infer<typeof formSchema>) {
    generatePix(values);
  }

  function download() {
    if (!divRef.current) return;

    domtoimage.toPng(divRef.current).then((url: string) => {
      const link = document.createElement('a');
      link.download = 'pixinhog.png';
      link.href = url;
      link.click();
    });
  }

  return (
    <main className="flex flex-col h-screen w-full  ">
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]"></div>
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel
          defaultSize={50}
          className="bg-white p-5 h-full overflow-auto"
        >
          <h1 className="text-2xl font-bold ">PIXINHO </h1>
          <a
            className="text-violet-600 "
            href="https://www.youtube.com/@lorenaporphirio"
            target="_blank"
          >
            {' '}
            Lorena Porphirio
          </a>
          <div>
            <div className="flex flex-col gap-2 mt-5">
              Background
              <GradientPicker
                background={background}
                setBackground={setBackground}
              />
            </div>
            <div className="flex flex-col gap-2 mb-2">
              Color text
              <GradientPicker background={color} setBackground={setColor} />
            </div>
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <FormField
                control={form.control}
                name="key"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Chave pix</FormLabel>
                    <FormControl>
                      <Input placeholder="Sua chave pix" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Seu nome" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cidade</FormLabel>
                    <FormControl>
                      <Input placeholder="Cidade" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="transactionId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Identificador</FormLabel>
                    <FormControl>
                      <Input placeholder="Identificador" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mensagem</FormLabel>
                    <FormControl>
                      <Input placeholder="Mensagem" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="value"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Valor</FormLabel>
                    <FormControl>
                      <Input placeholder="Valor" {...field} type="number" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Gerar</Button>
            </form>
          </Form>
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel className="flex flex-col items-center justify-center w-full h-full">
          <div
            ref={divRef}
            style={{ background }}
            className="bg-white w-96 items-center justify-center flex flex-col p-3 rounded-lg"
          >
            <div className="flex flex-col items-center p-3">
              <div
                className="text-2xl font-bold !bg-clip-text text-transparent !bg-cover !bg-center transition-all"
                style={{ background: color }}
              >
                {form.watch('name')}
              </div>
              <div
                style={{ background: color }}
                className="opacity-50 !bg-clip-text text-transparent !bg-cover !bg-center transition-all"
              >
                {form.watch('city')}
              </div>
            </div>
            <div
              style={{ background: color }}
              className="w-96 text-center my-3  !bg-clip-text text-transparent !bg-cover !bg-center transition-all"
            >
              {form.watch('message')}
            </div>
            <div>
              <img src={qrCode} alt="QRCODE" />
            </div>
            <div
              style={{ background: color }}
              className="text-center text-2xl font-bold mt-3  !bg-clip-text text-transparent !bg-cover !bg-center transition-all"
            >
              {formatter.format(form.watch('value'))}
            </div>
          </div>
          <div className="gap-2 flex mt-3">
            <Button onClick={download}>Donwload</Button>
            <Button
              onClick={() => {
                navigator.clipboard.writeText(codigo);
              }}
            >
              Copiar codigo
            </Button>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </main>
  );
}
