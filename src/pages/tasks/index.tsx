import { useEffect, useState } from "react";
import { useDeleteTaskMutation } from "../../apis/tasks";
import { Pagination } from "rsuite";
import { useDebounce } from "use-debounce";
import DeleteConfirmationModal from "../../common/deleteConfirmationModal";
import UsersTable from "../../components/tasks";
import LoadingTableSkeleton from "../../common/tableSkelteon";
import SearchTableButton from "../../common/searchTableButton";
import { toast } from "react-hot-toast";
import "rsuite/dist/rsuite.css";
import Button from "../../common/button";
import { useNavigate } from "react-router-dom";
import { useTasksQuery } from '../../apis/tasks/index';

const Tasks = () => {
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [search, setSearch] = useState<string>("");
  const [showModal, setShowModal] = useState<boolean>(false);
  const [totalDocs, setTotalDocs] = useState<number>(0);
  const [searchParam] = useDebounce(search, 300);
  const [itemIdToDelete, setItemIdToDelete] = useState<string | null>(null);

  const { data: tasks, isLoading } = useTasksQuery(
    page,
    limit,
    searchParam
  );
  const { mutate: deleteUser, isPending: isLoadingDeletingUser } =
    useDeleteTaskMutation();

  const navigate = useNavigate();

  useEffect(() => {
    if (tasks?.totalDocs !== undefined) setTotalDocs(tasks.totalDocs);
  }, [tasks]);

  const handleInputChange = (value: string) => setSearch(value);

  const getSequentialNumber = (index: number) => {
    return (page - 1) * limit + index + 1;
  };

  const handleEdit = (id: string) => {
    navigate(`/task/edit/${id}`);
  };

  const handleDelete = (id: string) => {
    setItemIdToDelete(id);
    setShowModal(true);
  };

  const confirmDelete = (id: string) => {
    deleteUser(id, {
      onSuccess: () => {
        toast.success("Task Deleted!");
        setShowModal(false);
      },
      onError: (error) => {
        toast.error("Error while deleting Task!");
      },
    });
  };

  const closeModal = () => setShowModal(false);

  const handleChangeLimit = (dataKey: any) => {
    setPage(1);
    setLimit(dataKey);
  };
  

  return (
    <>
      <p className="text-[25px] font-semibold mb-6">Tasks</p>
      <div className="pb-6 w-full flex flex-wrap gap-3 justify-between">
        <SearchTableButton
          placeholder="Search through title or status"
          onChange={handleInputChange}
          className="w-full max-w-md"
        />
        <Button
          type="button"
          className="px-6"
          onClick={() => navigate("/task/add")}
        >
          + Add
        </Button>
      </div>
      {isLoading ? (
        <LoadingTableSkeleton rowCount={5} columnCount={6} />
      ) : (
        <>
          <div className="bg-white shadow-md py-5">
            <UsersTable
              data={tasks || []}
              onEdit={handleEdit}
              onDelete={handleDelete}
              getSequentialNumber={getSequentialNumber}
            />
          </div>
        </>
      )}

      <div style={{ padding: 20 }} className="flex justify-end">
        <Pagination
          prev
          next
          first
          last
          ellipsis
          boundaryLinks
          maxButtons={5}
          className={`${
            window.innerWidth >= 768 ? "pagination-md" : "pagination-sm"
          }`}
          layout={window.innerWidth >= 768 ? ["limit", "pager", "skip"] : ["pager"]}
          total={totalDocs || 0}
          limitOptions={[10, 30, 50]}
          limit={limit}
          activePage={page}
          onChangePage={setPage}
          onChangeLimit={handleChangeLimit}
        />
      </div>

      <DeleteConfirmationModal
        message={"Are you sure you want to delete this Task?"}
        showModal={showModal}
        onClose={closeModal}
        onConfirm={confirmDelete}
        itemId={itemIdToDelete}
        isLoading={isLoadingDeletingUser}
      />
    </>
  );
};

export default Tasks;
