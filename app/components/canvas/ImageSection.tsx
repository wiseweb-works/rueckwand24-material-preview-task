import ImageWithCircles from "./ImageWithCircles";

interface ImageSectionProps {
  imageWidth: number;
  imageHeight: number;
}

const ImageSection: React.FC<ImageSectionProps> = ({
  imageWidth,
  imageHeight,
}) => {
  return (
    <div className="w-full flex justify-start">
      <div className="flex-shrink-0 w-[500px]">
        <div className="sticky top-4 self-start">
          <div className="relative">
            <div className="absolute rounded-3xl" />
            <div className="relative border rounded-3xl p-6 shadow-2xl flex justify-center">
              <ImageWithCircles
                imageWidth={imageWidth}
                imageHeight={imageHeight}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageSection;
