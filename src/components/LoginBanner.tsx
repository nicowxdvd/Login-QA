import { ArrowLeft, Aperture } from "lucide-react";
import Link from "next/link";
import CarouselIndicators from "./CarouselIndicators";

export default function LoginBanner() {
  return (
    <div className="relative hidden h-full flex-col justify-between overflow-hidden bg-neutral-900 p-10 text-white md:flex">
      <div
        className="absolute inset-0 bg-gradient-to-br from-neutral-800 via-neutral-900 to-black"
        aria-hidden="true"
      />
      <div
        className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-violet-700/20 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Aperture className="h-7 w-7 text-violet-400" aria-hidden="true" />
          <span className="text-lg font-semibold tracking-tight">Lumina</span>
        </div>
        <Link
          href="/"
          className="flex items-center gap-1.5 text-sm text-neutral-300 transition-all duration-200 hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Back to website
        </Link>
      </div>

      <div className="relative animate-fade-slide space-y-4">
        <h1 className="max-w-md text-3xl font-semibold leading-tight tracking-tight">
          Capturing Moments, Creating Memories
        </h1>
        <p className="max-w-sm text-sm text-neutral-400">
          A collection of textures, tones, and stories worth remembering.
        </p>
        <CarouselIndicators total={3} activeIndex={0} />
      </div>
    </div>
  );
}
