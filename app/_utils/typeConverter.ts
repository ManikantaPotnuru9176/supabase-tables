export const typeConverter = (type: string): string => {
  switch (type.toLowerCase()) {
    case "string":
      return "varchar";
    case "integer":
      return "int4";
    case "boolean":
      return "bool";
    case "rte":
      return "varchar";
    case "date":
      return "date";
    case "biginteger":
      return "int8";
    case "timestamptz":
      return "timestamptz";
    default:
      throw new Error(`Unsupported type: ${type}`);
  }
};
