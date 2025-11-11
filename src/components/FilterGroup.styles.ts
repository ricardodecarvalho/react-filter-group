import styled from "styled-components";

export const FilterFieldsContainer = styled.div`
  button {
    cursor: pointer;
    border: 1px solid var(--rfg-border, #e6e6e6);
    border-radius: var(--rfg-radius, 0.25rem);
    color: var(--rfg-fg, #424242);
    background-color: var(--rfg-button-bg, #f5f5f5);
    padding: 0.25rem 0.5rem;

    &:hover {
      background-color: var(--rfg-accent, #0b89e3);
      color: var(--rfg-button-hover-fg, #ffffff);
    }

    &:disabled {
      cursor: not-allowed;
      background-color: var(--rfg-disabled-bg, #cccccc);
      color: var(--rfg-disabled-fg, #666666);
    }
  }

  input,
  select {
    padding: 0.25rem;
    border: 1px solid var(--rfg-border, #e6e6e6);
    border-radius: var(--rfg-radius, 0.25rem);
    color: var(--rfg-fg, #424242);
    background-color: var(--rfg-input-bg, #fafafa);
    outline: none;

    &:focus {
      box-shadow: 0 0 2px 1px var(--rfg-accent, #0b89e3);
    }
  }

  .btn-remove {
    &: hover {
      background-color: var(--rfg-danger, #e30b0b);
      color: var(--rfg-button-hover-fg, #ffffff);
    }
  }

  .btn-logic {
    background-color: var(--rfg-accent, #0b89e3);
    color: var(--rfg-button-fg, #ffffff);
  }
`;

export const FilterGroupItem = styled.div`
  position: relative;
  padding-left: 2rem;
  padding-top: 0.5rem;
`;

export const FilterGroupContainer = styled.div`
  position: relative;

  /* vertical branch line */
  &::before {
    content: "";
    position: absolute;
    top: 2.6rem;
    bottom: 1.8rem;
    left: 1rem;
    width: 1px;
    background-color: var(--rfg-branch, #e0e0e0);
  }

  /* horizontal connectors from the vertical line to each item */
  > ${FilterGroupItem} {
    position: relative;
  }

  > ${FilterGroupItem}::before {
    content: "";
    position: absolute;
    top: 1.5rem;
    left: 1rem;
    width: 1rem;
    height: 1px;
    background-color: var(--rfg-branch, #e0e0e0);
  }

  /* Trim the vertical line for the last child so it doesn't hang past it */
  > ${FilterGroupItem}:last-child::after {
    content: "";
    position: absolute;
    left: 1rem; /* align exactly over the container vertical line */
    top: calc(1.5rem + 1px); /* start just below the elbow */
    bottom: 0; /* extend to the end of the item */
    width: 2px; /* slightly wider to fully cover */
    background-color: var(--rfg-bg, #ffffff); /* match page background; adjust if themed */
  }
`;

const Container = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem;
  border: 1px solid var(--rfg-border, #e6e6e6);
  border-radius: var(--rfg-radius, 0.25rem);
  color: var(--rfg-fg, #424242);
  background-color: var(--rfg-bg, #fafafa);
  width: fit-content;
`;

export const FilterHeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

export const FilterMenuContainer = styled(Container)``;

export const FilterRowContainer = styled(Container)``;
