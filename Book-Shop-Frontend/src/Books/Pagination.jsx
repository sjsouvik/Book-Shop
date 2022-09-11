import ReactPaginate from "react-paginate";
import "./Pagination.css";

const Pagination = (props) => {
  const { forcePage, totalPages, handlePageClick, containerStyle } = props;

  return (
    <>
      {totalPages > 1 && (
        <div className="flex-row">
          <div
            className={`paginate-container ${containerStyle || ""}`}
            data-testid="paginate-container"
          >
            <ReactPaginate
              previousLabel={"<"}
              nextLabel={">"}
              breakLabel="..."
              forcePage={forcePage}
              pageCount={totalPages || 0}
              marginPagesDisplayed={1}
              pageRangeDisplayed={5}
              onPageChange={handlePageClick}
              containerClassName="pagination"
              pageClassName="page-item"
              pageLinkClassName="page-link"
              previousClassName="page-item"
              previousLinkClassName="page-link"
              nextClassName="page-item"
              nextLinkClassName="page-link"
              breakClassName="page-item"
              breakLinkClassName="page-link"
              activeClassName="active"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Pagination;
