const Paginate = (props) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(props.totalItems / props.itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className="flex justify-center mt-10">
      <ul className="flex gap-2">
        {pageNumbers.map((number) => {
          return (
            <li>
              <button
                onClick={() => props.pageSelected(number)}
                className={`  border-2 p-2 border-white ${
                  props.currentPage === number
                    ? "bg-white text-black"
                    : "text-white"
                }`}
              >
                {number}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Paginate;
