import ReactPaginate from "react-paginate";
import "../../style/pagination.css";

export default function PaginatedItems({ itemsPerPage, total, setPage }) {
  const pageCount = total / itemsPerPage;

  return (
    <>
      <ReactPaginate
        breakLabel="..."
        nextLabel=">>"
        onPageChange={(e) => setPage(e.selected + 1)}
        pageRangeDisplayed={2}
        pageCount={pageCount}
        previousLabel="<<"
        renderOnZeroPageCount={null}
        containerClassName="paginate d-flex align-items-center justify-content-center"
        pageClassName="paginate-page"
        activeClassName="active"
      />
    </>
  );
}
