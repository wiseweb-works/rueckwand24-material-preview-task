import { create } from "zustand";
import { Circle } from "../components/canvas/ImageWithCircles";
import {
  IMAGE_WIDTH,
  IMAGE_HEIGHT,
  MAGNIFIER_SCALE,
  CIRCLE_RADIUS,
  MAX_CIRCLES,
} from "../data/constants";
import {
  clampCirclePosition,
  findNonCollidingPosition,
  circlesCollide,
} from "../utils/circleUtils";

interface DesignState {
  circles: Circle[];
  selectedCircleId: string;
  material: string;
  toast: boolean;
  setMaterial: (m: string) => void;
  handleAddCircle: () => void;
  handleChangeX: (x: number) => void;
  handleChangeY: (y: number) => void;
  handleCircleSelect: (id: string) => void;
  handleCircleDrag: (id: string, x: number, y: number) => void;
  handleSubmit: () => void;
}

export const useDesignState = create<DesignState>((set, get) => ({
  circles: [{ id: "c1", x: 60, y: 80 }],
  selectedCircleId: "c1",
  material: "None",
  toast: false,
  setMaterial: (m) => set({ material: m }),
  handleAddCircle: () => {
    const { circles } = get();
    if (circles.length >= MAX_CIRCLES) return;
    const newPosition = findNonCollidingPosition(
      circles,
      IMAGE_WIDTH,
      IMAGE_HEIGHT,
      CIRCLE_RADIUS,
      MAGNIFIER_SCALE
    );
    if (!newPosition) return;
    const newId = `c${Date.now()}`;
    set((state) => ({
      circles: [
        ...state.circles,
        { id: newId, x: newPosition.x, y: newPosition.y },
      ],
      selectedCircleId: newId,
    }));
  },
  handleChangeX: (x) => {
    const { selectedCircleId } = get();
    set((state) => ({
      circles: state.circles.map((c) => {
        if (c.id === selectedCircleId) {
          const { x: clampedX } = clampCirclePosition(
            x,
            c.y,
            IMAGE_WIDTH,
            IMAGE_HEIGHT,
            CIRCLE_RADIUS,
            MAGNIFIER_SCALE
          );
          return { ...c, x: clampedX };
        }
        return c;
      }),
    }));
  },
  handleChangeY: (y) => {
    const { selectedCircleId } = get();
    set((state) => ({
      circles: state.circles.map((c) => {
        if (c.id === selectedCircleId) {
          const { y: clampedY } = clampCirclePosition(
            c.x,
            y,
            IMAGE_WIDTH,
            IMAGE_HEIGHT,
            CIRCLE_RADIUS,
            MAGNIFIER_SCALE
          );
          return { ...c, y: clampedY };
        }
        return c;
      }),
    }));
  },
  handleCircleSelect: (id) => set({ selectedCircleId: id }),
  handleCircleDrag: (id, x, y) => {
    set((state) => {
      const { x: clampedX, y: clampedY } = clampCirclePosition(
        x,
        y,
        IMAGE_WIDTH,
        IMAGE_HEIGHT,
        CIRCLE_RADIUS,
        MAGNIFIER_SCALE
      );
      const others = state.circles.filter((c) => c.id !== id);
      const collides = others.some((c) =>
        circlesCollide(
          { x: clampedX, y: clampedY },
          { x: c.x, y: c.y },
          CIRCLE_RADIUS
        )
      );
      if (collides) return {};
      return {
        circles: state.circles.map((c) =>
          c.id === id ? { ...c, x: clampedX, y: clampedY } : c
        ),
      };
    });
  },
  handleSubmit: () => {
    const { circles, material } = get();
    const output = circles.map((c) => ({
      id: c.id,
      x: c.x,
      y: c.y,
      xPercent: Math.round((c.x / IMAGE_WIDTH) * 100),
      yPercent: Math.round((c.y / IMAGE_HEIGHT) * 100),
    }));
    console.log({
      circles: output,
      material,
    });
    set({ toast: true });
    setTimeout(() => set({ toast: false }), 2500);
  },
}));
 