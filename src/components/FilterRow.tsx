import { NO_VALUE_OPERATORS } from "./constants";
import { FilterRowContainer } from "./FilterGroup.styles";
import type { FilterRowProps, OperatorValue } from "./FilterGroup.types";
import { useFilterGroupConfig } from "./config";

const FilterRow = ({ filter, fields, onUpdate, onRemove }: FilterRowProps) => {
  const { operators, components } = useFilterGroupConfig();
  const { RemoveExpressionButton } = components;

  const selectedField =
    fields.find((f) => f.name === filter.field) || fields[0];
  const resolvedOperators = operators[selectedField.type] || operators.text;
  const needsValue = !NO_VALUE_OPERATORS.includes(filter.operator);

  const handleFieldChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    const newField = fields.find((f) => f.name === e.target.value);
    if (!newField) return;

    const newOperators = operators[newField.type] || operators.text;
    onUpdate({
      field: e.target.value,
      operator: newOperators[0].value,
      value: "",
    });
  };

  const handleOperatorChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    onUpdate({ operator: e.target.value as OperatorValue });
  };

  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value: string | number =
      selectedField.type === "numeric"
        ? parseFloat(e.target.value) || ""
        : e.target.value;
    onUpdate({ value });
  };

  return (
    <FilterRowContainer>
      <select value={filter.field} onChange={handleFieldChange}>
        {fields.map((field) => (
          <option key={field.name} value={field.name}>
            {field.label}
          </option>
        ))}
      </select>

      <select value={filter.operator} onChange={handleOperatorChange}>
        {resolvedOperators.map((op) => (
          <option key={op.value} value={op.value}>
            {op.label}
          </option>
        ))}
      </select>

      {needsValue && (
        <input
          type={
            selectedField.type === "numeric"
              ? "number"
              : selectedField.type === "date"
              ? "date"
              : "text"
          }
          value={filter.value?.toString() || ""}
          onChange={handleValueChange}
          placeholder="Value..."
        />
      )}

      <RemoveExpressionButton onClick={onRemove} />
    </FilterRowContainer>
  );
};

export default FilterRow;
