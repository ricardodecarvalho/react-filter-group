# react-filter-group

A small, composable React library to build filter groups (nested AND/OR expressions) with first‑class customization: i18n, operators per field type, theming via CSS variables, and UI slots.

- React 17+ JSX transform (no need to import React in every file)
- TypeScript types included
- Customizable operators, labels, and colors
- Replaceable UI parts (buttons, toggles) via component slots

## Installation

```bash
npm install react-filter-group
# or
yarn add react-filter-group
# or
pnpm add react-filter-group
```

Peer dependencies: react, react-dom.

## Quick start

The package exports a high-level Filter component that manages a CompositeFilter value and a Provider for configuration.

```tsx
import { Filter, FilterField, CompositeFilter } from "react-filter-group";

const fields: FilterField[] = [
  { name: "description", label: "Description", type: "text" },
  { name: "statusId", label: "Status", type: "numeric" },
  { name: "createdAt", label: "Creation Date", type: "date" },
];

const initial: CompositeFilter = {
  logic: "and",
  filters: [
    { field: "createdAt", operator: "gte", value: "2025-01-01" },
    { field: "createdAt", operator: "lte", value: "2025-12-31" },
  ],
};

export default function Example() {
  const [value, setValue] = useState<CompositeFilter | null>(initial);

  return (
    <Filter fields={fields} value={value} onChange={(e) => setValue(e.value)} />
  );
}
```

## Configuration and customization

Wrap your app (or the area that renders the filter) in the provider to customize i18n, operators, theme variables, or even swap UI parts.

```tsx
import {
  Filter,
  FilterGroupConfigProvider,
  FilterField,
  CompositeFilter,
} from "react-filter-group";

<FilterGroupConfigProvider
  value={{
    // 1) i18n (labels)
    messages: {
      addExpression: "Add condition",
      addGroup: "Add group",
      removeGroup: "Remove",
      logicAnd: "AND",
      logicOr: "OR",
    },

    // 2) theme via CSS variables (prefix --rfg-)
    // see the "Theming" section for the full list
    themeVars: {
      accent: "#2563eb",
      radius: "6px",
      // bg, fg, border, input-bg, disabled-bg, disabled-fg, danger, branch, ...
    },

    // 3) operators per field type (partial override)
    operators: {
      text: [
        { value: "contains", label: "Contains" },
        { value: "eq", label: "Equal to" },
        { value: "neq", label: "Not equal" },
      ],
    },

    // 4) optional UI slots (buttons)
    // components: {
    //   LogicButton: ({ logic, toggle }) => (
    //     <button onClick={toggle}>Logic: {logic.toUpperCase()}</button>
    //   ),
    //   AddExpressionButton: ({ onClick }) => (
    //     <button onClick={onClick}>+ Condition</button>
    //   ),
    //   AddGroupButton: ({ onClick }) => (
    //     <button onClick={onClick}>+ Group</button>
    //   ),
    //   RemoveGroupButton: ({ onClick }) => (
    //     <button onClick={onClick}>Remove</button>
    //   ),
    // },
  }}
>
  <Filter fields={fields} value={value} onChange={(e) => setValue(e.value)} />
</FilterGroupConfigProvider>;
```

### Theming (CSS variables)

You can style the component with CSS variables injected by the provider via `themeVars`. Each key is prefixed with `--rfg-` internally. All variables have sensible fallbacks.

Available variables used today:

- `--rfg-accent` (action/primary color)
- `--rfg-radius` (border radius)
- `--rfg-bg` (container background)
- `--rfg-fg` (text color)
- `--rfg-border` (borders)
- `--rfg-input-bg`
- `--rfg-button-bg`
- `--rfg-button-fg`
- `--rfg-button-hover-fg`
- `--rfg-disabled-bg`
- `--rfg-disabled-fg`
- `--rfg-danger` (dangerous actions, e.g. remove)
- `--rfg-branch` (connector lines in the group tree)

Example:

```tsx
<FilterGroupConfigProvider value={{ themeVars: { accent: '#7c3aed', radius: '8px' } }}>
  <Filter ... />
</FilterGroupConfigProvider>
```

## Custom value inputs (renderValue)

Each `FilterField` can override the default value input with its own renderer. Use this to plug in an autocomplete, a custom date picker, a multi-select, or anything else — the library just gets back the value through `onChange` and stores it on the `FilterExpression`.

```tsx
import { Filter, FilterField } from "react-filter-group";
import { MyAutocomplete } from "./MyAutocomplete";

const fields: FilterField[] = [
  {
    name: "owner.uuid",
    label: "Owner",
    type: "text",
    renderValue: ({ value, onChange, operator }) => (
      <MyAutocomplete
        value={value as string | undefined}
        onPick={(picked) => onChange(picked.uuid)}
        operator={operator}
      />
    ),
  },
];
```

The renderer receives `{ value, onChange, operator }`:

- `value`: current filter value (`unknown` — your renderer narrows it).
- `onChange(next)`: persist a new value. Any JSON-serializable shape is fine (string, number, array of UUIDs, etc.).
- `operator`: the currently selected operator, in case the input should differ between e.g. `eq` and `in`.

Keep `type` set to the closest builtin (usually `"text"`) so the default operator list still makes sense, or override the operators for this field type via the provider.

## Types (summary)

- FieldType: 'text' | 'numeric' | 'date' | 'boolean'
- OperatorValue: 'eq' | 'neq' | 'contains' | 'notcontains' | 'startswith' | 'endswith' | 'gt' | 'gte' | 'lt' | 'lte' | 'isempty' | 'isnotempty' | 'isnull' | 'isnotnull'
- LogicOperator: 'and' | 'or'
- FilterField: { name: string; label: string; type: FieldType; renderValue?: (props: RenderValueProps) => ReactNode }
- RenderValueProps: { value: unknown; onChange: (next: unknown) => void; operator: OperatorValue }
- Operator: { value: OperatorValue; label: string }
- FilterExpression: { field: string; operator: OperatorValue; value?: string | number | boolean | null }
- CompositeFilter: { logic: LogicOperator; filters: Array<FilterExpression | CompositeFilter> }

Component props (high-level):

- Filter
  - fields: FilterField[]
  - value?: CompositeFilter | null
  - onChange?: (e: { value: CompositeFilter | null }) => void

Config Provider API:

- FilterGroupConfigProvider value?: {
  - operators?: Partial<Record<FieldType, Operator[]>>
  - messages?: Partial<Messages>
  - themeVars?: Record<string, string>
  - components?: Partial<FilterGroupComponents>
    }

## Operators

Default operator sets exist for each FieldType. You can override a subset with the provider. There are operators that do not require a value (e.g. `isempty`, `isnotempty`, `isnull`, `isnotnull`) and the input is hidden automatically.

## Internationalization (i18n)

Override any UI label via `messages`:

- logicAnd, logicOr
- addExpression, addGroup, removeGroup

## Replacing UI parts (slots)

If you need to integrate with your design system, replace only the pieces you need through `components` in the provider. The default implementations consume i18n messages, and your overrides can do the same if you call the `useFilterGroupConfig()` hook.

Slots available:

- LogicButton: ({ logic: 'and' | 'or', toggle })
- AddExpressionButton: ({ onClick })
- AddGroupButton: ({ onClick, disabled, hasFilters })
- RemoveGroupButton: ({ onClick })

## Development

Run the local example (Vite):

```bash
npm install
npm run example
```

Build library (Rollup):

```bash
npm run build
```

Run tests:

```bash
npm test
```

Lint:

```bash
npm run lint
```

## Importing locally vs from npm

- In development (this repo), the example imports from the local `src` using Vite config and/or TS paths.
- When installed from npm in an external app, import from `react-filter-group` directly.

## License

MIT
