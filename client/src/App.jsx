import { useState } from 'react'
import { motion } from 'framer-motion'
import ContactForm from './components/ContactForm'
import ContactList from './components/ContactList'
import ContactModal from './components/ContactModal'

function App() {
  const [refreshKey, setRefreshKey] = useState(0);
  const [selectedContact, setSelectedContact] = useState(null);

  const handleContactAdded = () => {
    setRefreshKey(prev => prev + 1);
  };

  return (
    <div className="min-h-screen bg-slate-950 font-sans text-slate-100 selection:bg-cyan-500/30 selection:text-cyan-200 overflow-hidden relative">
      {/* Dynamic Animated Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
            rotate: [0, 45, 0]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-[20%] -left-[10%] w-[70vw] h-[70vw] bg-cyan-500/10 rounded-full blur-[120px]"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
            rotate: [0, -45, 0]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear", delay: 2 }}
          className="absolute -bottom-[20%] -right-[10%] w-[60vw] h-[60vw] bg-purple-500/10 rounded-full blur-[100px]"
        />
        <motion.div
          animate={{
            x: [-100, 100, -100],
            y: [-50, 50, -50],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[30%] left-[30%] w-[40vw] h-[40vw] bg-blue-600/10 rounded-full blur-[90px]"
        />
      </div>

      <ContactModal contact={selectedContact} onClose={() => setSelectedContact(null)} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <header className="mb-16 text-center relative">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-5xl md:text-7xl font-extrabold tracking-tight mb-4"
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 animate-gradient">
              Contact Manager
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-xl text-slate-400 max-w-2xl mx-auto font-light"
          >
            Your connections, organized in <span className="text-cyan-400 font-medium">high fidelity</span>.
          </motion.p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-4 lg:sticky lg:top-8 space-y-8">
            <ContactForm onContactAdded={handleContactAdded} />

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 }}
              className="hidden lg:block p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md shadow-2xl"
            >
              <h3 className="text-slate-400 font-medium mb-2 uppercase tracking-wider text-xs">Pro Tip</h3>
              <p className="text-slate-500 text-sm">
                Click on any row in the contact list to view the details card using the new "pop" view.
              </p>
            </motion.div>
          </div>
          <div className="lg:col-span-8">
            <ContactList key={refreshKey} onContactClick={setSelectedContact} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
