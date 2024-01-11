import supabase from "@/app/_utils/supabase";

export const getData = async (
  tableName: string,
  columnNames: string,
  orderBy: string
) => {
  try {
    const { data, error, status } = await supabase
      .from(tableName)
      .select(columnNames)
      .order(orderBy);

    if (error && status !== 406) throw error;

    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
