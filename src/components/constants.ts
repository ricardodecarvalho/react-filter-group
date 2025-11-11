import type { FieldType, Operator, OperatorValue } from "./FilterGroup.types";

export const OPERATORS: Record<FieldType, Operator[]> = {
  text: [
    { value: "eq", label: "Equal to" },
    { value: "neq", label: "Not equal to" },
    { value: "contains", label: "Contains" },
    { value: "notcontains", label: "Does not contain" },
    { value: "startswith", label: "Starts with" },
    { value: "endswith", label: "Ends with" },
    { value: "isempty", label: "Is empty" },
    { value: "isnotempty", label: "Is not empty" },
  ],
  numeric: [
    { value: "eq", label: "Equal to" },
    { value: "neq", label: "Not equal to" },
    { value: "gt", label: "Greater than" },
    { value: "gte", label: "Greater than or equal to" },
    { value: "lt", label: "Less than" },
    { value: "lte", label: "Less than or equal to" },
    { value: "isnull", label: "Is null" },
    { value: "isnotnull", label: "Is not null" },
  ],
  date: [
    { value: "eq", label: "Equal to" },
    { value: "neq", label: "Not equal to" },
    { value: "gt", label: "After" },
    { value: "gte", label: "After or equal to" },
    { value: "lt", label: "Before" },
    { value: "lte", label: "Before or equal to" },
    { value: "isnull", label: "Is null" },
    { value: "isnotnull", label: "Is not null" },
  ],
  boolean: [{ value: "eq", label: "Equal to" }],
};

export const NO_VALUE_OPERATORS: OperatorValue[] = [
  "isempty",
  "isnotempty",
  "isnull",
  "isnotnull",
];
