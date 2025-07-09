"use client";

import React, { useRef, useState, useEffect } from "react";
import { useDesignState } from "../../hooks/useDesignState";

export interface Circle {
  id: string;
  x: number;
  y: number;
}

const CIRCLE_RADIUS = 28;
const KEY_MOVE_AMOUNT = 5;
const MAGNIFIER_SCALE = 2.2;
const MAX_CIRCLES = 5;

const getMaterialBg = (material?: string | null) =>
  material ? `url(/materials/${material})` : "none";

const ImageWithCircles: React.FC<{
  imageWidth: number;
  imageHeight: number;
}> = ({ imageWidth, imageHeight }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState<{ x: number; y: number } | null>(
    null
  );
  const [prevMaterial, setPrevMaterial] = useState<string | null>(null);
  const [fadeIn, setFadeIn] = useState(false);

  const circles = useDesignState((s) => s.circles);
  const selectedCircleId = useDesignState((s) => s.selectedCircleId);
  const material = useDesignState((s) => s.material);
  const handleCircleDrag = useDesignState((s) => s.handleCircleDrag);
  const handleCircleSelect = useDesignState((s) => s.handleCircleSelect);

  useEffect(() => {
    if (material && material !== prevMaterial) {
      setFadeIn(true);
      const timeout = setTimeout(() => {
        setPrevMaterial(material);
        setFadeIn(false);
      }, 400);
      return () => clearTimeout(timeout);
    }
  }, [material]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (!selectedCircleId) return;
    const selected = circles.find((c) => c.id === selectedCircleId);
    if (!selected) return;
    let { x, y } = selected;
    if (e.key === "ArrowLeft") x -= KEY_MOVE_AMOUNT;
    if (e.key === "ArrowRight") x += KEY_MOVE_AMOUNT;
    if (e.key === "ArrowUp") y -= KEY_MOVE_AMOUNT;
    if (e.key === "ArrowDown") y += KEY_MOVE_AMOUNT;
    x = Math.max(CIRCLE_RADIUS, Math.min(imageWidth - CIRCLE_RADIUS, x));
    y = Math.max(CIRCLE_RADIUS, Math.min(imageHeight - CIRCLE_RADIUS, y));
    if (["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(e.key)) {
      e.preventDefault();
      handleCircleDrag(selectedCircleId, x, y);
    }
  };

  const handleMouseDown = (e: React.MouseEvent, circle: Circle) => {
    e.preventDefault();
    handleCircleSelect(circle.id);
    setDraggingId(circle.id);
    const rect = containerRef.current?.getBoundingClientRect();
    if (rect) {
      setDragOffset({
        x: e.clientX - rect.left - circle.x,
        y: e.clientY - rect.top - circle.y,
      });
    }
    containerRef.current?.focus();
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!draggingId || !dragOffset) return;
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    let x = e.clientX - rect.left - dragOffset.x;
    let y = e.clientY - rect.top - dragOffset.y;
    x = Math.max(CIRCLE_RADIUS, Math.min(imageWidth - CIRCLE_RADIUS, x));
    y = Math.max(CIRCLE_RADIUS, Math.min(imageHeight - CIRCLE_RADIUS, y));
    handleCircleDrag(draggingId, x, y);
  };

  const handleMouseUp = () => {
    setDraggingId(null);
    setDragOffset(null);
  };

  const handleTouchStart = (e: React.TouchEvent, circle: Circle) => {
    handleCircleSelect(circle.id);
    setDraggingId(circle.id);
    const rect = containerRef.current?.getBoundingClientRect();
    if (rect && e.touches[0]) {
      setDragOffset({
        x: e.touches[0].clientX - rect.left - circle.x,
        y: e.touches[0].clientY - rect.top - circle.y,
      });
    }
    containerRef.current?.focus();
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!draggingId || !dragOffset) return;
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect || !e.touches[0]) return;
    let x = e.touches[0].clientX - rect.left - dragOffset.x;
    let y = e.touches[0].clientY - rect.top - dragOffset.y;
    x = Math.max(CIRCLE_RADIUS, Math.min(imageWidth - CIRCLE_RADIUS, x));
    y = Math.max(CIRCLE_RADIUS, Math.min(imageHeight - CIRCLE_RADIUS, y));
    handleCircleDrag(draggingId, x, y);
    e.preventDefault();
  };

  const handleTouchEnd = () => {
    setDraggingId(null);
    setDragOffset(null);
  };

  return (
    <div className="relative">
      <div
        ref={containerRef}
        className="relative rounded-2xl overflow-hidden shadow-2xl select-none bg-gradient-to-br border focus:outline-none focus:ring-2 focus:ring-offset-2"
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onKeyDown={handleKeyDown}
      >
        {prevMaterial && prevMaterial !== material && (
          <div className="absolute inset-0 w-full h-full z-0" />
        )}

        {material && <div className="absolute inset-0 w-full h-full z-0" />}

        {!material && <div className="absolute inset-0 bg-gradient-to-br" />}

        {circles.map((circle) => {
          const scale = MAGNIFIER_SCALE;
          const radius = CIRCLE_RADIUS;
          const maxBgX = 0;
          const minBgX = -(imageWidth * scale - radius * 2);
          const maxBgY = 0;
          const minBgY = -(imageHeight * scale - radius * 2);
          let bgX = -(circle.x * scale - radius);
          let bgY = -(circle.y * scale - radius);
          bgX = Math.max(minBgX, Math.min(maxBgX, bgX));
          bgY = Math.max(minBgY, Math.min(maxBgY, bgY));
          const matBg = getMaterialBg(material);

          return (
            <div
              key={circle.id}
              className="absolute rounded-full border-4 transition-all duration-300 cursor-pointer z-20 select-none flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-1"
              onMouseDown={(e) => handleMouseDown(e, circle)}
              onTouchStart={(e) => handleTouchStart(e, circle)}
            >
              {selectedCircleId === circle.id && (
                <div className="absolute inset-0 rounded-full border-2 animate-pulse" />
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-2 text-center">
        <p className="text-xs">
          Kreise per Drag & Drop oder mit den Pfeiltasten positionieren
        </p>
      </div>

      <div className="absolute -bottom-8 left-0 right-0 text-center">
        <span className="text-xs bg-card/80 px-2 py-1 rounded-full border">
          {circles.length} of {MAX_CIRCLES} circles
        </span>
      </div>
    </div>
  );
};

export default ImageWithCircles;
