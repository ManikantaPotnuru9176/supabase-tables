"use server";

import axios, { AxiosResponse } from "axios";

export const createColumn = async (
  payload: object
): Promise<{ data: object } | undefined> => {
  try {
    const response: AxiosResponse<any> = await axios({
      method: "post",
      url: `${process.env.NEXT_PUBLIC_SUPABASE_URL}/columns`,
      data: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error adding column:", error);
    return undefined;
  }
};
