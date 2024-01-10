import supabase from "@/app/_utils/supabase";

export const insertData = async (tableName: string, newData: object) => {
  try {
    const { data, error, status } = await supabase
      .from(tableName)
      .insert([newData]);

    if (error && status !== 406) throw error;

    return data;
  } catch (error) {
    console.error("Error creating data:", error);
  }
};
