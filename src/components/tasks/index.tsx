import React from "react";
import { Table } from "rsuite";
import { UsersTableProps } from "../../types/tasks";

const { Column, HeaderCell, Cell } = Table;

const UsersTable: React.FC<UsersTableProps> = ({
  data,
  onEdit,
  onDelete,
  getSequentialNumber,
}) => {
  const isSmallScreen = window.innerWidth < 768;  

  return (
    <>
      <Table height={350} data={data.tasks}>
        <Column width={isSmallScreen ? 60 : 150} align="center" fixed>
          <HeaderCell className="font-bold">ID</HeaderCell>
          <Cell>{(_, index) => getSequentialNumber(index ?? 0)}</Cell>
        </Column>

        <Column width={isSmallScreen ? 100 : 180} fixed>
          <HeaderCell className="font-bold">Title</HeaderCell>
          <Cell dataKey="title" />
        </Column>

        <Column width={100} flexGrow={2}>
          <HeaderCell className="font-bold">Description</HeaderCell>
          <Cell dataKey="description" />
        </Column>

        <Column width={80} flexGrow={1}>
          <HeaderCell className="font-bold">Status</HeaderCell>
          <Cell>
            {(rowData) => (
              <span
                className={`px-2 py-1 rounded ${
                  rowData.status === 'complete' 
                    ? 'bg-green-100 text-green-800'
                    : 'bg-yellow-100 text-yellow-800'
                }`}
              >
                {rowData.status === 'complete' ? 'Complete' : 'Pending'}
              </span>
            )}
          </Cell>
        </Column>

        <Column width={150}>
          <HeaderCell className="font-bold">Actions</HeaderCell>
          <Cell>
            {(rowData) => (
              <div>
                <span
                  className="text-blue-600 font-bold cursor-pointer mr-1"
                  onClick={() => onEdit(rowData._id)}
                >
                  Edit
                </span>
                /
                <span
                  className="text-red-600 font-bold cursor-pointer ml-1"
                  onClick={() => onDelete(rowData._id)}
                >
                  Delete
                </span>
              </div>
            )}
          </Cell>
        </Column>
      </Table>
    </>
  );
};

export default UsersTable;
