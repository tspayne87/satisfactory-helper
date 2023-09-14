import type { Recipe } from './types';

export const recipes: Recipe[] = [
  {
    machine: 'Smelter',
    recipeName: 'Iron Ingot',
    inputs: [{ part: 'Iron Ore', amountPerMinute: 30 }],
    outputs: [{ part: 'Iron Ingot', amountPerMinute: 30 }]
  },
  {
    machine: 'Foundry',
    recipeName: 'Coke Steel Ingot',
    inputs: [{ part: 'Iron Ore', amountPerMinute: 75 }, { part: 'Petroleum Coke', amountPerMinute: 75 }],
    outputs: [{ part: 'Steel Ingot', amountPerMinute: 100 }]
  },
  {
    machine: 'Constructor',
    recipeName: 'Steel Pipe',
    inputs: [{ part: 'Steel Ingot', amountPerMinute: 30 }],
    outputs: [{ part: 'Steel Pipe', amountPerMinute: 20 }]
  },
  {
    machine: 'Constructor',
    recipeName: 'Iron Plate',
    inputs: [{ part: 'Iron Ingot', amountPerMinute: 30 }],
    outputs: [{ part: 'Iron Plate', amountPerMinute: 20 }]
  },
  {
    machine: 'Assembler',
    recipeName: 'Rubber Concrete',
    inputs: [{ part: 'Limestone', amountPerMinute: 50 }, { part: 'Rubber', amountPerMinute: 10 }],
    outputs: [{ part: 'Concrete', amountPerMinute: 45 }]
  },
  {
    machine: 'Assembler',
    recipeName: 'Encased Industrial Pipe',
    inputs: [{ part: 'Steel Pipe', amountPerMinute: 28 }, { part: 'Concrete', amountPerMinute: 20 }],
    outputs: [{ part: 'Encased Industrial Beam', amountPerMinute: 4 }]
  },
  {
    machine: 'Assembler',
    recipeName: 'Adhered Iron Plate',
    inputs: [{ part: 'Iron Plate', amountPerMinute: 11.25 }, { part: 'Rubber', amountPerMinute: 3.75 }],
    outputs: [{ part: 'Reinforced Iron Plate', amountPerMinute: 3.75 }]
  },
  {
    machine: 'Assembler',
    recipeName: 'Steeled Frame',
    inputs: [{ part: 'Reinforced Iron Plate', amountPerMinute: 2 }, { part: 'Steel Pipe', amountPerMinute: 10 }],
    outputs: [{ part: 'Modular Frame', amountPerMinute: 3 }]
  },
  {
    machine: 'Manufactorer',
    recipeName: 'Heavy Encased Frame',
    inputs: [
      { part: 'Modular Frame', amountPerMinute: 7.5 },
      { part: 'Encased Industrial Beam', amountPerMinute: 9.375 },
      { part: 'Steel Pipe', amountPerMinute: 33.75 },
      { part: 'Concrete', amountPerMinute: 20.625}
    ],
    outputs: [{ part: 'Heavy Modular Frame', amountPerMinute: 3 }]
  }
];