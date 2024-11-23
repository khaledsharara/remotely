interface Submissions {
  Headline: string;
  DueDate: string;
  instructorName?: string;
}

function SubmissionCard({ Headline, DueDate, instructorName }: Submissions) {
  return (
    <div className="flex flex-row justify-between py-4 px-4  border-black border-b-[1px]">
      <div>
        <h1 className="text-xl">{Headline}</h1>
        <div className="flex flex-row gap-4"></div>
      </div>
      <div className="flex flex-row gap-4">
        <div>
          <h1 className="text-lg font-medium text-primary w-full">Due Date</h1>
          <div className="text-xl text-end">{DueDate}</div>
        </div>
      </div>
    </div>
  );
}

export default SubmissionCard;
