import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  PlusOutlined,
} from "@ant-design/icons";

function Checklist() {
  return (
    <div className="flex flex-col w-[850px] ">
      {/* Checklist header */}
      <div className="flex self-start text-4xl  py-4 ">
        <span>Checklist</span>
      </div>

      {/* Checklist item */}
      <div className="flex flex-row  py-5 px-4 items-center justify-between border-b-[1px] border-black border-t-[1px]">
        <div className="text-2xl">
          <span>Activity</span>
        </div>
        <CheckCircleOutlined className="text-3xl text-green-500" />
      </div>
      <div className="flex flex-row  py-5 px-4 items-center justify-between border-b-[1px] border-black ">
        <div className="text-2xl">
          <span>Activity</span>
        </div>
        <CheckCircleOutlined className="text-3xl text-green-500" />
      </div>
      <div className="flex flex-row  py-5 px-4 items-center justify-between border-b-[1px] border-black ">
        <div className="text-2xl">
          <span>Activity</span>
        </div>
        <CloseCircleOutlined className="text-3xl text-red-500" />
      </div>
      <div className="flex flex-row  py-5 px-4 items-center justify-between      ">
        <div className="text-2xl">
          <span>Activity</span>
        </div>
        <CloseCircleOutlined className="text-3xl text-red-500" />
      </div>
      <div className="flex mt-9 self-end   ">
        <button
          type="button"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4  font-medium rounded-lg text-sm px-5 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none  "
        >
          <PlusOutlined className="mr-2" />
          Add Item
        </button>
      </div>
    </div>
  );
}

export default Checklist;
