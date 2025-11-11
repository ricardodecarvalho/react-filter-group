import { useState } from "react";
import {
  Filter,
  FilterField,
  CompositeFilter,
  FilterGroupConfigProvider,
} from "../src/index";

const initialValue: CompositeFilter = {
  logic: "and",
  filters: [
    {
      field: "date_creation_row",
      operator: "gte",
      value: "2025-11-01",
    },
    {
      field: "date_creation_row",
      operator: "lte",
      value: "2025-11-10",
    },
  ],
};

const App = () => {
  const [filter, setFilter] = useState<CompositeFilter | null>(initialValue);

  const fields: FilterField[] = [
    { name: "des", label: "Description", type: "text" },
    { name: "uuid_situation", label: "Situation", type: "numeric" },
    { name: "date_creation_row", label: "Creation Date", type: "date" },
  ];

  return (
    <div className="app">
      <header className="header">
        <h1>🎯 React Filter Group</h1>
      </header>

      <main className="main">
        <section className="filter-section">
          <h2>Filters</h2>
          <Filter
            fields={fields}
            value={filter}
            onChange={(e) => setFilter(e.value)}
          />
        </section>

        <section className="output-section">
          <h2>Output</h2>
          <pre>{JSON.stringify(filter, null, 2)}</pre>
        </section>
      </main>
    </div>
  );
};

export default App;
