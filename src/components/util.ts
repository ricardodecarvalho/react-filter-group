import { OPERATORS } from "./constants";
import type {
  CompositeFilter,
  FilterExpression,
  FilterField,
} from "./FilterGroup.types";

export const createEmptyFilter = (fields: FilterField[]): FilterExpression => ({
  field: fields[0]?.name || "",
  operator: OPERATORS[fields[0]?.type || "text"][0].value,
  value: "",
});

export const createEmptyGroup = (fields: FilterField[]): CompositeFilter => ({
  logic: "and",
  filters: [createEmptyFilter(fields)],
});

export const isFilterExpression = (
  filter: FilterExpression | CompositeFilter
): filter is FilterExpression => {
  return "field" in filter && "operator" in filter;
};

export const evaluateCompositeFilter = <
  T extends Record<string, string | number | boolean>
>(
  item: T,
  filter: CompositeFilter
): boolean => {
  const results = filter.filters.map((f) => {
    if (isFilterExpression(f)) {
      return evaluateFilterExpression(item, f);
    } else {
      return evaluateCompositeFilter(item, f);
    }
  });

  if (filter.logic === "and") {
    return results.every((r) => r);
  } else {
    return results.some((r) => r);
  }
};

export const evaluateFilterExpression = <
  T extends Record<string, string | number | boolean>
>(
  item: T,
  filter: FilterExpression
): boolean => {
  const value = item[filter.field];
  const filterValue = filter.value;

  switch (filter.operator) {
    case "eq":
      return value == filterValue;
    case "neq":
      return value != filterValue;
    case "contains":
      return String(value)
        .toLowerCase()
        .includes(String(filterValue).toLowerCase());
    case "notcontains":
      return !String(value)
        .toLowerCase()
        .includes(String(filterValue).toLowerCase());
    case "startswith":
      return String(value)
        .toLowerCase()
        .startsWith(String(filterValue).toLowerCase());
    case "endswith":
      return String(value)
        .toLowerCase()
        .endsWith(String(filterValue).toLowerCase());
    case "gt":
      return filterValue !== undefined && value > filterValue; //;
    case "gte":
      return filterValue !== undefined && value >= filterValue;
    case "lt":
      return filterValue !== undefined && value < filterValue;
    case "lte":
      return filterValue !== undefined && value <= filterValue;
    default:
      return true;
  }
};
