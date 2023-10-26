const ReminderLinks = ({ links }: { links: string[] }) => {
  return links ? (
    <ul className='list-inside list-disc marker:text-primary'>
      {links.map((link: string) => (
        <li key={link} className='line-clamp-1 list-item'>
          <a
            href={link}
            target='_blank'
            rel='noopener noreferrer'
            className='-mt-2 text-muted-foreground'
          >
            {link}
          </a>
        </li>
      ))}
    </ul>
  ) : (
    <p>No links</p>
  );
};

export default ReminderLinks;
