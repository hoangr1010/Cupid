const OpeningSlotCard = (company, status) => {
  return (
    <a href="#" class="widget_container">
      <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        {company}
      </h5>
      <p class="font-normal text-gray-700 dark:text-gray-400">
        Status: {status}
      </p>
    </a>
  );
};

export default OpeningSlotCard;
