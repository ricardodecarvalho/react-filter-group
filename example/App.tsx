import { useState } from "react";
import {
  Filter,
  FilterField,
  CompositeFilter,
  FilterExpression,
} from "../src/index";

const fields: FilterField[] = [
  { name: "name", label: "Name", type: "text" },
  { name: "product", label: "Product", type: "text" },
  { name: "price", label: "Price", type: "numeric" },
  { name: "date", label: "Date", type: "date" },
  { name: "is_active", label: "Is Active", type: "boolean" },
];

const initialValue: CompositeFilter = {
  logic: "and",
  filters: [
    {
      field: "name",
      operator: "neq",
      value: "Bob",
    },
  ],
};

type SampeData = {
  name: string;
  product: string;
  date_creation: string;
  price: number;
  is_active: boolean;
};

const sampleData: SampeData[] = [
  {
    name: "Alice",
    product: "Laptop",
    date_creation: "2025-11-05",
    price: 1200,
    is_active: true,
  },
  {
    name: "Bob",
    product: "Smartphone",
    date_creation: "2025-10-20",
    price: 800,
    is_active: false,
  },
  {
    name: "Charlie",
    product: "Tablet",
    date_creation: "2025-11-15",
    price: 600,
    is_active: true,
  },
  {
    name: "David",
    product: "Headphones",
    date_creation: "2025-11-02",
    price: 150,
    is_active: false,
  },
  {
    name: "Eve",
    product: "Monitor",
    date_creation: "2025-11-08",
    price: 300,
    is_active: true,
  },
];

const applyFilter = (
  data: SampeData[],
  filter: CompositeFilter
): SampeData[] => {
  const evaluateFilter = (
    item: SampeData,
    filterItem: CompositeFilter | FilterExpression
  ): boolean => {
    if ("logic" in filterItem) {
      // É um CompositeFilter
      const results = filterItem.filters.map((f) => evaluateFilter(item, f));
      return filterItem.logic === "and"
        ? results.every((r) => r)
        : results.some((r) => r);
    }

    // É um Filter simples
    const { field, operator, value } = filterItem;
    const itemValue = item[field as keyof SampeData];

    if (itemValue === undefined) return false;

    // Normaliza valores de texto para comparação case-insensitive
    const normalizedItemValue =
      typeof itemValue === "string" ? itemValue.toLowerCase() : itemValue;
    const normalizedValue =
      typeof value === "string" ? value.toLowerCase() : value;

    switch (operator) {
      case "eq":
        return normalizedItemValue === normalizedValue;
      case "neq":
        return normalizedItemValue !== normalizedValue;
      case "gt":
        return itemValue > value;
      case "gte":
        return itemValue >= value;
      case "lt":
        return itemValue < value;
      case "lte":
        return itemValue <= value;
      case "contains":
        return String(normalizedItemValue).includes(String(normalizedValue));
      case "notcontains":
        return !String(normalizedItemValue).includes(String(normalizedValue));
      case "startswith":
        return String(normalizedItemValue).startsWith(String(normalizedValue));
      case "endswith":
        return String(normalizedItemValue).endsWith(String(normalizedValue));
      default:
        return true;
    }
  };

  return data.filter((item) => evaluateFilter(item, filter));
};

const App = () => {
  const [filter, setFilter] = useState<CompositeFilter | null>(initialValue);
  const filteredData = filter ? applyFilter(sampleData, filter) : sampleData;
  return (
    <div className="app">
      <header className="header">
        <h1>React Filter Group</h1>
        <p>A React component library for building filter groups</p>
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

        <section className="data-section">
          <h2>Filtered Data</h2>
          <table className="">
            <thead>
              <tr>
                <th>Name</th>
                <th>Product</th>
                <th>Creation Date</th>
                <th>Price</th>
                <th>Is Active</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((item, index) => (
                <tr key={index}>
                  <td>{item.name}</td>
                  <td>{item.product}</td>
                  <td>{item.date_creation}</td>
                  <td>{item.price}</td>
                  <td>{item.is_active ? "Yes" : "No"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </main>
    </div>
  );
};

export default App;
