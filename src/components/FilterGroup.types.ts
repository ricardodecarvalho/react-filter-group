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

/**
 * Props delivered to a custom value input (see `FilterField.renderValue`).
 *
 * - `value`: the current filter value, typed as `unknown` because custom
 *   renderers can hold arbitrary shapes (arrays of UUIDs, ranges, etc.).
 * - `onChange`: call with the next value. Any JSON-serializable shape is OK.
 * - `operator`: the currently selected operator, useful when the same field
 *   should render different controls depending on `eq` vs `in`, for example.
 */
export interface RenderValueProps {
  value: unknown;
  onChange: (next: unknown) => void;
  operator: OperatorValue;
}

export interface FilterField {
  name: string;
  label: string;
  type: FieldType;
  /**
   * Optional custom renderer for the value input. When provided, completely
   * replaces the built-in input (text/number/date/checkbox) for this field.
   * Keep `type` set to the closest builtin so the default operator list still
   * makes sense — or override operators via `FilterGroupConfigProvider`.
   */
  renderValue?: (props: RenderValueProps) => React.ReactNode;
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
