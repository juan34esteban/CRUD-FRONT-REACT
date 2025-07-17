import React, { useCallback, useState, useEffect } from "react";
import { Pagination as BsPagination, Form } from "react-bootstrap";
import PropTypes from "prop-types";
import {
  ChevronRight,
  ChevronLeft,
  ChevronDoubleLeft,
  ChevronDoubleRight,
} from "react-bootstrap-icons";
import "./Pagination.scss";

export const Pagination = ({
  take = 10,
  setTake,
  max = 0,
  showPages = 5,
  currentPage = 1,
  setCurrentPage,
  showInfo = false,
  showItemsPage = false,
}) => {
  const [limitPages, setLimitPages] = useState(0);
  const [limitMorePage, setLimitMorePage] = useState(0);
  const [itemIni, setItemIni] = useState(0);
  const [itemEnd, setItemEnd] = useState(0);

  useEffect(() => {
    setLimitPages(Math.ceil(max / take));
    setLimitMorePage(Math.round(showPages / 2));

    if (max > 0) {
      setItemIni(take * (currentPage - 1) + 1);
      setItemEnd(take * (currentPage - 1) + take);

      if (take * (currentPage - 1) + take > max) {
        setItemEnd(max);
      }
    } else {
      setItemIni(0);
      setItemEnd(0);
    }
  }, [take, max, currentPage]);

  const range = useCallback((start, end) => {
    try {
      return new Array(end - start + 1)
        .fill(undefined)
        .map((_, k) => k + start);
    } catch (error) {
      return new Array(0).fill(undefined).map((_, k) => k + start);
    }
  }, []);

  const pages = () => {
    const showPages1 =
      max >= take * showPages ? showPages : Math.ceil(max / take);

    if (currentPage <= limitMorePage) return range(1, showPages1);
    if (currentPage > limitPages - limitMorePage)
      return range(limitPages - showPages1 + 1, limitPages);
    const gap = showPages1 - limitMorePage;
    const parGap = showPages1 % 2 === 0 ? 1 : 0;
    return range(currentPage - gap + parGap, currentPage + gap);
  };

  const onFirst = () => setCurrentPage(1);
  const onPrev = () => setCurrentPage(currentPage - 1);
  const onNext = () => setCurrentPage(currentPage + 1);
  const onLast = () => setCurrentPage(limitPages);

  const handleOnChange = useCallback((event) => {
    setTake(+event.target.value);
  });

  return (
    <BsPagination className="mb-pagination">
      {showItemsPage && (
        <>
          <span className="pt-1">Registros por página: </span>
          <Form.Control
            as={"select"}
            className={"mb-form-control"}
            type={"select"}
            onChange={handleOnChange}
          >
            {max > 0 && (
              <>
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="25">25</option>
                <option value="50">50</option>
                <option value="100">100</option>
              </>
            )}
          </Form.Control>
        </>
      )}
      {/* {showInfo && <span className="pt-1">Página&nbsp;</span>} */}
      <BsPagination.First onClick={onFirst} disabled={currentPage === 1}>
        <ChevronDoubleLeft />
      </BsPagination.First>
      <BsPagination.Prev onClick={onPrev} disabled={currentPage === 1}>
        <ChevronLeft />
      </BsPagination.Prev>
      {pages().map((index) => (
        <BsPagination.Item
          key={`pagination-item-${index}`}
          active={index === currentPage}
          onClick={() => {
            setCurrentPage(index);
          }}
        >
          {index}
        </BsPagination.Item>
      ))}
      <BsPagination.Next onClick={onNext} disabled={currentPage === limitPages}>
        <ChevronRight />
      </BsPagination.Next>
      <BsPagination.Last onClick={onLast} disabled={currentPage === limitPages}>
        <ChevronDoubleRight />
      </BsPagination.Last>
      {showInfo && (
        <span className="pt-1">
          {/* de {limitPages} páginas,*/} &nbsp;{itemIni} - {itemEnd} de {max}{" "}
          registros
        </span>
      )}
    </BsPagination>
  );
};

Pagination.propTypes = {
  take: PropTypes.number,
  setTake: PropTypes.func,
  showPages: PropTypes.number,
  max: PropTypes.number,
  currentPage: PropTypes.number,
  setCurrentPage: PropTypes.func,
  showInfo: PropTypes.bool,
  showItemsPage: PropTypes.bool,
};