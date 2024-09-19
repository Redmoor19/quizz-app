import { Question } from "@/types/questions";
import api from "./api";

interface GetQuestionsResponse {
  response_code: number;
  results: Question[];
}

const getQuestions = async (params: {
  [key: string]: string;
}): Promise<GetQuestionsResponse | { error: string }> => {
  const searchParams = new URLSearchParams(params);

  try {
    const data: GetQuestionsResponse = await api.get(
      `/api.php?${searchParams.toString()}`
    );
    return data;
  } catch (error: any) {
    return {
      error: error.message || "An unknown error occurred",
    };
  }
};

export default getQuestions;
