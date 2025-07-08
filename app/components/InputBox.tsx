const InputBox = () => {
  return (
    <div>
      <div className="text-center">
        <h2>Circle</h2>
        <p>Lorem ipsum dolor sit amet.</p>
      </div>

      <div>
        <div>
          <label>X Position</label>
          <input type="number" placeholder="X" />
        </div>

        <div>
          <label>Y Position</label>
          <input type="number" placeholder="Y" />
        </div>
      </div>

      <button>
        <span>
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

      <p>Maximum circles reached (X?)</p>
    </div>
  );
};

export default InputBox;
