import { format } from 'date-fns';
import ReminderLinks from './reminder-links';
const DescriptionDetails = ({
  term,
  details,
}: {
  term: string;
  details: string | string[];
}) => {
  return (
    <dd className='mt-1 text-sm leading-6 text-muted-foreground sm:col-span-2 sm:mt-0'>
      {term.endsWith('At') || term === 'schedule' || term === 'reminderTime' ? (
        format(new Date(details as string), 'EEEE dd, MMM yyyy')
      ) : term === 'links' ? (
        <ReminderLinks links={details as string[]} />
      ) : (
        details
      )}
      {details === '' ? 'No description' : ''}
    </dd>
  );
};

export default DescriptionDetails;
