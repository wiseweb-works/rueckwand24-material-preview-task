import { MATERIAL_OPTIONS as materials } from "../data/materials";

const MaterialSelector = () => {
  return (
    <div
      className="p-6 space-y-6"
      role="region"
      aria-label="Material selection"
    >
      <div className="text-center">
        <h2
          className="text-2xl font-bold text-foreground mb-2"
          id="material-selection-title"
        >
          Material Selection
        </h2>
        <p className="text-muted-foreground">
          Choose your preferred material for the design
        </p>
      </div>

      <div
        className="space-y-3"
        role="radiogroup"
        aria-labelledby="material-selection-title"
      >
        {materials.map((material) => (
          <button
            key={material.id}
            className="w-full flex items-center relative overflow-hidden group focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 transition-all duration-300 rounded-2xl border-2 bg-card text-foreground border-border hover:bg-accent hover:border-primary/50 shadow-md hover:shadow-lg"
          >
            <div
              className="flex-shrink-0 w-12 h-12 rounded-xl bg-muted border border-border overflow-hidden mr-4"
              aria-hidden="true"
            >
              {material.image ? (
                <img
                  src={material.image}
                  alt=""
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-xs text-muted-foreground">None</span>
                </div>
              )}
            </div>

            <div className="flex-1 text-left">
              <div className="flex items-center gap-3 mb-1">
                <span className="font-semibold text-lg">{material.name}</span>
                {material.badge && (
                  <span className="px-2 py-1 rounded-full text-xs font-semibold text-white shadow-sm">
                    {material.badge}
                  </span>
                )}
              </div>

              <div className="transition-all duration-300 overflow-hidden max-h-0 opacity-0">
                {material.description && (
                  <p className="text-sm opacity-80 leading-relaxed">
                    {material.description}
                  </p>
                )}
              </div>
            </div>

            <div className="flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200 border-muted-foreground"></div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default MaterialSelector;
