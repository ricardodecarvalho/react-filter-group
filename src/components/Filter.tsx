import { useState } from "react";
import type { CompositeFilter, FilterProps } from "./FilterGroup.types";
import FilterGroup from "./FilterGroup";
import { FilterFieldsContainer } from "./FilterGroup.styles";

const Filter = ({ fields, value, onChange }: FilterProps) => {
  const initialFilter: CompositeFilter = value ?? { logic: "and", filters: [] };
  const [filterState, setFilterState] =
    useState<CompositeFilter>(initialFilter);

  const handleFilterChange = (newFilter: CompositeFilter): void => {
    setFilterState(newFilter);
    if (onChange) {
      onChange({ value: newFilter });
    }
  };

  return (
    <FilterFieldsContainer>
      <FilterGroup
        filter={filterState}
        fields={fields}
        onUpdate={handleFilterChange}
        level={0}
      />
    </FilterFieldsContainer>
  );
};

export default Filter;
