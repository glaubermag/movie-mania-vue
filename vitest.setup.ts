import { createCanvas } from 'canvas';

// Mock global do getContext para HTMLCanvasElement (necessário para axe-core)
if (typeof window !== 'undefined' && window.HTMLCanvasElement) {
  window.HTMLCanvasElement.prototype.getContext = function getContext() {
    return createCanvas(1, 1).getContext('2d');
  };
} 