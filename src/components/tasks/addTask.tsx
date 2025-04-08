import { useForm } from "react-hook-form";
import Input from "../../common/input";
import Button from "../../common/button";
import InputValidationError from "../../common/inputValidationError";
import CancelButton from "../../common/cancelButton";
import { useNavigate } from "react-router-dom";
import Dropdown from "../../common/dropdown";
import { TaskFormData } from "../../types/tasks";
import toast from "react-hot-toast";
import { useAddTaskMutation } from "../../apis/tasks";


const AddTask = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<TaskFormData>();
  const { mutate: addTask, isPending } = useAddTaskMutation();
  const navigate = useNavigate();

  const onSubmit = (data: TaskFormData) => {
    addTask(data, {
      onSuccess: () => {
        navigate(-1);
        toast.success("Task added successfully")
      },
      onError: (error) => {
        toast.error("Error adding task!");
      }
    });
  };

  return (
    <div className="sm:p-0 md:p-6 lg:p-6">
      <h1 className="text-xl font-medium mb-6">Add Task</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="w-full">
        <div className="w-full">
          <Input<TaskFormData>
            name="title"
            label="Title"
            type="text"
            autoFocus={true}
            placeholder="Enter task title"
            register={register}
            validation={{ required: "Title is required." }}
          />
          <InputValidationError message={errors.title?.message} />
        </div>

        <div className="w-full mt-4">
          <label className="block mb-1 text-sm font-semibold text-gray-700">Description</label>
          <textarea
            {...register("description", { required: "Description is required." })}
            rows={4}
            className="w-full border rounded-md px-3 py-2"
            placeholder="Enter task description"
          />
          <InputValidationError message={errors.description?.message} />
        </div>

      

        <div className="mt-4 flex justify-end gap-3">
          <CancelButton onClick={() => navigate(-1)}>Cancel</CancelButton>
          <Button
            type="submit"
            className=""
            isLoading={isPending}
          >
            Add Task
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddTask;