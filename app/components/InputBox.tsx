const InputBox = () => {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Circle Position</h2>
        <p>Adjust the position of the selected circle</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">X Position</label>
          <input
            className="w-full px-4 py-3 border rounded-xl"
            placeholder="X coordinate"
            type="number"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="y-position" className="text-sm font-medium">
            Y Position
          </label>
          <input
            type="number"
            className="w-full px-4 py-3 border rounded-xl"
            placeholder="Y coordinate"
          />
        </div>
      </div>

      <button className="w-full bg-secondary font-semibold py-3 px-6 rounded-xl shadow-md">
        <span className="flex items-center justify-center gap-2">
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
          Add New Circle
        </span>
      </button>

      <p className="text-sm text-center">
        Maximum number of circles reached (5)
      </p>
    </div>
  );
};

export default InputBox;
