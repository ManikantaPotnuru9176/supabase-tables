"use server";

import axios from "axios";

export const getTable = async () => {
  try {
    const response = await axios({
      method: "get",
      url: `${process.env.NEXT_PUBLIC_SUPABASE_STUDIO_URL}/tables`,
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error creating table:", error);
  }
};
