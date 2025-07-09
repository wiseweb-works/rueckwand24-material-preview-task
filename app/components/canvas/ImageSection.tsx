import ImageWithCircles from './ImageWithCircles';

interface ImageSectionProps {
    imageWidth: number;
    imageHeight: number;
}

const ImageSection: React.FC<ImageSectionProps> = ({ imageWidth, imageHeight }) => {
    return (
        <div className="w-full flex justify-center lg:justify-start">
            <div className="flex-shrink-0 w-[500px]">
                <div className="lg:sticky lg:top-4 lg:self-start">
                    <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-3xl blur-3xl" />
                        <div className="relative bg-card/80 backdrop-blur-sm border border-border rounded-3xl p-6 shadow-2xl flex justify-center">
                            <ImageWithCircles imageWidth={imageWidth} imageHeight={imageHeight} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ImageSection;
