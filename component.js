import { useState, useCallback } from "react";

function DualRangeSlider({ min = 0, max = 100, step = 1, onChange }) {
  const [minVal, setMinVal] = useState(min);
  const [maxVal, setMaxVal] = useState(max);

  const getPercent = useCallback(
    (value) => ((value - min) / (max - min)) * 100,
    [min, max]
  );

  const handleMin = (e) => {
    const value = Math.min(Number(e.target.value), maxVal - step);
    setMinVal(value);
    onChange?.({ min: value, max: maxVal });
  };

  const handleMax = (e) => {
    const value = Math.max(Number(e.target.value), minVal + step);
    setMaxVal(value);
    onChange?.({ min: minVal, max: value });
  };

  return (
    <div className="w-full">
      <div className="relative h-6 flex items-center">
        {/* Track background */}
        <div className="absolute w-full h-1.5 bg-gray-200 rounded-full" />

        {/* Active range */}
        <div
          className="absolute h-1.5 bg-blue-500 rounded-full"
          style={{
            left: `${getPercent(minVal)}%`,
            width: `${getPercent(maxVal) - getPercent(minVal)}%`,
          }}
        />

        {/* Min thumb */}
        <input
          type="range"
          min={min} max={max} step={step} value={minVal}
          onChange={handleMin}
          className="absolute w-full appearance-none bg-transparent pointer-events-none
            [&::-webkit-slider-thumb]:pointer-events-auto
            [&::-webkit-slider-thumb]:appearance-none
            [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5
            [&::-webkit-slider-thumb]:rounded-full
            [&::-webkit-slider-thumb]:bg-white
            [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-blue-500
            [&::-webkit-slider-thumb]:cursor-pointer
            [&::-webkit-slider-thumb]:shadow"
          style={{ zIndex: minVal >= max - step ? 5 : 3 }}
        />

        {/* Max thumb */}
        <input
          type="range"
          min={min} max={max} step={step} value={maxVal}
          onChange={handleMax}
          className="absolute w-full appearance-none bg-transparent pointer-events-none
            [&::-webkit-slider-thumb]:pointer-events-auto
            [&::-webkit-slider-thumb]:appearance-none
            [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5
            [&::-webkit-slider-thumb]:rounded-full
            [&::-webkit-slider-thumb]:bg-white
            [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-blue-500
            [&::-webkit-slider-thumb]:cursor-pointer
            [&::-webkit-slider-thumb]:shadow"
          style={{ zIndex: 4 }}
        />
      </div>

      {/* Value labels */}
      <div className="flex justify-between mt-2 text-sm text-gray-600">
        <span>${minVal}</span>
        <span>${maxVal}</span>
      </div>
    </div>
  );
}

export default function App() {
  const [range, setRange] = useState({ min: 0, max: 200 });

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow p-8 w-80">
        <h2 className="text-lg font-semibold text-gray-800 mb-1">Price Range</h2>
        <p className="text-sm text-gray-400 mb-6">Filter by budget</p>

        <DualRangeSlider min={0} max={200} step={5} onChange={setRange} />

        <button className="mt-6 w-full bg-blue-500 text-white rounded-xl py-2.5 text-sm font-medium hover:bg-blue-600 transition-colors">
          Show results for ${range.min} – ${range.max}
        </button>
      </div>
    </div>
  );
}
