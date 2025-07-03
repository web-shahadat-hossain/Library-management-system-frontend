function Card() {
  return (
    <div className="max-w-sm w-full bg-white rounded-xl shadow-md p-4 space-y-3 border">
      <div className="flex justify-between items-start">
        <h2 className="text-lg font-semibold">To Kill a Mockingbird</h2>
        <span className="bg-green-100 text-green-800 text-sm px-2 py-0.5 rounded-full">
          2 available
        </span>
      </div>

      <p className="text-sm text-gray-600">by Harper Lee</p>
      <p className="text-sm text-gray-500">ISBN: 978-0446310789</p>
      <p className="text-sm text-gray-500">Published: 1960</p>

      <p className="text-sm text-gray-700">
        A novel about racial inequality and moral growth in the American South.
      </p>

      <hr className="my-2" />

      <div className="flex justify-between items-center">
        <div className="flex space-x-2">
          <button className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition">
            Edit
          </button>
          <button className="px-3 py-1 text-sm bg-red-100 text-red-700 rounded hover:bg-red-200 transition">
            Delete
          </button>
        </div>
        <button className="px-4 py-1.5 text-sm bg-indigo-700 text-white rounded hover:bg-indigo-700 transition">
          Borrow
        </button>
      </div>
    </div>
  );
}

export default Card;
