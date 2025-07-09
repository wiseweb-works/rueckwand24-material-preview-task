"use client";

import { Header, ImageSection, ControlsSection } from "./components/";
import { MATERIAL_OPTIONS } from "./data/materials";
import { IMAGE_WIDTH, IMAGE_HEIGHT, MAX_CIRCLES } from "./data/constants";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <div className="relative z-10 px-4 pb-8">
        <div className="w-full max-w-7xl mx-auto">
          <div className="flex gap-8 items-start h-full">
            <div className="flex-shrink-0 w-[500px]">
              <ImageSection
                imageWidth={IMAGE_WIDTH}
                imageHeight={IMAGE_HEIGHT}
              />
            </div>

            <div className="flex-1">
              <ControlsSection
                maxCircles={MAX_CIRCLES}
                materialOptions={MATERIAL_OPTIONS}
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
