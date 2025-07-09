'use client';

import { useDesignState } from './hooks/useDesignState';
import {
    Header,
    ThemeSwitcher,
    BackgroundPattern,
    ImageSection,
    ControlsSection,
    MobileLayout,
    Toast,
    AxeTest,
} from './components/';
import { MATERIAL_OPTIONS } from './data/materials';
import { IMAGE_WIDTH, IMAGE_HEIGHT, MAX_CIRCLES } from './data/constants';

export default function HomePage() {
    const toast = useDesignState(s => s.toast);

    return (
        <main id="main-content" className="min-h-screen bg-background">
            <BackgroundPattern />
            <ThemeSwitcher />
            <AxeTest />
            <Header />
            <div className="relative z-10 px-4 sm:px-6 lg:px-8 pb-8">
                <div className="w-full max-w-7xl mx-auto">
                    <div className="hidden lg:flex gap-8 items-start h-full">
                        <div className="flex-shrink-0 w-[500px]">
                            <ImageSection imageWidth={IMAGE_WIDTH} imageHeight={IMAGE_HEIGHT} />
                        </div>
                        <div className="flex-1">
                            <ControlsSection
                                maxCircles={MAX_CIRCLES}
                                materialOptions={MATERIAL_OPTIONS}
                            />
                        </div>
                    </div>
                    <MobileLayout
                        imageWidth={IMAGE_WIDTH}
                        imageHeight={IMAGE_HEIGHT}
                        maxCircles={MAX_CIRCLES}
                        materialOptions={MATERIAL_OPTIONS}
                    />
                </div>
            </div>
            <Toast show={toast} message="Daten wurden erfolgreich gesendet!" />
        </main>
    );
}
