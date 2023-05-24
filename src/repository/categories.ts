import AsyncStorage from '@react-native-async-storage/async-storage';

const CATEGORY_LIMIT = 20;

export type Category = {
  name: string;
  range: number;
};

export const createExpenseCategory = async (categoryName: string): Promise<void> => {
  const currentCategoriesJson = await AsyncStorage.getItem('expenseCategories');
  let currentCategories: Category[];

  if (currentCategoriesJson == null) {
    currentCategories = [];
  } else {
    currentCategories = JSON.parse(currentCategoriesJson);
  }

  if (currentCategories.find((category) => category.name === categoryName)) {
    throw new Error('This category already exists');
  }

  if (currentCategories.length >= CATEGORY_LIMIT) {
    throw new Error('Category limit of 20 reached');
  }

  const newCategory = { name: categoryName, range: 0 };
  currentCategories.push(newCategory);

  await AsyncStorage.setItem('expenseCategories', JSON.stringify(currentCategories));
};

export const getAllExpenseCategories = async (): Promise<Category[]> => {
  try {
    const currentCategoriesJson = await AsyncStorage.getItem('expenseCategories');

    if (currentCategoriesJson == null) {
      return [];
    } else {
      return JSON.parse(currentCategoriesJson);
    }
  } catch (error) {
    console.log('Error getting categories: ', error);

    return [];
  }
};

export const deleteExpenseCategory = async (categoryName: string): Promise<void> => {
  try {
    const currentCategoriesJson = await AsyncStorage.getItem('expenseCategories');
    let currentCategories: Category[];

    if (currentCategoriesJson == null) {
      console.log('There are no categories to delete');
      return;
    } else {
      currentCategories = JSON.parse(currentCategoriesJson);
    }

    if (!currentCategories.find((category) => category.name === categoryName)) {
      console.log('This category does not exist');
      return;
    }

    const updatedCategories = currentCategories.filter((category) => category.name !== categoryName);

    await AsyncStorage.setItem('expenseCategories', JSON.stringify(updatedCategories));
  } catch (error) {
    console.log('Error deleting category: ', error);
  }
};
