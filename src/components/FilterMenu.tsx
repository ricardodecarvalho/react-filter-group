import { FilterMenuContainer } from "./FilterGroup.styles";
import type { FilterMenuProps, LogicOperator } from "./FilterGroup.types";
import { createEmptyFilter, createEmptyGroup } from "./util";
import { useFilterGroupConfig } from "./config";

const FilterMenu = ({
  filter,
  fields,
  onUpdate,
  onRemove,
  level = 0,
}: FilterMenuProps) => {
  const { components } = useFilterGroupConfig();
  const {
    LogicButton,
    AddExpressionButton,
    AddGroupButton,
    RemoveGroupButton,
  } = components;

  const addFilter = (): void => {
    const newFilters = [...filter.filters, createEmptyFilter(fields)];
    onUpdate({ ...filter, filters: newFilters });
  };

  const addGroup = (): void => {
    if (filter.filters.length === 0) return; // don't allow adding group into an empty group
    const newFilters = [...filter.filters, createEmptyGroup(fields)];
    onUpdate({ ...filter, filters: newFilters });
  };
  const toggleLogic = (): void => {
    const newLogic: LogicOperator = filter.logic === "and" ? "or" : "and";
    onUpdate({ ...filter, logic: newLogic });
  };

  const removeGroup = (): void => {
    if (level > 0 && onRemove) {
      onRemove();
    } else {
      // root group: clear all items
      onUpdate({ ...filter, filters: [] });
    }
  };
  return (
    <FilterMenuContainer>
      <LogicButton logic={filter.logic} toggle={toggleLogic} />
      <AddExpressionButton onClick={addFilter} />
      <AddGroupButton
        onClick={addGroup}
        disabled={filter.filters.length === 0}
        hasFilters={filter.filters.length > 0}
      />
      {filter.filters.length > 0 && <RemoveGroupButton onClick={removeGroup} />}
    </FilterMenuContainer>
  );
};

export default FilterMenu;
