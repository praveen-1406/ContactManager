import { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

const ContactList = ({ onContactClick }) => {
    const [contacts, setContacts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const fetchContacts = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/contacts');
            setContacts(response.data);
            setError('');
        } catch (err) {
            setError('Failed to fetch contacts');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchContacts();
    }, []);

    if (loading) return (
        <div className="flex justify-center items-center h-64">
            <div className="relative">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-500"></div>
                <div className="absolute top-0 left-0 h-12 w-12 rounded-full border-t-2 border-b-2 border-purple-500 animate-spin" style={{ animationDuration: '3s' }}></div>
            </div>
        </div>
    );

    if (error) return (
        <div className="bg-red-500/10 p-6 rounded-2xl border border-red-500/20 backdrop-blur-sm text-center">
            <svg className="w-10 h-10 text-red-500 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <p className="text-red-400 font-medium">{error}</p>
        </div>
    );

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white/5 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/10 overflow-hidden flex flex-col h-full"
        >
            <div className="px-8 py-7 border-b border-white/5 flex justify-between items-center bg-black/20">
                <h2 className="text-xl font-bold text-slate-100 tracking-wide">Contacts Database</h2>
                <div className="flex items-center space-x-2">
                    <span className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500"></span>
                    </span>
                    <span className="text-slate-400 text-sm font-medium">
                        {contacts.length} Active
                    </span>
                </div>
            </div>

            {contacts.length === 0 ? (
                <div className="p-16 text-center text-slate-500 flex flex-col items-center justify-center flex-grow">
                    <div className="w-20 h-20 bg-slate-800 rounded-full flex items-center justify-center mb-6 shadow-lg border border-slate-700/50">
                        <svg className="w-10 h-10 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-slate-300 mb-2">No contacts yet</h3>
                    <p className="text-slate-500 max-w-xs mx-auto">Start building your network by adding your first contact using the form.</p>
                </div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-white/5">
                        <thead className="bg-black/20">
                            <tr>
                                <th className="px-8 py-5 text-left text-xs font-bold text-slate-400 uppercase tracking-widest pl-10">Profile</th>
                                <th className="px-8 py-5 text-left text-xs font-bold text-slate-400 uppercase tracking-widest hidden sm:table-cell">Contact Info</th>
                                <th className="px-8 py-5 text-left text-xs font-bold text-slate-400 uppercase tracking-widest hidden md:table-cell">Details</th>
                            </tr>
                        </thead>
                        <tbody className="bg-transparent divide-y divide-white/5">
                            {contacts.map((contact, index) => (
                                <motion.tr
                                    key={contact._id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                    onClick={() => onContactClick(contact)}
                                    className="hover:bg-cyan-500/5 transition-all duration-200 group cursor-pointer border-l-4 border-transparent hover:border-cyan-500"
                                >
                                    <td className="px-6 py-6 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="flex-shrink-0 h-12 w-12">
                                                <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-cyan-600 to-blue-600 flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-cyan-900/20 group-hover:scale-105 transition-transform duration-300">
                                                    {contact.name.charAt(0).toUpperCase()}
                                                </div>
                                            </div>
                                            <div className="ml-5">
                                                <div className="text-base font-bold text-slate-100 group-hover:text-cyan-400 transition-colors">{contact.name}</div>
                                                <div className="text-sm text-slate-500 sm:hidden mt-0.5">{contact.email}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6 whitespace-nowrap hidden sm:table-cell">
                                        <div className="text-sm text-slate-300 font-medium mb-1 flex items-center">
                                            <svg className="w-4 h-4 mr-2 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                            </svg>
                                            {contact.email}
                                        </div>
                                        <div className="text-sm text-slate-500 flex items-center">
                                            <svg className="w-4 h-4 mr-2 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                            </svg>
                                            {contact.phone}
                                        </div>
                                    </td>
                                    <td className="px-8 py-6 whitespace-nowrap text-sm text-slate-500 hidden md:table-cell">
                                        <div className="flex flex-col">
                                            <span className="text-xs uppercase tracking-wider text-slate-600 mb-1">Joined</span>
                                            <span className="font-medium text-slate-400">
                                                {new Date(contact.createdAt || Date.now()).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
                                            </span>
                                        </div>
                                    </td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </motion.div>
    );
};

export default ContactList;
