export type FieldType = "text" | "numeric" | "date" | "boolean";

export type OperatorValue =
  | "eq"
  | "neq"
  | "contains"
  | "notcontains"
  | "startswith"
  | "endswith"
  | "gt"
  | "gte"
  | "lt"
  | "lte";

export type LogicOperator = "and" | "or";

export interface FilterField {
  name: string;
  label: string;
  type: FieldType;
}

export interface Operator {
  value: OperatorValue;
  label: string;
}

export interface FilterExpression {
  field: string;
  operator: OperatorValue;
  value?: any;
}

export interface CompositeFilter {
  logic: LogicOperator;
  filters: (FilterExpression | CompositeFilter)[];
}

export interface FilterProps {
  fields: FilterField[];
  value?: CompositeFilter | null;
  onChange?: (event: { value: CompositeFilter }) => void;
}

export interface FilterGroupProps {
  filter: CompositeFilter;
  fields: FilterField[];
  onUpdate: (updates: CompositeFilter) => void;
  onRemove?: () => void;
  level?: number;
}

export interface FilterRowProps {
  filter: FilterExpression;
  fields: FilterField[];
  onUpdate: (updates: Partial<FilterExpression>) => void;
  onRemove: () => void;
}

export interface FilterMenuProps {
  filter: CompositeFilter;
  fields: FilterField[];
  onUpdate: (updates: CompositeFilter) => void;
  level?: number; // nesting level, root = 0
  onRemove?: () => void; // remove this group when not root
}
