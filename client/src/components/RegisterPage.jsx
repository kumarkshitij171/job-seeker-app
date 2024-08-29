import { useEffect, useState } from 'react';
import { User, Mail, Lock, Phone, MapPin, BookOpen, Briefcase, FileText, EyeOff, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';
import useToken from '../store/useToken';
import { useNavigate } from 'react-router-dom';
import { fetchUser } from '../utils/fetchUser';
import useUser from '../store/useUser';

const RegisterPage = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        phone: '',
        address: '',
        qualifications: '',
        experience: '',
        resume: null,
    });

    const [showPassword, setShowPassword] = useState(false);
    const token = useToken((state) => state.token);
    const setUserToken = useToken((state) => state.setUserToken);
    const setUser = useUser((state) => state.setUser);
    const navigate = useNavigate();


    useEffect(() => {
        if (token) {
            navigate('/dashboard');
            return
        }
        fetchUser()
            .then(u => {
                setUserToken(u.token);
                setUser(u.jobSeeker);
            })
            .catch(e => console.log(e))

    }, [token])


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleFileChange = (e) => {
        console.log(e.target.files[0])
        const resume = e.target.files[0];
        setFormData(prevState => ({
            ...prevState,
            resume
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Handle registration logic here
        console.log('Form Data:', formData);
        // handle errors
        if (formData.resume === null) {
            toast.error('Please upload your resume');
        }
        if (formData.password.length < 6) {
            toast.error('Password must be at least 6 characters long');
        }
        if (formData.phone.length !== 10) {
            toast.error('Phone number must be 10 digits long');
        }
        if (formData.qualifications.length < 5) {
            toast.error('Qualifications must be at least 5 characters long');
        }
        if (formData.firstName.length < 2) {
            toast.error('First name must be at least 2 characters long');
        }

        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/register`, formData, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            if (response.status === 201) {
                toast.success(response.data.message);
                setUserToken(response.data.token);
                setUser(response.data.user);
            }
            else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-600 to-purple-700 flex items-center justify-center py-10 px-4 sm:px-6 lg:px-8">
            <div className="max-w-lg w-full space-y-8 bg-white p-10 rounded-xl shadow-xl">
                <div>
                    <h2 className="text-center text-4xl font-bold text-gray-900">
                        Create your account
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        Join our job-seeking community
                    </p>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="rounded-md shadow-sm">
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                            <div>
                                <label htmlFor="firstName" className="sr-only">First Name</label>
                                <div className="relative">
                                    <User className="absolute top-3 left-3 text-gray-400 z-20" size={20} />
                                    <input
                                        id="firstName"
                                        name="firstName"
                                        type="text"
                                        required
                                        className="appearance-none rounded-t-md relative block w-full px-3 py-3 pl-12 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-600 focus:border-purple-600 focus:z-10 sm:text-sm"
                                        placeholder="First Name"
                                        value={formData.firstName}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="lastName" className="sr-only">Last Name</label>
                                <div className="relative">
                                    <User className="absolute top-3 left-3 text-gray-400 z-20" size={20} />
                                    <input
                                        id="lastName"
                                        name="lastName"
                                        type="text"
                                        className="appearance-none rounded-t-md relative block w-full px-3 py-3 pl-12 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-600 focus:border-purple-600 focus:z-10 sm:text-sm"
                                        placeholder="Last Name"
                                        value={formData.lastName}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="relative">
                            <Mail className="absolute top-3 left-3 text-gray-400 z-20" size={20} />
                            <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-3 pl-12 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-600 focus:border-purple-600 focus:z-10 sm:text-sm"
                                placeholder="Email address"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="relative">
                            <label htmlFor="password" className="sr-only">Password</label>
                            <Lock className="absolute top-3 left-3 text-gray-400 z-20" size={20} />
                            <input
                                id="password"
                                name="password"
                                type={showPassword ? "text" : "password"}
                                autoComplete="current-password"
                                required
                                className="appearance-none rounded-b-md relative block w-full px-3 py-3 pl-10 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-600 focus:border-purple-600 focus:z-10 sm:text-sm"
                                placeholder="Password"
                                value={formData.password}
                                onChange={handleChange}
                            />
                            <button
                                type="button"
                                className="absolute inset-y-0 right-0 pr-3 flex items-center z-30"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? (
                                    <EyeOff className="h-5 w-5 text-gray-400" />
                                ) : (
                                    <Eye className="h-5 w-5 text-gray-400" />
                                )}
                            </button>
                        </div>

                        <div className="relative">
                            <Phone className="absolute top-3 left-3 text-gray-400 z-20" size={20} />
                            <input
                                id="phone"
                                name="phone"
                                type="tel"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-3 pl-12 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-600 focus:border-purple-600 focus:z-10 sm:text-sm"
                                placeholder="Phone Number"
                                value={formData.phone}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="relative">
                            <MapPin className="absolute top-3 left-3 text-gray-400 z-20" size={20} />
                            <input
                                id="address"
                                name="address"
                                type="text"
                                className="appearance-none rounded-none relative block w-full px-3 py-3 pl-12 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-600 focus:border-purple-600 focus:z-10 sm:text-sm"
                                placeholder="Address"
                                value={formData.address}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="relative">
                            <BookOpen className="absolute top-3 left-3 text-gray-400 z-20" size={20} />
                            <input
                                id="qualifications"
                                name="qualifications"
                                type="text"
                                accept="application/pdf"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-3 pl-12 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-600 focus:border-purple-600 focus:z-10 sm:text-sm"
                                placeholder="Qualifications"
                                value={formData.qualifications}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="relative">
                            <Briefcase className="absolute top-3 left-3 text-gray-400 z-20" size={20} />
                            <input
                                id="experience"
                                name="experience"
                                type="text"
                                className="appearance-none rounded-none relative block w-full px-3 py-3 pl-12 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-600 focus:border-purple-600 focus:z-10 sm:text-sm"
                                placeholder="Experience"
                                value={formData.experience}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="relative">
                            <FileText className="absolute top-3 left-3 text-gray-400 z-20" size={20} />
                            <input
                                id="resume"
                                name="resume"
                                type="file"
                                required
                                className="appearance-none rounded-b-md relative block w-full px-3 py-3 pl-12 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-600 focus:border-purple-600 focus:z-10 sm:text-sm"
                                onChange={handleFileChange}
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                        >
                            Register
                        </button>
                    </div>
                </form>
                <div>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        Already have an account?{' '}
                        <Link to="/" className="font-medium text-purple-600 hover:text-purple-500">
                            Sign in
                        </Link>
                    </p>
                </div>
            </div >
        </div >
    );
};

export default RegisterPage;