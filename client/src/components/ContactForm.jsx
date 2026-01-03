import { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

const ContactForm = ({ onContactAdded }) => {
    const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [serverError, setServerError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const validate = () => {
        const newErrors = {};
        if (!formData.name) newErrors.name = 'Name is required';
        if (!formData.email) newErrors.email = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Please provide a valid email';
        if (!formData.phone) newErrors.phone = 'Phone number is required';
        return newErrors;
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        if (errors[e.target.name]) {
            setErrors({ ...errors, [e.target.name]: null });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = validate();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setIsSubmitting(true);
        setServerError('');
        setSuccessMessage('');

        try {
            await axios.post('http://localhost:5000/api/contacts', formData);
            setFormData({ name: '', email: '', phone: '', message: '' });
            onContactAdded();
            setSuccessMessage('Contact added successfully!');
            setTimeout(() => setSuccessMessage(''), 3000);
        } catch (err) {
            setServerError(err.response?.data?.error || 'Something went wrong');
        } finally {
            setIsSubmitting(false);
        }
    };

    const inputClasses = (error) => `
        mt-1 block w-full px-4 py-3 bg-slate-900/50 border 
        ${error ? 'border-red-500/50 focus:border-red-500 focus:ring-red-500/20' : 'border-slate-700/50 focus:border-cyan-500 focus:ring-cyan-500/20 hover:border-slate-600'} 
        rounded-xl shadow-inner text-slate-200 placeholder-slate-600 focus:outline-none focus:ring-4 transition-all duration-300 text-sm backdrop-blur-sm
    `;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white/5 backdrop-blur-2xl p-8 rounded-3xl shadow-2xl border border-white/10 overflow-hidden relative group"
        >
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

            <h2 className="text-2xl font-bold mb-6 text-white tracking-tight relative z-10 flex items-center">
                <span className="bg-cyan-500 w-1.5 h-6 rounded-full mr-3 shadow-[0_0_10px_rgba(6,182,212,0.5)]"></span>
                New Contact
            </h2>

            {serverError && (
                <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl relative z-10">
                    <p className="text-red-400 text-sm font-medium">{serverError}</p>
                </div>
            )}

            {successMessage && (
                <div className="mb-6 p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl relative z-10">
                    <p className="text-emerald-400 text-sm font-medium">{successMessage}</p>
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                <div>
                    <label className="block text-xs font-bold text-slate-400 mb-1.5 uppercase tracking-wider pl-1">Full Name</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="e.g. Alex Chen"
                        className={inputClasses(errors.name)}
                    />
                    {errors.name && <p className="text-red-400 text-xs mt-2 font-medium ml-1">{errors.name}</p>}
                </div>

                <div>
                    <label className="block text-xs font-bold text-slate-400 mb-1.5 uppercase tracking-wider pl-1">Email Address</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="alex@example.com"
                        className={inputClasses(errors.email)}
                    />
                    {errors.email && <p className="text-red-400 text-xs mt-2 font-medium ml-1">{errors.email}</p>}
                </div>

                <div>
                    <label className="block text-xs font-bold text-slate-400 mb-1.5 uppercase tracking-wider pl-1">Phone Number</label>
                    <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+1 (555) 000-0000"
                        className={inputClasses(errors.phone)}
                    />
                    {errors.phone && <p className="text-red-400 text-xs mt-2 font-medium ml-1">{errors.phone}</p>}
                </div>

                <div>
                    <label className="block text-xs font-bold text-slate-400 mb-1.5 uppercase tracking-wider pl-1">Message</label>
                    <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows="3"
                        placeholder="Additional details..."
                        className={inputClasses(null)}
                    />
                </div>

                <motion.button
                    whileHover={{ scale: 1.02, boxShadow: "0 0 20px rgba(6, 182, 212, 0.4)" }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full relative overflow-hidden flex justify-center py-4 px-4 border border-transparent rounded-xl shadow-lg bg-gradient-to-r from-cyan-600 to-blue-600 text-sm font-bold text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 disabled:opacity-50 disabled:cursor-not-allowed group"
                >
                    {/* Shimmer Effect */}
                    <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-20 group-hover:animate-shine" />

                    {isSubmitting ? (
                        <span className="flex items-center">
                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Saving...
                        </span>
                    ) : 'Add Contact'}
                </motion.button>
            </form>
        </motion.div>
    );
};

export default ContactForm;
