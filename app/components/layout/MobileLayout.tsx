import ImageWithCircles from '../canvas/ImageWithCircles';
import InputBox from '../controls/InputBox';
import MaterialSelector, { MaterialOption } from '../controls/MaterialSelector';
import { useDesignState } from '../../hooks/useDesignState';

interface MobileLayoutProps {
    imageWidth: number;
    imageHeight: number;
    maxCircles: number;
    materialOptions: MaterialOption[];
}

const MobileLayout: React.FC<MobileLayoutProps> = ({
    imageWidth,
    imageHeight,
    maxCircles,
    materialOptions,
}) => {
    const circles = useDesignState(s => s.circles);
    const handleSubmit = useDesignState(s => s.handleSubmit);

    return (
        <div className="lg:hidden space-y-6">
            <div className="w-full flex justify-center">
                <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-3xl blur-3xl" />
                    <div className="relative bg-card/80 backdrop-blur-sm border border-border rounded-3xl p-6 shadow-2xl">
                        <ImageWithCircles imageWidth={imageWidth} imageHeight={imageHeight} />
                    </div>
                </div>
            </div>

            <div className="space-y-6">
                <div className="bg-card/80 backdrop-blur-sm border border-border rounded-3xl p-6 shadow-xl">
                    <InputBox disabled={circles.length >= maxCircles} />
                </div>

                <div className="bg-card/80 backdrop-blur-sm border border-border rounded-3xl shadow-xl overflow-hidden">
                    <MaterialSelector materials={materialOptions} />
                </div>

                <button
                    onClick={handleSubmit}
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-4 px-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                    aria-label="Das aktuelle Design mit ausgewählten Materialien und Kreispositionen absenden"
                >
                    <span className="flex items-center justify-center gap-2">
                        <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 13l4 4L19 7"
                            />
                        </svg>
                        Design absenden
                    </span>
                </button>
            </div>
        </div>
    );
};

export default MobileLayout;
