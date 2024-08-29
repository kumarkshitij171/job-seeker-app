import { useState, useEffect } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import {
    Home,
    Users,
    Briefcase,
    MessageSquare,
    Settings,
    Menu,
    X,
    Bell
} from 'lucide-react';
import toast from 'react-hot-toast';
import useToken from '../../store/useToken';
import useUser from '../../store/useUser';
import { fetchUser } from '../../utils/fetchUser';
import axios from 'axios';

const DashboardPage = () => {
    const token = useToken((state) => state.token);
    const setUserToken = useToken((state) => state.setUserToken);
    const setUser = useUser((state) => state.setUser);
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
    const navigate = useNavigate();

    useEffect(() => {
        fetchUser()
            .then(u => {
                setUserToken(u.token);
                setUser(u.jobSeeker);
            })
            .catch(e => console.log(e));
        if (!token) {
            navigate('/');
        }
    }, [token]);

    const handleLogout = async () => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/logout`, {}, { withCredentials: true });
            console.log("Logout: " + response)
            if (response.status == 200) {
                toast.success(response.data.message);
                setUserToken(null);
                setUser(null);
                navigate('/');
                return;
            }
            toast.error(response.data.message);
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }

    return (
        <div className="flex h-screen bg-gray-100">
            <div className={`bg-gray-800 text-white w-64 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0 transition duration-200 ease-in-out`}>
                <div className="flex justify-between items-center px-4">
                    <span className="text-2xl font-semibold">Dashboard</span>
                    <button onClick={toggleSidebar} className="p-1 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600 md:hidden">
                        <X size={24} />
                    </button>
                </div>
                <nav>
                    <Link to="/dashboard" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white">
                        <Home size={20} className="inline-block mr-2" /> Dashboard
                    </Link>
                    <Link to="/dashboard/profile" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white">
                        <Users size={20} className="inline-block mr-2" /> Profile
                    </Link>
                    <Link to="/dashboard/jobs" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white">
                        <Briefcase size={20} className="inline-block mr-2" /> Jobs
                    </Link>
                    <Link to="/dashboard/messages" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white">
                        <MessageSquare size={20} className="inline-block mr-2" /> Messages
                    </Link>
                    <Link to="/dashboard/settings" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white">
                        <Settings size={20} className="inline-block mr-2" /> Settings
                    </Link>
                </nav>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Header */}
                <header className="flex justify-between items-center py-4 px-6 bg-white border-b-4 border-indigo-600">
                    <div className="flex items-center">
                        <button onClick={toggleSidebar} className="text-gray-500 focus:outline-none md:hidden">
                            <Menu size={24} />
                        </button>
                    </div>
                    <div className="flex items-center">
                        <button className="flex mx-4 text-gray-600 focus:outline-none">
                            <Bell size={24} />
                        </button>
                        <div className="relative">
                            <button onClick={handleLogout} className="relative z-10 block border-2 bg-blue-600 text-white p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                                Logout
                            </button>
                        </div>
                    </div>
                </header>

                {/* Dashboard Content */}
                <Outlet />
            </div>
        </div>
    );
};

export default DashboardPage;