import { create } from "zustand";

interface Column {
  columnId: number;
  name: string;
  type: string;
  defaultValue: string;
  primary: boolean;
}

interface Table {
  tableId: string;
  name: string;
  description: string;
  schema: Column[];
}

interface MetadataState {
  table: Table;
}

interface MetadataActions {
  addColumn: (column: Partial<Column>) => void;
  deleteColumn: (columnId: number) => void;
  updateTable: (updatedTable: Partial<Table>) => void;
  updateColumn: (columnId: number, updatedColumn: Partial<Column>) => void;
}

const useMetadataStore = create<MetadataState & MetadataActions>((set) => {
  const initialState: MetadataState = {
    table: {
      tableId: "",
      name: "",
      description: "",
      schema: [
        { columnId: 1, name: "", type: "", defaultValue: "", primary: false },
      ],
    },
  };

  const actions: MetadataActions = {
    addColumn: (column) => {
      set((state) => {
        const nextId =
          state.table.schema.length > 0
            ? state.table.schema[state.table.schema.length - 1].columnId + 1
            : 1;
        const updatedSchema = [
          ...state.table.schema,
          { columnId: nextId, ...column } as Column,
        ];
        return { ...state, table: { ...state.table, schema: updatedSchema } };
      });
    },

    deleteColumn: (columnId) => {
      set((state) => ({
        table: {
          ...state.table,
          schema: state.table.schema.filter(
            (column) => column.columnId !== columnId
          ),
        },
      }));
    },

    updateTable: (updatedTable) => {
      set((state) => ({
        table: {
          ...state.table,
          ...updatedTable,
        },
      }));
    },

    updateColumn: (columnId, updatedColumn) => {
      set((state) => ({
        table: {
          ...state.table,
          schema: state.table.schema.map((column) =>
            column.columnId === columnId
              ? { ...column, ...updatedColumn }
              : column
          ),
        },
      }));
    },
  };

  return { ...initialState, ...actions };
});

export default useMetadataStore;
