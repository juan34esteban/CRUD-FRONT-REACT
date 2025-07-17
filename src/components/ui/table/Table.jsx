import { useMemo } from "react";
import PropTypes from "prop-types";
import { Table as BsTable, Container } from "react-bootstrap";
import "./Table.scss";
import { Pagination } from "../pagination";

const Table = ({
  count = 0,
  data = [],
  columns = [],
  navigationBar,
  pagination = false,
  showInfoPagination = false,
  showItemsPagination = false,
  take = 10,
  setTake,
  emptyText = "No hay datos",
  currentPage = 1,
  setCurrentPage,
}) => {
  const head = useMemo(() => {
    return columns.map((column) => <th key={column.key}>{column.header}</th>);
  }, [columns]);

  const body = useMemo(() => {
    return data.map((row, index) => {
      return (
        <tr key={index}>
          {columns.map((column) => {
            return <td key={column.key}>{column.render(row, index)}</td>;
          })}
        </tr>
      );
    });
  });

  const pages = useMemo(() => {
    if (!pagination) {
      return null;
    }

    return (
      <Container className="mb-table-pagination">
        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          take={take}
          setTake={setTake}
          max={count}
          showInfo={showInfoPagination}
          showItemsPage={showItemsPagination}
        />
      </Container>
    );
  }, [pagination, data]);

  return (
    <div className="mb-table-container">
      {navigationBar}
      <div className="mb-table-col">
        <BsTable className="table mb-table" responsive>
          <thead>
            <tr>{head}</tr>
          </thead>
          {data.length > 0 && <tbody>{body}</tbody>}
        </BsTable>
        {data.length === 0 && <div className="empty-table">{emptyText}</div>}
      </div>
      {pages}
    </div>
  );
};

Table.propTypes = {
  count: PropTypes.number,
  data: PropTypes.array,
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string,
      header: PropTypes.string,
      render: PropTypes.func,
    })
  ),
  pagination: PropTypes.bool,
  showInfoPagination: PropTypes.bool,
  showItemsPagination: PropTypes.bool,
  take: PropTypes.number,
  setTake: PropTypes.func,
  navigationBar: PropTypes.node,
  emptyText: PropTypes.string,
  currentPage: PropTypes.number,
  setCurrentPage: PropTypes.func,
};

export default Table;