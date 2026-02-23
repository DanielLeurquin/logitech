import { useState } from "react";

function Slider({ min = 0, max = 100, step = 1, onChange }) {
  const [val, setVal] = useState(min);

  const getPercent = (value) => ((value - min) / (max - min)) * 100;

  const handleChange = (e) => {
    const value = Number(e.target.value);
    setVal(value);
    onChange?.(value);
  };

  return (
    <div className="w-full">
      <div className="relative h-6 flex items-center">
        <div className="absolute w-full h-1.5 bg-gray-200 rounded-full" />
        <div
          className="absolute h-1.5 bg-blue-500 rounded-full"
          style={{ width: `${getPercent(val)}%` }}
        />
        <input
          type="range"
          min={min} max={max} step={step} value={val}
          onChange={handleChange}
          className="absolute w-full appearance-none bg-transparent
            [&::-webkit-slider-thumb]:appearance-none
            [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5
            [&::-webkit-slider-thumb]:rounded-full
            [&::-webkit-slider-thumb]:bg-white
            [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-blue-500
            [&::-webkit-slider-thumb]:cursor-pointer
            [&::-webkit-slider-thumb]:shadow"
        />
      </div>
      <div className="flex justify-between mt-2 text-sm text-gray-600">
        <span>{min}</span>
        <span>{max}</span>
      </div>
    </div>
  );
}

export default function App() {
  const [volume, setVolume] = useState(0);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow p-8 w-80">
        <h2 className="text-lg font-semibold text-gray-800 mb-1">Volume</h2>
        <p className="text-sm text-gray-400 mb-6">Adjust the level</p>
        <Slider min={0} max={100} step={1} onChange={setVolume} />
        <p className="mt-6 text-center text-sm text-gray-500">
          Level: <span className="font-medium text-gray-800">{volume}</span>
        </p>
      </div>
    </div>
  );
}
