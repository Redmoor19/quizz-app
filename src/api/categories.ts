import api from "./api";

type Category = {
  id: number;
  name: string;
};

type CategoriesRes = {
  trivia_categories: Category[];
};

const getCategories = (): Promise<CategoriesRes> => api.get("api_category.php");

export default getCategories;
