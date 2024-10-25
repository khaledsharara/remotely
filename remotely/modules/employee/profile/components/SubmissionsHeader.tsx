import { useState } from 'react';

type CheckedValues = {
  [key: string]: boolean; // Define that the keys are strings and values are booleans
};

function SubmissionsHeader() {
  const [filters] = useState<string[]>(['Announcements', 'Homework', 'Material', 'Quizzes']);
  const [subHeadlines] = useState<string[]>(['Projects', 'Exams', 'Lectures', 'Assignments']);
  const [checkedValues, setCheckedValues] = useState<CheckedValues>({}); // Use the defined type

  // Handle checkbox change
  const handleCheckboxChange = (subject: string) => {
    setCheckedValues((prevCheckedValues) => ({
      ...prevCheckedValues,
      [subject]: !prevCheckedValues[subject],
    }));
  };

  return (
    <div className="w-full">
      <div className="flex flex-row justify-normal w-full text-xl self-start border-b-[1px] border-black pb-4">
        <h1 className="justify-self-start self-end font-l mx-4">Submissions</h1>
        {/* Searchbar */}
        <div className="justify-self-end relative text-gray-600 w-1/4 mx-4">
          <input
            type="search"
            name="search"
            placeholder="Search..."
            className="w-full bg-transparent px-5 pr-10 rounded-full text-sm border-2 border-solid border-black focus:border-black focus:ring-0 focus:outline-none"
          />
          <button type="submit" className="absolute right-0 top-0 mt-4 mr-4">
            <svg
              className="h-4 w-4 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              version="1.1"
              id="Capa_1"
              x="0px"
              y="0px"
              viewBox="0 0 56.966 56.966"
              width="512px"
              height="512px"
            >
              <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
            </svg>
          </button>
        </div>
        {/* Filter Dropdown */}
        <div className="justify-self-end group inline-block w-1/4 mx-4 relative">
          <button className="items-center w-full rounded-full px-4 py-2 bg-button outline-none focus:outline-none transition-all duration-150 ease-in-out group-hover:rounded-b-none group-hover:rounded-t-2xl">
            <div className="flex flex-row justify-between">
              <span className="pr-1 text-sm">Filter By</span>
              <span className="self-end">
                <svg
                  className="fill-current h-4 w-4 transform group-hover:-rotate-180 transition duration-150 ease-in-out"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </span>
            </div>
          </button>

          <ul className="bg-button py-2 transform scale-0 group-hover:scale-100 absolute w-full transition-all duration-150 ease-in-out origin-top rounded-b-2xl group-hover:rounded-t-none">
            <hr className="h-[1.5px] bg-black border-0 mx-3 my-1" />
            {filters.map((subject, index) => (
              <li key={index} className="flex flex-row justify-between">
                <span className="px-4 py-1 text-sm">{subject}</span>
                <div className="checkbox-wrapper-19 mr-3">
                  <input
                    type="checkbox"
                    id={`cb-filters-${index}`}
                    checked={!!checkedValues[subject]}
                    onChange={() => handleCheckboxChange(subject)}
                  />
                  <label htmlFor={`cb-filters-${index}`} className="check-box" />
                </div>
              </li>
            ))}
            <hr className="h-[1.5px] bg-black border-0 mx-3 mb-1 my-1" />
            {subHeadlines.map((subject, index) => (
              <li key={index} className="flex flex-row justify-between">
                <span className="px-4 py-1 text-sm">{subject}</span>
                <div className="checkbox-wrapper-19 mr-3">
                  <input
                    type="checkbox"
                    id={`cb-sh-${index}`}
                    checked={!!checkedValues[subject]}
                    onChange={() => handleCheckboxChange(subject)}
                  />
                  <label htmlFor={`cb-sh-${index}`} className="check-box" />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default SubmissionsHeader;
