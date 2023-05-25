import AsyncStorage from '@react-native-async-storage/async-storage';

const CATEGORY_LIMIT = 20;

export type Category = {
  name: string;
  range: number;
};

export const createExpenseCategory = async (categoryName: string): Promise<void> => {
  // const clearAll = async () => {
  //   try {
  //     await AsyncStorage.clear();
  //   } catch (e) {
  //     // clear error
  //   }

  //   console.log('Done.');
  // };
  // await clearAll();
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

    let categories = currentCategoriesJson == null ? [] : JSON.parse(currentCategoriesJson);

    if (!categories.find((category) => category.name === 'Any')) {
      categories.unshift({ name: 'Any', range: 0 }); // adds 'Any' category at the start
    }

    return categories;
  } catch (error) {
    throw new Error('Error getting categories');
  }
};

export const deleteExpenseCategory = async (categoryName: string): Promise<void> => {
  try {
    if (categoryName === 'Any') {
      throw new Error("The 'Any' category cannot be deleted");
    }

    const currentCategoriesJson = await AsyncStorage.getItem('expenseCategories');
    let currentCategories: Category[];

    if (currentCategoriesJson == null) {
      throw new Error('There are no categories to delete');
    } else {
      currentCategories = JSON.parse(currentCategoriesJson);
    }

    if (!currentCategories.find((category) => category.name === categoryName)) {
      throw new Error('This category does not exist');
    }

    const updatedCategories = currentCategories.filter((category) => category.name !== categoryName);

    await AsyncStorage.setItem('expenseCategories', JSON.stringify(updatedCategories));
  } catch (error) {
    throw new Error('Error deleting category');
  }
};

export const createIncomeCategory = async (categoryName: string): Promise<void> => {
  const currentCategoriesJson = await AsyncStorage.getItem('incomeCategories');
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

  await AsyncStorage.setItem('incomeCategories', JSON.stringify(currentCategories));
};

export const getAllIncomeCategories = async (): Promise<Category[]> => {
  try {
    const currentCategoriesJson = await AsyncStorage.getItem('incomeCategories');

    let categories = currentCategoriesJson == null ? [] : JSON.parse(currentCategoriesJson);

    if (!categories.find((category) => category.name === 'Any')) {
      categories.unshift({ name: 'Any', range: 0 }); // adds 'Any' category at the start
    }

    return categories;
  } catch (error) {
    throw new Error('Error getting categories');
  }
};

export const deleteIncomeCategory = async (categoryName: string): Promise<void> => {
  try {
    if (categoryName === 'Any') {
      throw new Error("The 'Any' category cannot be deleted");
    }

    const currentCategoriesJson = await AsyncStorage.getItem('incomeCategories');
    let currentCategories: Category[];

    if (currentCategoriesJson == null) {
      throw new Error('There are no categories to delete');
    } else {
      currentCategories = JSON.parse(currentCategoriesJson);
    }

    if (!currentCategories.find((category) => category.name === categoryName)) {
      throw new Error('This category does not exist');
    }

    const updatedCategories = currentCategories.filter((category) => category.name !== categoryName);

    await AsyncStorage.setItem('incomeCategories', JSON.stringify(updatedCategories));
  } catch (error) {
    throw new Error('Error deleting category');
  }
};
