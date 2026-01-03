import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useRef } from 'react';

const ContactModal = ({ contact, onClose }) => {
    const modalRef = useRef();

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                onClose();
            }
        };
        const handleEsc = (event) => {
            if (event.key === 'Escape') onClose();
        };

        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('keydown', handleEsc);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('keydown', handleEsc);
        };
    }, [onClose]);

    if (!contact) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                    aria-hidden="true"
                />

                <motion.div
                    ref={modalRef}
                    initial={{ scale: 0.9, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.9, opacity: 0, y: 20 }}
                    transition={{ type: "spring", damping: 25, stiffness: 300 }}
                    className="relative w-full max-w-lg bg-slate-900 border border-slate-700/50 rounded-3xl shadow-2xl overflow-hidden"
                >
                    {/* Header Background Pattern */}
                    <div className="absolute inset-0 h-32 bg-gradient-to-br from-cyan-600/20 to-purple-600/20 pointer-events-none" />

                    <div className="relative p-8">
                        <div className="flex justify-between items-start mb-6">
                            <div className="flex items-center space-x-5">
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ delay: 0.1, type: "spring" }}
                                    className="h-20 w-20 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white text-3xl font-bold shadow-lg shadow-cyan-500/20"
                                >
                                    {contact.name.charAt(0).toUpperCase()}
                                </motion.div>
                                <div>
                                    <h2 className="text-3xl font-bold text-white tracking-tight">{contact.name}</h2>
                                    <p className="text-slate-400 font-medium">Contact Details</p>
                                </div>
                            </div>
                            <button
                                onClick={onClose}
                                className="p-2 rounded-full hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
                            >
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <div className="space-y-6 mt-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="p-4 rounded-2xl bg-slate-800/50 border border-slate-700/30">
                                    <span className="text-xs uppercase tracking-wider text-slate-500 font-bold mb-1 block">Email</span>
                                    <span className="text-slate-200 font-medium break-all">{contact.email}</span>
                                </div>
                                <div className="p-4 rounded-2xl bg-slate-800/50 border border-slate-700/30">
                                    <span className="text-xs uppercase tracking-wider text-slate-500 font-bold mb-1 block">Phone</span>
                                    <span className="text-slate-200 font-medium">{contact.phone}</span>
                                </div>
                            </div>

                            <div className="p-5 rounded-2xl bg-slate-800/50 border border-slate-700/30 min-h-[100px]">
                                <span className="text-xs uppercase tracking-wider text-slate-500 font-bold mb-2 block">Message</span>
                                <p className="text-slate-300 leading-relaxed">
                                    {contact.message || <span className="italic text-slate-600">No additional notes provided.</span>}
                                </p>
                            </div>

                            <div className="pt-6 flex justify-between items-center border-t border-slate-700/50">
                                <span className="text-xs text-slate-500 font-mono">
                                    ID: {contact._id.slice(-8).toUpperCase()}
                                </span>
                                <span className="text-sm text-slate-400">
                                    Added on {new Date(contact.createdAt).toLocaleDateString(undefined, {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    })}
                                </span>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default ContactModal;
