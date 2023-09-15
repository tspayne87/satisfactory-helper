import type { Part, Recipe, RecipeProcess, RecipeCounts, MachineCounts } from './types';
import { recipes } from './recipes';

export const findPartRecipe = (part: Part): Recipe | undefined => {
  const possibles = recipes.filter(x => x.outputs.findIndex(y => y.part === part) !== -1);
  /// TODO: Possibly be smart about picking the recipe based on if it is the best or not
  ///       right now just choose the first found
  return possibles.length > 0 ? possibles[0] : undefined;
};

export const findAllRecipes = (recipe: Recipe): Recipe[] => {
  const result: Recipe[] = [recipe];

  for (let i = 0; i < recipe.inputs.length; ++i) {
    const item = findPartRecipe(recipe.inputs[i].part);
    if (item !== undefined) {
      const recipes = findAllRecipes(item);
      for (let j = 0; j < recipes.length; ++j) {
        if (result.findIndex(x => x.recipeName === recipes[j].recipeName) === -1) {
          result.push(recipes[j]);
        }
      }
    }
  }
  return result;
};

export const calculateMachines = (recipe: Recipe, amount: number): RecipeCounts[] => {
  const counts: RecipeCounts[] = [];

  const recipes = findAllRecipes(recipe);
  const amounts = calculateRecipeAmounts(recipe, amount);

  for (let i = 0; i < recipes.length; ++i) {
    const recipe = recipes[i];
    const amount = amounts.find(x => x.part === recipe.outputs[0].part);
    if (amount !== undefined) {
      counts.push({ recipe, amount: Math.ceil(amount.amountPerMinute / recipe.outputs[0].amountPerMinute) });
    }
  }

  return counts;
};

export const calculateRecipeAmounts = (recipe: Recipe, amount: number, level: number = 0): RecipeProcess[] => {
  const { part: recipePart, amountPerMinute: recipeAmountPerMinute } = recipe.outputs[0];
  const result: RecipeProcess[] = [ { part: recipePart, amountPerMinute: (amount / recipeAmountPerMinute) * recipeAmountPerMinute, level }];

  for (let i = 0; i < recipe.inputs.length; ++i) {
    const { part, amountPerMinute } = recipe.inputs[i];
    const current = (amount / recipe.outputs[0].amountPerMinute) * amountPerMinute;
    result.push({ part, amountPerMinute: current, level });

    const item = findPartRecipe(part);
    if (item !== undefined) {
      const amounts = calculateRecipeAmounts(item, current, level + 1);
      for (let j = 0; j < amounts.length; ++j) {
        const { part: amountPart, amountPerMinute, level } = amounts[j];

        if (amountPart !== part) {
          const index = result.findIndex(x => x.part === amountPart);
          if (index === -1)
            result.push({ part: amountPart, amountPerMinute, level });
          else
            result[index].amountPerMinute += amountPerMinute;
        }
      }
    }
  }

  result.sort((a, b) => (a.level ?? 0) > (b.level ?? 0) ? 1 : -1);
  return result;
};

export const calculateInputs = (recipe: Recipe, amount: number): RecipeProcess[] => {
  const parts = calculateRecipeAmounts(recipe, amount);
  const recipes = findAllRecipes(recipe);
  return parts.filter(x => recipes.findIndex(y => y.outputs[0].part === x.part) === -1);
}

export const mergeMachines = (counts: RecipeCounts[]): MachineCounts[] => {
  const result: MachineCounts[] = [];
  for (let i = 0; i < counts.length; ++i) {
    const item = result.find(x => x.machine === counts[i].recipe.machine);
    if (item === undefined)
      result.push({ machine: counts[i].recipe.machine, amount: counts[i].amount });
    else
      item.amount += counts[i].amount;
  }
  return result;
}

export const formatNumber = (num: number, decimals: number = 2): string => {
  let offsetStr = '1';
  for (let i = 0; i < decimals; ++i)
    offsetStr += '0';

  const offset = parseInt(offsetStr);
  return (Math.round(num * offset) / offset).toFixed(decimals);
};