'use client';

import { useRef, useState, useEffect } from 'react';
import { useDesignState } from '../../hooks/useDesignState';

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
    !material || material === 'None' ? 'none' : `url(/materials/${material})`;

const ImageWithCircles: React.FC<{
    imageWidth: number;
    imageHeight: number;
}> = ({ imageWidth, imageHeight }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [draggingId, setDraggingId] = useState<string | null>(null);
    const [dragOffset, setDragOffset] = useState<{ x: number; y: number } | null>(null);
    const [prevMaterial, setPrevMaterial] = useState<string | null>(null);
    const [fadeIn, setFadeIn] = useState(false);

    const circles = useDesignState(s => s.circles);
    const selectedCircleId = useDesignState(s => s.selectedCircleId);
    const material = useDesignState(s => s.material);
    const handleCircleDrag = useDesignState(s => s.handleCircleDrag);
    const handleCircleSelect = useDesignState(s => s.handleCircleSelect);

    useEffect(() => {
        if (material && material !== prevMaterial) {
            setFadeIn(true);
            const timeout = setTimeout(() => {
                setPrevMaterial(material);
                setFadeIn(false);
            }, 400);
            return () => clearTimeout(timeout);
        }
    }, [material, prevMaterial]);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (!selectedCircleId) return;
        const selected = circles.find(c => c.id === selectedCircleId);
        if (!selected) return;
        let { x, y } = selected;
        if (e.key === 'ArrowLeft') x -= KEY_MOVE_AMOUNT;
        if (e.key === 'ArrowRight') x += KEY_MOVE_AMOUNT;
        if (e.key === 'ArrowUp') y -= KEY_MOVE_AMOUNT;
        if (e.key === 'ArrowDown') y += KEY_MOVE_AMOUNT;
        x = Math.max(CIRCLE_RADIUS, Math.min(imageWidth - CIRCLE_RADIUS, x));
        y = Math.max(CIRCLE_RADIUS, Math.min(imageHeight - CIRCLE_RADIUS, y));
        if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(e.key)) {
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
        <div className="relative" role="region" aria-label="Interaktive Designfläche">
            <div
                ref={containerRef}
                className="relative rounded-2xl overflow-hidden shadow-2xl select-none bg-gradient-to-br from-muted/50 to-muted/30 border border-border focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                style={{
                    width: imageWidth,
                    height: imageHeight,
                }}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                tabIndex={0}
                onKeyDown={handleKeyDown}
                role="application"
                aria-label="Designfläche mit interaktiven Kreisen"
                aria-describedby="canvas-instructions"
            >
                {prevMaterial && prevMaterial !== material && (
                    <div
                        className="absolute inset-0 w-full h-full z-0"
                        style={{
                            backgroundImage: getMaterialBg(prevMaterial),
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat',
                            opacity: fadeIn ? 1 : 0,
                            transition: 'opacity 0.4s',
                        }}
                    />
                )}

                {material && (
                    <div
                        className="absolute inset-0 w-full h-full z-0"
                        style={{
                            backgroundImage: getMaterialBg(material),
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat',
                            opacity: 1,
                            transition: 'opacity 0.4s',
                        }}
                    />
                )}

                {!material && (
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10" />
                )}

                {circles.map(circle => {
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
                            className={`absolute rounded-full border-4 transition-all duration-300 cursor-pointer z-20 select-none flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-1 ${
                                selectedCircleId === circle.id
                                    ? 'border-primary bg-primary/20 scale-110 shadow-lg'
                                    : 'border-card bg-card/80 hover:scale-105 shadow-md hover:shadow-lg'
                            }`}
                            style={{
                                left: circle.x - radius,
                                top: circle.y - radius,
                                width: radius * 2,
                                height: radius * 2,
                                userSelect: 'none',
                                pointerEvents: 'auto',
                                zIndex: 20,
                                overflow: 'hidden',
                                backgroundImage: matBg,
                                backgroundSize: `${imageWidth * scale}px ${imageHeight * scale}px`,
                                backgroundPosition: `${bgX}px ${bgY}px`,
                                backgroundRepeat: 'no-repeat',
                                transition:
                                    'background-image 0.4s, background-position 0.2s, transform 0.2s, box-shadow 0.2s',
                            }}
                            onMouseDown={e => handleMouseDown(e, circle)}
                            onTouchStart={e => handleTouchStart(e, circle)}
                            role="button"
                            tabIndex={0}
                            aria-label={`Kreis ${circle.id} an Position ${Math.round(
                                circle.x,
                            )}, ${Math.round(circle.y)}${
                                selectedCircleId === circle.id ? ', ausgewählt' : ''
                            }`}
                            aria-pressed={selectedCircleId === circle.id}
                        >
                            {selectedCircleId === circle.id && (
                                <div
                                    className="absolute inset-0 rounded-full border-2 border-primary/50 animate-pulse"
                                    aria-hidden="true"
                                />
                            )}
                        </div>
                    );
                })}
            </div>

            <div className="mt-2 text-center">
                <p className="text-xs text-muted-foreground" id="canvas-instructions">
                    Kreise per Drag & Drop oder mit den Pfeiltasten positionieren
                </p>
            </div>

            <div className="absolute -bottom-8 left-0 right-0 text-center">
                <span
                    className="text-xs text-muted-foreground bg-card/80 px-2 py-1 rounded-full border border-border"
                    role="status"
                    aria-live="polite"
                >
                    {circles.length} of {MAX_CIRCLES} circles
                </span>
            </div>
        </div>
    );
};

export default ImageWithCircles;
