// Cooking unit conversion using standard metric measuring spoons and cups:
// 1 teaspoon = 5 ml, 1 tablespoon = 15 ml, 1 cup = 240 ml.
// (So 1 tbsp = 3 tsp and 1 cup = 16 tbsp = 48 tsp.)

export type Unit = 'cup' | 'tbsp' | 'tsp' | 'ml';

export const UNITS: { id: Unit; label: string; plural: string; ml: number }[] = [
  { id: 'cup', label: 'cup', plural: 'cups', ml: 240 },
  { id: 'tbsp', label: 'tablespoon', plural: 'tablespoons', ml: 15 },
  { id: 'tsp', label: 'teaspoon', plural: 'teaspoons', ml: 5 },
  { id: 'ml', label: 'millilitre', plural: 'millilitres', ml: 1 },
];

export function mlPer(unit: Unit): number {
  return UNITS.find((u) => u.id === unit)!.ml;
}

export function convert(amount: number, from: Unit, to: Unit): number {
  return (amount * mlPer(from)) / mlPer(to);
}

// Tidy display: up to 2 decimals, no trailing zeros.
export function fmt(n: number): string {
  return String(Math.round(n * 100) / 100);
}

export function unitName(unit: Unit, amount: number): string {
  const u = UNITS.find((x) => x.id === unit)!;
  return amount === 1 ? u.label : u.plural;
}

// Scale a recipe: new amount = amount × (wanted servings ÷ original servings)
export function scaleRecipe(amount: number, original: number, wanted: number): number {
  return (amount * wanted) / original;
}
