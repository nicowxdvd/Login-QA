export interface CarouselIndicatorsProps {
  /** Total number of slides. */
  total: number;
  /** Index of the currently active slide. */
  activeIndex: number;
}

export default function CarouselIndicators({
  total,
  activeIndex,
}: CarouselIndicatorsProps) {
  return (
    <div className="flex items-center gap-2" role="tablist" aria-label="Carousel slides">
      {Array.from({ length: total }).map((_, index) => {
        const isActive = index === activeIndex;
        return (
          <span
            key={index}
            role="tab"
            aria-selected={isActive}
            className={`h-1.5 rounded-full transition-all duration-200 ${
              isActive ? "w-6 bg-white" : "w-1.5 bg-white/30"
            }`}
          />
        );
      })}
    </div>
  );
}
