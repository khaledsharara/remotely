interface Submissions {
  Headline: string;
  DueDate: string;
  instructorName?: string;
  gradeLetter?: string;
  grade?: string;
  type?: string;
}

function SubmissionCard({
  Headline,
  DueDate,
  instructorName,
  gradeLetter,
  grade,
  type,
}: Submissions) {
  if (type === "Submission") {
    return (
      <div className="flex flex-row justify-between py-4  border-black border-b-[1px]">
        <div>
          <h1 className="text-xl">{Headline}</h1>
          <div className="flex flex-row gap-4">
            {instructorName && (
              <h1 className="self-end">Uploaded by {instructorName}</h1>
            )}
          </div>
        </div>
        <div className="flex flex-row gap-4">
          {gradeLetter && (
            <div className="rounded-xl bg-primary py-1 px-3 text-2xl text-white self-end my-4">
              <h1 className=" self-center text-end"> {gradeLetter}</h1>
            </div>
          )}
          <div>
            <h1 className="text-lg font-medium text-primary w-full">
              {DueDate}
            </h1>
            <div className="text-xl text-end">{grade}</div>
          </div>
        </div>
      </div>
    );
  }
  if (type === "Activity") {
    return (
      <div className="flex flex-row justify-between py-4  border-black border-b-[1px]">
        <div>
          <h1 className="text-xl">{Headline}</h1>
          <div className="flex flex-row gap-4"></div>
        </div>
        <div className="flex flex-row gap-4">
          <div>
            <h1 className="text-lg font-medium text-primary w-full">
              Due Date
            </h1>
            <div className="text-xl text-end">{DueDate}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default SubmissionCard;
