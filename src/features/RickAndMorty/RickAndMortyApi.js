import axios from "axios";
import { ENDPOINTS } from "./RickAndMortyConstants";

export const getCharacters = async (page = 1, controller) => {
  try {
    const { data } = await axios.get(ENDPOINTS.CHARACTERS, {
      params: {
        page,
      },
      signal: controller.signal,
    });
    return data;
  } catch (error) {
    return {
      error: true,
      message: error.message,
    };
  }
};
