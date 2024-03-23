import { Button } from '@/components/ui/button';
import Image from 'next/image';

export default function Home() {
  return (
    <main className="flex flex-col h-screen w-full  ">
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]"></div>

      <div className="flex  h-full">
        <div className="bg-white h-full w-72  border-r  px-3 py-2 ">
          <h1>PIXINHO</h1>
          <Button>Click me</Button>
        </div>
        <div className="flex items-center justify-center w-full">Side2222</div>
      </div>
    </main>
  );
}
