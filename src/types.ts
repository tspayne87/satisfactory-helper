export type Machine = 'Smelter' | 'Foundry' | 'Constructor' | 'Assembler' | 'Refinery' | 'Manufactorer';
export type Part =
  'Iron Ore' | 'Iron Ingot' | 'Petroleum Coke' | 'Steel Ingot' | 'Steel Pipe' | 'Iron Plate' |
  'Limestone' | 'Rubber' | 'Concrete' | 'Encased Industrial Beam' | 'Reinforced Iron Plate' |
  'Modular Frame' | 'Heavy Modular Frame'

export interface Recipe {
  machine: Machine;
  recipeName: string;
  inputs: RecipeProcess[];
  outputs: RecipeProcess[];
}

export interface RecipeProcess {
  part: Part;
  amountPerMinute: number;
  level?: number;
}

export interface RecipeCounts {
  recipe: Recipe;
  amount: number;
}

export interface MachineCounts {
  machine: Machine;
  amount: number;
}