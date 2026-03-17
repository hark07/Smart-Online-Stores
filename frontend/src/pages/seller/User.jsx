import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useAppContext } from "../../context/AppContext";

const User = () => {
  const { axios } = useAppContext();
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const { data } = await axios.get("/api/user/alluser", {
        withCredentials: true,
      });

      if (data.success) {
        setUsers(data.users);
      }
    } catch (error) {
      console.log("Fetch error:", error.message);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (userId) => {
    try {
      const { data } = await axios.delete(`/api/user/${userId}`, {
        withCredentials: true,
      });

      if (data.success) {
        toast.success("User deleted successfully");
        // Remove user from frontend list
        setUsers(users.filter((user) => user._id !== userId));
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log("Delete error:", error.message);
      toast.error("Something went wrong!");
    }
  };

  return (
    <div className="p-5 w-full">
      <div className="bg-white p-6 rounded-lg shadow mt-6">
        <h2 className="text-lg font-semibold mb-4">User List</h2>

        <div className="overflow-x-auto">
          <table className="w-full border">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2 border">ID</th>
                <th className="p-2 border">User ID</th>
                <th className="p-2 border">Name</th>
                <th className="p-2 border">Email</th>
                <th className="p-2 border">Password</th>
                <th className="p-2 border">Delete</th>
              </tr>
            </thead>

            <tbody>
              {users.map((user, index) => (
                <tr key={user._id} className="text-center">
                  <td className="p-2 border">{index + 1}</td>
                  <td className="p-2 border">{user._id}</td>
                  <td className="p-2 border">{user.name}</td>
                  <td className="p-2 border">{user.email}</td>
                  <td className="p-2 border text-primary">{user.password}</td>
                  <td className="p-2 border">
                    <button
                      className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                      onClick={() => handleDelete(user._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}

              {users.length === 0 && (
                <tr>
                  <td colSpan="6" className="text-center p-4 text-gray-500">
                    No users found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default User;
