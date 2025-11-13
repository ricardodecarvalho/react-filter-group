import type { FieldType, Operator, OperatorValue } from "./FilterGroup.types";

export const OPERATORS: Record<FieldType, Operator[]> = {
  text: [
    { value: "eq", label: "Equal to" },
    { value: "neq", label: "Not equal to" },
    { value: "contains", label: "Contains" },
    { value: "notcontains", label: "Does not contain" },
    { value: "startswith", label: "Starts with" },
    { value: "endswith", label: "Ends with" },
  ],
  numeric: [
    { value: "eq", label: "Equal to" },
    { value: "neq", label: "Not equal to" },
    { value: "gt", label: "Greater than" },
    { value: "gte", label: "Greater than or equal to" },
    { value: "lt", label: "Less than" },
    { value: "lte", label: "Less than or equal to" },
  ],
  date: [
    { value: "eq", label: "Equal to" },
    { value: "neq", label: "Not equal to" },
    { value: "gt", label: "After" },
    { value: "gte", label: "After or equal to" },
    { value: "lt", label: "Before" },
    { value: "lte", label: "Before or equal to" },
  ],
  boolean: [{ value: "eq", label: "Equal to" }],
};
