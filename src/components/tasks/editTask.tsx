import { useForm } from "react-hook-form";
import Input from "../../common/input";
import Button from "../../common/button";
import InputValidationError from "../../common/inputValidationError";
import CancelButton from "../../common/cancelButton";
import { useNavigate, useParams } from "react-router-dom";
import Dropdown from "../../common/dropdown";
import { UpdateTaskFormData } from "../../types/tasks";
import toast from "react-hot-toast";
import { useEditTaskMutation, useGetTaskByIdQuery } from "../../apis/tasks";
import { useEffect } from "react";
import LoadingTableSkeleton from "../../common/tableSkelteon";

const EditTask = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const { data: task, isLoading } = useGetTaskByIdQuery(id!);
  const { mutate: editTask, isPending } = useEditTaskMutation();
  
  const { register, handleSubmit, formState: { errors }, reset } = useForm<UpdateTaskFormData>();

  useEffect(() => {
    if (task) reset(task);
  }, [task, reset]);

  const onSubmit = (data: UpdateTaskFormData) => {
    editTask({ id: id!, ...data }, {
      onSuccess: () => {
        navigate(-1);
        toast.success("Task updated successfully");
      },
      onError: (error) => {
        toast.error("Error updating task!");
      }
    });
  };

  if (isLoading)
    return (
      <div className="animate-pulse">
        <div className="h-8 w-48 bg-gray-200 rounded mb-6"></div>
        
        <div className="space-y-6">
          <div>
            <div className="h-5 w-20 bg-gray-200 rounded mb-2"></div>
            <div className="h-10 bg-gray-200 rounded"></div>
          </div>

          <div>
            <div className="h-5 w-24 bg-gray-200 rounded mb-2"></div>
            <div className="h-32 bg-gray-200 rounded"></div>
          </div>

          <div>
            <div className="h-5 w-16 bg-gray-200 rounded mb-2"></div>
            <div className="h-10 bg-gray-200 rounded"></div>
          </div>

          <div className="flex justify-end gap-3">
            <div className="h-10 w-20 bg-gray-200 rounded"></div>
            <div className="h-10 w-28 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );

  return (
    <div className="sm:p-0 md:p-6 lg:p-6">
      <h1 className="text-xl font-medium mb-6">Edit Task</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="w-full">
        <div className="w-full">
          <Input<UpdateTaskFormData>
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

        <div className="w-full mt-4">
          <Dropdown<UpdateTaskFormData>
            name="status"
            label="Status"
            options={[
              { value: "pending", label: "Pending" },
              { value: "complete", label: "Complete" }
            ]}
            register={register}
            validation={{ required: "Status is required." }}
            placeholder="Select Status"
          />
          <InputValidationError message={errors.status?.message} />
        </div>

        <div className="mt-4 flex justify-end gap-3">
          <CancelButton onClick={() => navigate(-1)}>Cancel</CancelButton>
          <Button
            type="submit"
            className=""
            isLoading={isPending}
          >
            Update Task
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EditTask;