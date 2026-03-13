"use client";

import { useEffect, useState } from "react";

type CarouselItem = {
  src: string;
  alt: string;
  title: string;
  description: string;
};

type PortalCarouselProps = {
  items: CarouselItem[];
  className?: string;
  showOverlayContent?: boolean;
};

export function PortalCarousel({
  items,
  className,
  showOverlayContent = true
}: PortalCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % items.length);
    }, 4600);

    return () => window.clearInterval(interval);
  }, [items.length]);

  return (
    <div className={["portal-card", "portal-carousel", className].filter(Boolean).join(" ")}>
      <div className="portal-carousel__frame">
        {items.map((item, index) => (
          <div
            key={item.src}
            className={`portal-carousel__slide ${index === activeIndex ? "is-active" : ""}`}
          >
            <img className="portal-carousel__image" src={item.src} alt={item.alt} />
            {showOverlayContent ? <div className="portal-carousel__overlay" /> : null}
          </div>
        ))}

        {showOverlayContent ? (
          <div className="portal-carousel__content">
            <span className="portal-eyebrow" style={{ color: "rgba(255, 255, 255, 0.84)" }}>
              Ecosistema CORESA
            </span>
            <strong>{items[activeIndex].title}</strong>
            <p>{items[activeIndex].description}</p>
            <div className="portal-carousel__dots" aria-hidden="true">
              {items.map((item, index) => (
                <span key={item.src} className={index === activeIndex ? "is-active" : ""} />
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}