import { useParams } from "react-router-dom";
import Checklist from "../../../Manager/Dashboard/components/Checklist";

const data = [
  {
    primaryKey: "1",
    activityType: "Done",
    instructorName: "Freddie",
    headline: "Midterm Exam",
    subheadline: "Covers Chapters 1-5",
    description:
      "Prepare for the midterm exam that includes multiple-choice and short answer questions on fundamental concepts. Ensure you're comfortable with key theories and practices.",
    dueDate: "2023-10-15",
  },
  {
    primaryKey: "2",
    activityType: "ToDo",
    instructorName: "Joe",
    headline: "Lecture Notes: Week 3",
    subheadline: "Introduction to Machine Learning",
    description:
      "Download the lecture notes on machine learning basics, including algorithms and model evaluation techniques. Essential reading before attempting the assignment.",
    dueDate: "2023-09-22",
  },
  {
    primaryKey: "3",
    activityType: "Quiz",
    instructorName: "Velma",
    headline: "Weekly Quiz #4",
    subheadline: "Topics from Chapter 4",
    description:
      "This quiz will test your understanding of the key ideas presented in Chapter 4. It consists of 10 multiple-choice questions. Make sure to review your notes beforehand.",
    dueDate: "2023-09-28",
  },
  {
    primaryKey: "4",
    activityType: "Homework",
    instructorName: "Khaled",
    headline: "Assignment 2",
    subheadline: "Data Analysis with Python",
    description:
      "Complete the exercises on data analysis using Python libraries such as pandas and NumPy. Submit your Jupyter notebooks via the portal before the deadline.",
    dueDate: "2023-10-05",
  },
  {
    primaryKey: "5",
    activityType: "Announcement",
    instructorName: "Freddie",
    headline: "Class Cancelled",
    subheadline: "Lecture moved online",
    description:
      "Due to unforeseen circumstances, today's lecture will be held online. Please check your emails for the Zoom link and additional instructions.",
    dueDate: "2023-09-15",
  },
  {
    primaryKey: "6",
    activityType: "Material",
    instructorName: "Joe",
    headline: "Project Guidelines",
    subheadline: "Final Project Requirements",
    description:
      "Refer to this document for the final project guidelines, including expectations, milestones, and submission details. Start planning your project early.",
    dueDate: "2023-11-01",
  },
  {
    primaryKey: "7",
    activityType: "Quiz",
    instructorName: "Velma",
    headline: "Practice Quiz",
    subheadline: "Mock Questions for Exam Prep",
    description:
      "A practice quiz designed to help you prepare for the upcoming final exam. Includes a mix of conceptual and application-based questions.",
    dueDate: "2023-10-18",
  },
  {
    primaryKey: "8",
    activityType: "Homework",
    instructorName: "Khaled",
    headline: "Homework 5",
    subheadline: "Advanced Algorithms",
    description:
      "Solve the provided problems related to advanced algorithmic techniques. Make sure to document your solutions and include explanations for each step.",
    dueDate: "2023-10-10",
  },
  {
    primaryKey: "9",
    activityType: "Announcement",
    instructorName: "Freddie",
    headline: "Grade Submission Deadline",
    subheadline: "Final Grades",
    description:
      "All final grades will be submitted by December 20th. If you have any questions or concerns regarding your grades, reach out before this date.",
    dueDate: "2023-12-20",
  },
  {
    primaryKey: "10",
    activityType: "Material",
    instructorName: "Joe",
    headline: "Supplementary Reading",
    subheadline: "Chapter 6 Reference Material",
    description:
      "This is supplementary reading material to help you further understand the topics discussed in Chapter 6. It's optional but recommended for deeper understanding.",
    dueDate: "2023-10-01",
  },
  {
    primaryKey: "11",
    activityType: "Quiz",
    instructorName: "Velma",
    headline: "Pop Quiz",
    subheadline: "Surprise!",
    description:
      "A short pop quiz to test your recall on last week's lecture. It will be ungraded but participation is encouraged to track your own progress.",
    dueDate: "2023-09-25",
  },
];

function TaskPage() {
  const { id } = useParams();
  const activity = data.find((item) => item.primaryKey === id);
  const activityType = activity?.activityType;
  const activityClass: { [key: string]: string } | string =
    {
      done: "bg-gradient-to-r from-card-from to-card-homework",
      todo: "bg-gradient-to-r from-card-from to-card-quiz",
    }[activityType?.toLowerCase() as string] || "";
  function formatDueDate(dueDate: string | undefined) {
    if (!dueDate) return "";
    const date = new Date(Date.parse(dueDate));
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // getMonth() is 0-indexed, so add 1
    const day = date.getDate().toString().padStart(2, "0");
    return `${day}.${month}`;
  }

  return (
    <div className="mx-8 space-y-4 px-3">
      {/* PRETTY BIG BOX */}
      <div className={`w-full rounded-2xl py-7 px-9 ${activityClass}`}>
        <div className="flex flex-row justify-between">
          <div className="font-medium text-4xl">{activity?.headline}</div>
          <span className="bg-black text-base h-fit opacity-50 text-white rounded-full px-4 items-center">
            {activityType}
          </span>
        </div>
        <div className="flex flex-row justify-between">
          <div>
            <div className="font-light text-4xl my-2">
              {activity?.subheadline}
            </div>
            <div className="font-light text-base my-5 text-wrap">
              {activity?.description}
            </div>
          </div>
          <div className="flex flex-col items-end self-center">
            <span className="text-center text-3xl font-medium">
              DUE:
              <br />
              {formatDueDate(activity?.dueDate)}
            </span>
          </div>
        </div>
      </div>
      {/* Checklist */}
      <div className="w-full">
        <Checklist />
      </div>
    </div>
  );
}

export default TaskPage;
