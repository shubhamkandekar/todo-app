import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../constants/config";

const Todo = () => {
  const [user, setUser] = useState(null);
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [editingTodoId, setEditingTodoId] = useState(null);
  const [Loading, setLoading] = useState("");
  const navigate = useNavigate();

  // Middleware function for authorization
  const isAuthorised = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) navigate("/login");
      const { data: response } = await axios.get(BASE_URL+
        `/api/auth/validateToken/${token}`
      );
      setUser(response.data);
      fetchTodos();
    } catch (error) {
      localStorage.removeItem("token");
      navigate("/login");
    }
  };

  // Fetch all todos
  const fetchTodos = async () => {
    try {
      const { data } = await axios.get( BASE_URL+"/api/todos", {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
      setTodos(data.data);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  // Create a new todo
  const createTodo = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.post(
        BASE_URL+"/api/todos",
        { title: newTodo },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      setTodos([...todos, data.data]);
      setNewTodo("");
    } catch (error) {
      console.error("Error creating todo:", error);
    } finally {
      setLoading(false);
    }
  };

  // Update a todo
  const updateTodo = async (id, title) => {
    try {
      if (id === editingTodoId) {
        // Save the edited todo
        await axios.patch(BASE_URL+
          `/api/todos/${id}`,
          { title },
          {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          }
        );
      }
      setEditingTodoId(id === editingTodoId ? null : id);
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  // Delete a todo
  const deleteTodo = async (id) => {
    try {
      await axios.delete(BASE_URL+`/api/todos/${id}`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
      const updatedTodos = todos.filter((todo) => todo._id !== id);
      setTodos(updatedTodos);
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };
  function toggleNavbar() {
    const navbar = document.getElementById("navbar-default");
    navbar.classList.toggle("hidden");
  }
  const handleEditInputChange = (e, id) => {
    const updatedTodos = todos.map((todo) =>
      todo._id === id ? { ...todo, title: e.target.value } : todo
    );
    setTodos(updatedTodos);
  };
 

  useEffect(() => {
    isAuthorised();
  }, []);

  return (
    <section>
      {user && (
        <div className="h-screen w-full ">
          <nav className="bg-white border-gray-200 dark:bg-gray-900 sticky top-0">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
              <b className="flex items-center">
                <img
                  src="https://i.pinimg.com/originals/52/6a/bf/526abf16cc3e74882fa7304abc0f841c.png"
                  className="h-8 mr-3"
                  alt="TODO-LOGO"
                />
                <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-orange-500">
                  Todo-app
                </span>
              </b>
              <button
                data-collapse-toggle="navbar-default"
                type="button"
                onClick={toggleNavbar}
                className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                aria-controls="navbar-default"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                <svg
                  className="w-5 h-5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 17 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M1 1h15M1 7h15M1 13h15"
                  />
                </svg>
              </button>
              <div
                className="hidden w-full md:block md:w-auto"
                id="navbar-default"
              >
                <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                  <li>
                    <a
                      href="/"
                      className="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500"
                      aria-current="page"
                    >
                      Home
                    </a>
                  </li>
                  <li>
                    <button
                      onClick={() => {
                        localStorage.removeItem('token');
                        navigate('/login');
                      }}
                      className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        <div className="flex justify-center items-center  h-screen w-screen bg-cover bg-center bg-[url('https://cdn.vectorstock.com/i/preview-1x/52/51/modern-3d-of-clipboard-with-checklist-concept-vector-43955251.jpg')]">
          <main className="container flex lg:mt-20 md:mt-20 sm:mt-20 items-center  flex-col h-auto w-[70%]  rounded-lg my-auto shadow-2xl shadow-indigo-950 mt-[40%] ">
            <div className=" flex  rounded-lg bg-gradient-to-r bg-[#1b1c1a] bg-opacity-50  mt-2 p-5 shadow-black shadow-md  ">
              <input
                type="text"
                placeholder="New Todo"
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                className="p-2 h-10 rounded bg-slate-950 text-orange-500 shadow-lg focus:outline-none focus:border-orange-500 focus:ring-1  focus:ring-orange-500"
              />
              <button
                onClick={createTodo}
                disabled={Loading}
                className="bg-blue-500 h-10 text-white p-2 ml-2 rounded shadow-lg  "
              >
                {Loading ? "Creating..." : "Create "}
              </button>
            </div>
            <ul>
              {todos.map((todo) => (
                <li
                  key={todo._id}
                  className="flex justify-between items-center  w-full px-3 py-1"
                >
                  <input
                    type="text"
                    value={
                      editingTodoId === todo._id
                        ? todos.find((t) => t._id === todo._id)?.title || ""
                        : todo.title
                    }
                    onChange={(e) => handleEditInputChange(e, todo._id)}
                    className="p-2  text-orange-600  bg-[#110a0a] bg-opacity-75 shadow-slate-300 shadow-md rounded mt-2"
                    disabled={editingTodoId !== todo._id} 
                  />
                  <div className="flex mt-2">
                    <button type="submit" 
                    onClick={() => deleteTodo(todo._id)}
                    className="flex bg-red-500 hover:bg-red-400 text-white p-2 ml-2 rounded">
                    <svg aria-hidden="true" className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd"></path></svg>
                   
                </button>
                    <button
                      onClick={() => updateTodo(todo._id, todo.title)}
                      className={`${
                        editingTodoId === todo._id
                          ? "bg-green-500" // Change button color when editing
                          : "bg-yellow-500"
                      } text-white p-2 ml-2 rounded`}
                    >
                      {editingTodoId === todo._id ? "Save" : "Edit"}{" "}
                      {/* Toggle button label */}
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </main>
          </div>
        </div>
      )}
    </section>
  );
};

export default Todo;
