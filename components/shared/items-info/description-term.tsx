const DescriptionTerm = ({ term }: { term: string }) => {
  return (
    <dt className='text-sm font-medium capitalize leading-6'>
      {term === 'createdAt'
        ? 'Created at'
        : term === 'reminderTime'
        ? 'Reminder time'
        : term}
    </dt>
  );
};

export default DescriptionTerm;
