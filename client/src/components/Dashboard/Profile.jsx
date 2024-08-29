import useUser from '../../store/useUser';
import { User, MapPin, Phone, Mail, Book, Briefcase, FileText } from 'lucide-react';

const Profile = () => {
    const user = useUser((state) => state.user);

    if (!user) {
        return <div className="flex justify-center items-center h-screen">Loading...</div>;
    }

    const resumeUrl = `${import.meta.env.VITE_API_URL}/api/resume/${encodeURIComponent(user.resume.replace(/\\/g, '/').replace('uploads/', ''))}`;

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="bg-white shadow-xl rounded-lg overflow-hidden">
                <div className="bg-blue-600 p-4 sm:p-6">
                    <div className="flex items-center">
                        <div className="bg-white p-3 rounded-full">
                            <User size={64} className="text-blue-600" />
                        </div>
                        <div className="ml-4 text-white">
                            <h2 className="text-2xl font-bold">{user.firstName} {user.lastName}</h2>
                            <p className="text-blue-200">Job Seeker</p>
                        </div>
                    </div>
                </div>
                <div className="p-4 sm:p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <div className="flex items-center">
                                <MapPin className="mr-2 text-gray-500" size={20} />
                                <span>{user.address}</span>
                            </div>
                            <div className="flex items-center">
                                <Phone className="mr-2 text-gray-500" size={20} />
                                <span>{user.phone}</span>
                            </div>
                            <div className="flex items-center">
                                <Mail className="mr-2 text-gray-500" size={20} />
                                <span>{user.email}</span>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <div className="flex items-center">
                                <Book className="mr-2 text-gray-500" size={20} />
                                <span>Qualifications: {user.qualifications}</span>
                            </div>
                            <div className="flex items-center">
                                <Briefcase className="mr-2 text-gray-500" size={20} />
                                <span>Experience: {user.experience}</span>
                            </div>
                            <div className="flex items-center">
                                <FileText className="mr-2 text-gray-500" size={20} />
                                <a
                                    href={resumeUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-600 hover:underline"
                                >
                                    View Resume
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bg-gray-100 px-4 py-3 sm:px-6">
                    <div className="text-sm">
                        <p>Member since: {new Date(user.createdAt).toLocaleDateString()}</p>
                        <p>Last updated: {new Date(user.updatedAt).toLocaleDateString()}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;