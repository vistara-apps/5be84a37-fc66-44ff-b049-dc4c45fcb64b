'use client';

import { useState } from 'react';
import { Settings } from 'lucide-react';
import { DEFAULT_SLIPPAGE, MAX_SLIPPAGE } from '@/lib/constants';

interface SlippageSliderProps {
  slippage: number;
  onSlippageChange: (slippage: number) => void;
}

export function SlippageSlider({ slippage, onSlippageChange }: SlippageSliderProps) {
  const [showSettings, setShowSettings] = useState(false);
  const [customSlippage, setCustomSlippage] = useState(slippage.toString());

  const presetSlippages = [0.1, 0.5, 1.0];

  const handlePresetClick = (preset: number) => {
    onSlippageChange(preset);
    setCustomSlippage(preset.toString());
  };

  const handleCustomSlippageChange = (value: string) => {
    setCustomSlippage(value);
    const numValue = parseFloat(value);
    if (!isNaN(numValue) && numValue >= 0 && numValue <= MAX_SLIPPAGE) {
      onSlippageChange(numValue);
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setShowSettings(!showSettings)}
        className="flex items-center gap-2 text-sm text-text-secondary hover:text-text-primary transition-colors duration-200"
      >
        <Settings className="w-4 h-4" />
        Slippage: {slippage}%
      </button>

      {showSettings && (
        <div className="absolute top-full right-0 mt-2 bg-surface border border-text-secondary/20 rounded-lg p-4 shadow-card z-10 min-w-64">
          <h4 className="font-medium mb-3">Slippage Tolerance</h4>
          
          <div className="flex gap-2 mb-3">
            {presetSlippages.map((preset) => (
              <button
                key={preset}
                onClick={() => handlePresetClick(preset)}
                className={`px-3 py-1 rounded text-sm transition-colors duration-200 ${
                  slippage === preset
                    ? 'bg-accent text-background'
                    : 'bg-background text-text-primary hover:bg-background/80'
                }`}
              >
                {preset}%
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <input
              type="number"
              value={customSlippage}
              onChange={(e) => handleCustomSlippageChange(e.target.value)}
              placeholder="Custom"
              min="0"
              max={MAX_SLIPPAGE}
              step="0.1"
              className="input-field flex-1 text-sm"
            />
            <span className="text-sm text-text-secondary">%</span>
          </div>

          <div className="mt-3 text-xs text-text-secondary">
            <p>Higher slippage tolerance = higher chance of success</p>
            <p>Lower slippage tolerance = better price protection</p>
          </div>

          <button
            onClick={() => setShowSettings(false)}
            className="w-full mt-3 btn-secondary text-sm py-2"
          >
            Done
          </button>
        </div>
      )}
    </div>
  );
}
