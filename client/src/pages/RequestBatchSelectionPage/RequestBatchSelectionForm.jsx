const RequestBatchSelectionForm = () => {
  return (
    <form class="max-w-sm mx-auto">
      <label for="batch" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Choose the Request Batch you want to access:</label>
      <select id="batch" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
        <option selected>2024 Spring</option>
        <option value="US">2023 Fall</option>
        <option value="CA">2023 Summer</option>
        <option value="FR">2023 Spring</option>
        <option value="DE">2022 Fall</option>
      </select>
    </form>
  );
};

export default RequestBatchSelectionForm;