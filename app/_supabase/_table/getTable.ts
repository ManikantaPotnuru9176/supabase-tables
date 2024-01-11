"use server";

import axios from "axios";

export const getTable = async (table_id: number) => {
  try {
    const response = await axios({
      method: "get",
      url: `${process.env.NEXT_PUBLIC_SUPABASE_STUDIO_URL}/tables`,
      headers: {
        "Content-Type": "application/json",
      },
      params: { id: table_id },
    });
    return response.data;
  } catch (error) {
    console.error("Error getting table:", error);
  }
};
