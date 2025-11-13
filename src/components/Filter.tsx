import { useState } from "react";
import type { CompositeFilter, FilterProps } from "./FilterGroup.types";
import FilterGroup from "./FilterGroup";
import { FilterFieldsContainer } from "./FilterGroup.styles";

const Filter = ({ fields, value, onChange }: FilterProps) => {
  const filterValue: CompositeFilter = value ?? { logic: "and", filters: [] };

  const handleFilterChange = (newFilter: CompositeFilter): void => {
    if (onChange) {
      onChange({ value: newFilter });
    }
  };

  return (
    <FilterFieldsContainer>
      <FilterGroup
        filter={filterValue}
        fields={fields}
        onUpdate={handleFilterChange}
        level={0}
      />
    </FilterFieldsContainer>
  );
};

export default Filter;
