"use server";

import axios, { AxiosResponse } from "axios";

export const createTable = async (
  payload: object
): Promise<{ data: object; id: number } | undefined> => {
  try {
    const response: AxiosResponse<any> = await axios({
      method: "post",
      url: `${process.env.NEXT_PUBLIC_SUPABASE_STUDIO_URL}/tables`,
      data: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error creating table:", error);
    return undefined;
  }
};
