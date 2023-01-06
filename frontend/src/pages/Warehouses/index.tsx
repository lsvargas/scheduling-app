import { useFetchWarehouses } from "../../hooks/warehouses";
import { Link } from "react-router-dom";
import Spinner from "../../components/Spinner";

function Warehouses() {
  const { warehouses, loading } = useFetchWarehouses();

  if (loading) return <Spinner />

  return (
    <div className="flex flex-col items-center h-screen p-8">
      <h1 className="text-lg font-bold my-8">List of Warehouses</h1>

      <div>
        {warehouses?.map(({ id, name }, index) => (
            <Link to={`/warehouses/${id}/bookings`} key={index}>
              <div className="mb-4 py-4 px-12 border border-[#5559e1] rounded hover:cursor-pointer hover:bg-[#5559e1] hover:text-white" key={id}>
                {name}
              </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Warehouses;
