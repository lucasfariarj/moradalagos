"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { imageUrl } from "@/lib/properties";
import { ArrowRightIcon, CloseIcon } from "../icons";

interface PropertyGalleryProps {
  title: string;
  images: string[];
}

export function PropertyGallery({ title, images }: PropertyGalleryProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [main, ...rest] = images;

  return (
    <>
      <div className="grid gap-3 sm:grid-cols-3 sm:grid-rows-2 md:gap-4">
        <GalleryButton
          src={main}
          alt={`${title}, foto 1 de ${images.length}`}
          onOpen={() => setOpenIndex(0)}
          sizes="(min-width: 640px) 66vw, 100vw"
          className="aspect-[4/3] sm:col-span-2 sm:row-span-2 sm:aspect-auto"
          priority
        />
        {rest.map((src, i) => (
          <GalleryButton
            key={src}
            src={src}
            alt={`${title}, foto ${i + 2} de ${images.length}`}
            onOpen={() => setOpenIndex(i + 1)}
            sizes="(min-width: 640px) 33vw, 100vw"
            className="hidden aspect-[4/3] sm:block"
          />
        ))}
      </div>

      <button
        type="button"
        onClick={() => setOpenIndex(0)}
        className="mt-3 text-sm font-semibold text-ocean underline-offset-4 hover:underline sm:hidden"
      >
        Ver todas as {images.length} fotos
      </button>

      {openIndex !== null && (
        <Lightbox title={title} images={images} index={openIndex} onIndexChange={setOpenIndex} />
      )}
    </>
  );
}

function GalleryButton({
  src,
  alt,
  onOpen,
  sizes,
  className,
  priority,
}: {
  src: string;
  alt: string;
  onOpen: () => void;
  sizes: string;
  className: string;
  priority?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label={`Ampliar: ${alt}`}
      className={`group relative overflow-hidden rounded-2xl bg-water ${className}`}
    >
      <Image
        src={imageUrl(src, 1400)}
        alt={alt}
        fill
        priority={priority}
        sizes={sizes}
        className="object-cover transition-transform duration-500 group-hover:scale-105"
      />
    </button>
  );
}

function Lightbox({
  title,
  images,
  index,
  onIndexChange,
}: {
  title: string;
  images: string[];
  index: number;
  onIndexChange: (index: number | null) => void;
}) {
  const close = useCallback(() => onIndexChange(null), [onIndexChange]);
  const step = useCallback(
    (delta: number) => onIndexChange((index + delta + images.length) % images.length),
    [index, images.length, onIndexChange],
  );

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
      if (event.key === "ArrowRight") step(1);
      if (event.key === "ArrowLeft") step(-1);
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [close, step]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Fotos: ${title}`}
      className="fixed inset-0 z-[60] flex flex-col bg-deep/95 backdrop-blur"
    >
      <div className="flex items-center justify-between px-6 py-5 text-white">
        <p className="text-sm text-white/70">
          {index + 1} / {images.length}
        </p>
        <button
          type="button"
          onClick={close}
          aria-label="Fechar galeria"
          autoFocus
          className="grid size-10 place-items-center rounded-full hover:bg-white/10"
        >
          <CloseIcon className="size-6" />
        </button>
      </div>

      <div className="relative flex-1">
        <Image
          src={imageUrl(images[index], 2000)}
          alt={`${title}, foto ${index + 1} de ${images.length}`}
          fill
          sizes="100vw"
          className="object-contain px-4 md:px-24"
        />
        <button
          type="button"
          onClick={() => step(-1)}
          aria-label="Foto anterior"
          className="absolute top-1/2 left-4 grid size-12 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-petroleum hover:bg-white md:left-8"
        >
          <ArrowRightIcon className="size-5 rotate-180" />
        </button>
        <button
          type="button"
          onClick={() => step(1)}
          aria-label="Próxima foto"
          className="absolute top-1/2 right-4 grid size-12 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-petroleum hover:bg-white md:right-8"
        >
          <ArrowRightIcon className="size-5" />
        </button>
      </div>
      <div className="h-8" />
    </div>
  );
}
