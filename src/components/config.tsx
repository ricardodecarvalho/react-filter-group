import React, {
  createContext,
  useContext,
  useMemo,
  PropsWithChildren,
} from "react";
import type { FieldType, Operator } from "./FilterGroup.types";
import { OPERATORS } from "./constants";

// Messages / i18n shape
export type Messages = {
  logicAnd: string;
  logicOr: string;
  addExpression: string;
  addGroup: string;
  removeGroup: string;
  removeExpression: string;
};

export const defaultMessages: Messages = {
  logicAnd: "AND",
  logicOr: "OR",
  addExpression: "Add expression",
  addGroup: "Add group",
  removeGroup: "x",
  removeExpression: "x",
};

export type FilterGroupConfig = {
  operators?: Partial<Record<FieldType, Operator[]>>;
  messages?: Partial<Messages>;
  themeVars?: Record<string, string>; // CSS variables mapping (without the prefix)
  components?: Partial<FilterGroupComponents>; // optional component overrides
};

// Slot components overridable by user
export interface FilterGroupComponents {
  LogicButton: React.ComponentType<LogicButtonProps>;
  AddExpressionButton: React.ComponentType<BasicButtonProps>;
  AddGroupButton: React.ComponentType<AddGroupButtonProps>;
  RemoveGroupButton: React.ComponentType<BasicButtonProps>;
  RemoveExpressionButton: React.ComponentType<BasicButtonProps>;
}

// Props for overrides
export interface LogicButtonProps {
  logic: "and" | "or";
  toggle: () => void;
  disabled?: boolean;
}
export interface BasicButtonProps {
  onClick: () => void;
  disabled?: boolean;
}
export interface AddGroupButtonProps extends BasicButtonProps {
  hasFilters: boolean;
}

// Default slot implementations (read messages from context for i18n)
const DefaultLogicButton: React.FC<LogicButtonProps> = ({ logic, toggle }) => {
  const { messages } = useFilterGroupConfig();
  return (
    <button onClick={toggle} className="btn-logic">
      {logic === "and" ? messages.logicAnd : messages.logicOr}
    </button>
  );
};
const DefaultAddExpressionButton: React.FC<BasicButtonProps> = ({
  onClick,
  disabled,
}) => {
  const { messages } = useFilterGroupConfig();
  return (
    <button onClick={onClick} disabled={disabled}>
      {messages.addExpression}
    </button>
  );
};
const DefaultAddGroupButton: React.FC<AddGroupButtonProps> = ({
  onClick,
  disabled,
}) => {
  const { messages } = useFilterGroupConfig();
  return (
    <button onClick={onClick} disabled={disabled}>
      {messages.addGroup}
    </button>
  );
};
const DefaultRemoveGroupButton: React.FC<BasicButtonProps> = ({
  onClick,
  disabled,
}) => {
  const { messages } = useFilterGroupConfig();
  return (
    <button onClick={onClick} disabled={disabled} className="btn-remove">
      {messages.removeGroup}
    </button>
  );
};

const DefaultRemoveExpressionButton: React.FC<BasicButtonProps> = ({
  onClick,
  disabled,
}) => {
  const { messages } = useFilterGroupConfig();
  return (
    <button onClick={onClick} disabled={disabled} className="btn-remove">
      {messages.removeExpression}
    </button>
  );
};

interface ResolvedConfig {
  operators: Record<FieldType, Operator[]>;
  messages: Messages;
  themeVars?: Record<string, string>;
  components: FilterGroupComponents;
}

const ConfigContext = createContext<ResolvedConfig>({
  operators: OPERATORS,
  messages: defaultMessages,
  components: {
    LogicButton: DefaultLogicButton,
    AddExpressionButton: DefaultAddExpressionButton,
    AddGroupButton: DefaultAddGroupButton,
    RemoveGroupButton: DefaultRemoveGroupButton,
    RemoveExpressionButton: DefaultRemoveExpressionButton,
  },
});

export const useFilterGroupConfig = () => useContext(ConfigContext);

export const FilterGroupConfigProvider: React.FC<
  PropsWithChildren<{ value?: FilterGroupConfig }>
> = ({ value, children }) => {
  const resolved = useMemo<ResolvedConfig>(() => {
    const operators = { ...OPERATORS, ...(value?.operators ?? {}) } as Record<
      FieldType,
      Operator[]
    >;
    const messages = { ...defaultMessages, ...(value?.messages ?? {}) };
    const components: FilterGroupComponents = {
      LogicButton: value?.components?.LogicButton || DefaultLogicButton,
      AddExpressionButton:
        value?.components?.AddExpressionButton || DefaultAddExpressionButton,
      AddGroupButton:
        value?.components?.AddGroupButton || DefaultAddGroupButton,
      RemoveGroupButton:
        value?.components?.RemoveGroupButton || DefaultRemoveGroupButton,
      RemoveExpressionButton:
        value?.components?.RemoveExpressionButton ||
        DefaultRemoveExpressionButton,
    };
    return {
      operators,
      messages,
      themeVars: value?.themeVars,
      components,
    };
  }, [value]);

  const style: React.CSSProperties | undefined = resolved.themeVars
    ? (Object.fromEntries(
        Object.entries(resolved.themeVars).map(([k, v]) => [`--rfg-${k}`, v])
      ) as React.CSSProperties)
    : undefined;

  return (
    <ConfigContext.Provider value={resolved}>
      <div style={style}>{children}</div>
    </ConfigContext.Provider>
  );
};
