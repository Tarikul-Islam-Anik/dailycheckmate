const ReminderLinks = ({ links }: { links: string[] }) => {
  return links ? (
    <ul className="list-disc list-inside marker:text-blue-500">
      {links.map((link: string) => (
        <li key={link} className="list-item line-clamp-1">
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="-mt-2 text-gray-600 hover:text-gray-500"
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
