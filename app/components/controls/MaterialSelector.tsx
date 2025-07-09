import { useDesignState } from '../../hooks/useDesignState';
import Image from 'next/image';

export interface MaterialOption {
    id: string;
    name: string;
    image: string;
    badge: string;
    badgeColor: string;
    description: string;
}

interface MaterialSelectorProps {
    materials: MaterialOption[];
}

const badgeColorMap: Record<string, string> = {
    'bg-green-500': '#10b981',
    'bg-blue-500': '#3b82f6',
    'bg-purple-500': '#8b5cf6',
};

const MaterialSelector: React.FC<MaterialSelectorProps> = ({ materials }) => {
    const selectedMaterial = useDesignState(s => s.material);
    const setMaterial = useDesignState(s => s.setMaterial);

    return (
        <div className="p-3 space-y-3" role="region" aria-label="Materialauswahl">
            <div className="text-center">
                <h2
                    className="text-lg font-semibold text-foreground mb-1"
                    id="material-selection-title"
                >
                    Materialauswahl
                </h2>
                <p className="text-xs text-muted-foreground">
                    Wählen Sie das gewünschte Material für das Design
                </p>
            </div>

            <div className="space-y-2" role="radiogroup" aria-labelledby="material-selection-title">
                {materials.map(material => {
                    const isSelected = selectedMaterial === material.id;
                    const badgeBg = badgeColorMap[material.badgeColor] || '#3b82f6';

                    return (
                        <button
                            key={material.id}
                            onClick={() => setMaterial(material.id)}
                            className={`w-full flex items-center relative overflow-hidden group focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 transition-all duration-300 rounded-xl border-2 ${
                                isSelected
                                    ? 'bg-primary text-primary-foreground border-primary shadow-lg min-h-[64px] py-[10px] px-3'
                                    : 'bg-card text-foreground border-border hover:bg-accent hover:border-primary/50 shadow-md hover:shadow-lg min-h-[40px] py-2 px-3'
                            }`}
                            role="radio"
                            aria-checked={isSelected}
                            aria-label={`Material ${material.name} auswählen${
                                material.description ? `: ${material.description}` : ''
                            }`}
                        >
                            <div
                                className="flex-shrink-0 w-8 h-8 rounded-lg bg-muted border border-border overflow-hidden mr-2"
                                aria-hidden="true"
                            >
                                {material.image ? (
                                    <Image
                                        src={material.image}
                                        alt={material.name}
                                        width={32}
                                        height={32}
                                        className="w-full h-full object-cover rounded-lg"
                                    />
                                ) : material.id === 'None' ? (
                                    <div className="w-full h-full bg-white" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center">
                                        <span className="text-xs text-muted-foreground">
                                            Kein Bild
                                        </span>
                                    </div>
                                )}
                            </div>

                            <div className="flex-1 text-left">
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="font-semibold text-base">{material.name}</span>
                                    {material.badge && (
                                        <span
                                            className="px-1.5 py-0.5 rounded-full text-xs font-semibold text-white shadow-sm"
                                            style={{ backgroundColor: badgeBg }}
                                            aria-label={`${material.badge} Abzeichen`}
                                        >
                                            {material.badge}
                                        </span>
                                    )}
                                </div>

                                <div
                                    className={`transition-all duration-300 overflow-hidden ${
                                        isSelected ? 'max-h-12 opacity-100' : 'max-h-0 opacity-0'
                                    }`}
                                >
                                    {material.description && (
                                        <p className="text-xs opacity-80 leading-relaxed">
                                            {material.description}
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div
                                className={`flex-shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                                    isSelected
                                        ? 'border-primary-foreground bg-primary-foreground'
                                        : 'border-muted-foreground'
                                }`}
                            >
                                {isSelected && (
                                    <svg
                                        className="w-3.5 h-3.5 text-primary"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                )}
                            </div>
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export default MaterialSelector;
