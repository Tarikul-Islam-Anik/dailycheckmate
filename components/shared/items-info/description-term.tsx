const DescriptionTerm = ({ term }: { term: string }) => {
  return (
    <dt className="text-sm font-medium leading-6 capitalize text-gray-900">
      {term === "createdAt"
        ? "Created at"
        : term === "reminderTime"
        ? "Reminder time"
        : term}
    </dt>
  );
};

export default DescriptionTerm;
