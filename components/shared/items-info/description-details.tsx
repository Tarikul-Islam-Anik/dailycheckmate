import { format } from "date-fns";

const DescriptionDetails = ({
  term,
  details,
}: {
  term: string;
  details: string;
}) => {
  return (
    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
      {term.endsWith("At") || term === "deadline" || term === "reminderTime" ? (
        format(new Date(details), "EEEE dd, MMM yyyy")
      ) : term === "links" ? (
        <ul className="list-disc list-inside marker:text-blue-500">
          {details.split("\n").map((link) => (
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
        details
      )}
      {details === "" ? "No description" : ""}
    </dd>
  );
};

export default DescriptionDetails;
