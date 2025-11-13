import { FilterGroupContainer, FilterGroupItem } from "./FilterGroup.styles";
import type {
  CompositeFilter,
  FilterExpression,
  FilterGroupProps,
} from "./FilterGroup.types";
import FilterMenu from "./FilterMenu";
import FilterRow from "./FilterRow";
import { isFilterExpression } from "./util";

const FilterGroup = ({
  filter,
  fields,
  onUpdate,
  onRemove,
  level = 0,
}: FilterGroupProps) => {
  const removeItem = (index: number): void => {
    const newFilters = filter.filters.filter((_, i) => i !== index);
    onUpdate({ ...filter, filters: newFilters });
  };

  const updateItem = (
    index: number,
    updates: FilterExpression | CompositeFilter
  ): void => {
    const newFilters = [...filter.filters];
    newFilters[index] = updates;
    onUpdate({ ...filter, filters: newFilters });
  };

  return (
    <FilterGroupContainer>
      <FilterMenu
        filter={filter}
        fields={fields}
        onUpdate={onUpdate}
        onRemove={onRemove}
        level={level}
      />

      {filter.filters.map((item, index) => (
        <FilterGroupItem key={index}>
          {isFilterExpression(item) ? (
            <FilterRow
              filter={item}
              fields={fields}
              onUpdate={(updates) => updateItem(index, { ...item, ...updates })}
              onRemove={() => removeItem(index)}
            />
          ) : (
            <FilterGroup
              filter={item}
              fields={fields}
              onUpdate={(updates) => updateItem(index, updates)}
              onRemove={() => removeItem(index)}
              level={level + 1}
            />
          )}
        </FilterGroupItem>
      ))}
    </FilterGroupContainer>
  );
};

export { FilterGroup };
export default FilterGroup;
