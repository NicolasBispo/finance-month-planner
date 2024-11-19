export const sumEntitiesValues = (entities: unknown & { value: number }[]) => {
  return entities
    .map((entity) => entity.value)
    .reduce((prev, next) => (prev += next), 0);
};

export function calculatePercentage(value: number, total: number) {
  if (total === 0) return 0;
  return (value / total) * 100;
}