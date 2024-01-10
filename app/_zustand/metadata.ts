import { create } from "zustand";

interface Column {
  column_id: number;
  name: string;
  type: string;
  default_value: string;
  primary: boolean;
}

interface Table {
  table_id: number | null;
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
      table_id: null,
      name: "",
      description: "",
      schema: [
        { column_id: 1, name: "", type: "", default_value: "", primary: false },
      ],
    },
  };

  const actions: MetadataActions = {
    addColumn: (column) => {
      set((state) => {
        const nextId =
          state.table.schema.length > 0
            ? state.table.schema[state.table.schema.length - 1].column_id + 1
            : 1;
        const updatedSchema = [
          ...state.table.schema,
          { column_id: nextId, ...column } as Column,
        ];
        return { ...state, table: { ...state.table, schema: updatedSchema } };
      });
    },

    deleteColumn: (columnId) => {
      set((state) => ({
        table: {
          ...state.table,
          schema: state.table.schema.filter(
            (column) => column.column_id !== columnId
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
            column.column_id === columnId
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
