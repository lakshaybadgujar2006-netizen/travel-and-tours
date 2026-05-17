import React from 'react';
import Hero from '../components/Hero';
import ForYou from '../components/ForYou';
import PackageGrid from '../components/PackageGrid';
import AIPlanner from '../components/AIPlanner';
import { motion } from 'motion/react';
import { Camera, Map, Star, Users, ShieldCheck, Headset, Sparkles, CreditCard, Smartphone, Wallet, QrCode, Phone as WhatsApp } from 'lucide-react';

export default function Home() {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [activeCategory, setActiveCategory] = React.useState('all');
  const [maxPrice, setMaxPrice] = React.useState<number>(100000);
  const [maxDuration, setMaxDuration] = React.useState<number>(15);
  const [selectedActivity, setSelectedActivity] = React.useState('all');

  const categories = [
    { id: 'all', label: 'All Packages' },
    { id: 'adventure', label: 'Adventure' },
    { id: 'family', label: 'Family Specials' },
    { id: 'budget', label: 'Budget Trips' }
  ];

  return (
    <main>
      <Hero onSearch={setSearchQuery} />
      <ForYou />
      
      {/* Popular Packages */}
      <section id="packages-section" className="py-24 px-6 max-w-7xl mx-auto scroll-mt-20">
        <div className="flex flex-col gap-12 mb-16">
          <div className="flex flex-col md:flex-row justify-between items-end gap-8">
            <div className="max-w-2xl flex-1">
              <span className="small-caps mb-4 block">Hand-picked Expeditions</span>
              <h2 className="text-4xl md:text-5xl mb-6">
                {searchQuery ? `Searching for "${searchQuery}"` : 'Curated Packages for Every Traveler.'}
              </h2>
              <p className="text-slate-500 font-medium max-w-xl leading-relaxed">
                From high-altitude adventures to serene family retreats, explore our selection of premium budget-friendly journeys.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
              <div className="relative w-full sm:w-80 group">
                <input 
                  type="text" 
                  placeholder="Filter destinations..."
                  className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all font-medium text-slate-900"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Camera className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-accent transition-colors" />
              </div>
              
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="px-6 py-3 bg-slate-100 text-slate-600 rounded-2xl font-bold hover:bg-slate-200 transition-all text-xs uppercase tracking-widest whitespace-nowrap"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-col gap-8">
            <div className="flex flex-wrap gap-4 border-b border-slate-100 pb-2">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`relative px-6 py-3 text-sm font-bold uppercase tracking-wider transition-all duration-300 ${
                    activeCategory === cat.id 
                      ? 'text-accent' 
                      : 'text-slate-400 hover:text-slate-600'
                  }`}
                >
                  {cat.label}
                  {activeCategory === cat.id && (
                    <motion.div 
                      layoutId="activeTab"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent"
                    />
                  )}
                </button>
              ))}
            </div>

            {/* Advanced Filters */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-8 bg-slate-50/50 rounded-[2rem] border border-slate-100">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Max Budget</label>
                  <span className="text-sm font-black text-slate-900">₹{maxPrice.toLocaleString()}</span>
                </div>
                <input 
                  type="range" 
                  min="5000" 
                  max="100000" 
                  step="5000"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(parseInt(e.target.value))}
                  className="w-full accent-accent h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Max Duration</label>
                  <span className="text-sm font-black text-slate-900">{maxDuration} Days</span>
                </div>
                <input 
                  type="range" 
                  min="2" 
                  max="15" 
                  step="1"
                  value={maxDuration}
                  onChange={(e) => setMaxDuration(parseInt(e.target.value))}
                  className="w-full accent-accent h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              <div className="space-y-4">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Main Activity</label>
                <select 
                  value={selectedActivity}
                  onChange={(e) => setSelectedActivity(e.target.value)}
                  className="w-full bg-white border border-slate-200 px-4 py-2.5 rounded-xl text-sm font-medium focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none"
                >
                  <option value="all">Any Activity</option>
                  <option value="trekking">Trekking</option>
                  <option value="camping">Camping</option>
                  <option value="rafting">Rafting</option>
                  <option value="safari">Safari</option>
                  <option value="sightseeing">Sightseeing</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        
        <PackageGrid 
          searchQuery={searchQuery} 
          category={activeCategory} 
          maxPrice={maxPrice}
          maxDuration={maxDuration}
          activity={selectedActivity}
        />
      </section>

      <section id="planner" className="py-24 px-6 bg-white border-y border-slate-100">
        <div className="max-w-7xl mx-auto">
          <AIPlanner />
        </div>
      </section>

      {/* Adventure Activities */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col items-center text-center mb-16">
          <span className="small-caps mb-4 text-accent">Pulse of Adventure</span>
          <h2 className="text-4xl md:text-5xl tracking-tight">Activities for the <span className="text-accent underline underline-offset-8 decoration-slate-200">Wild at Heart.</span></h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {[
            { name: 'Trekking', icon: '🏔️' },
            { name: 'Camping', icon: '⛺' },
            { name: 'Rafting', icon: '🚣' },
            { name: 'Paragliding', icon: '🪂' },
            { name: 'Skiing', icon: '⛷️' },
            { name: 'Safari', icon: '🐅' },
            { name: 'Biking', icon: '🏍️' },
            { name: 'Ziplining', icon: '🚠' },
            { name: 'Stargazing', icon: '✨' },
            { name: 'Bonfire', icon: '🔥' },
            { name: 'ATV Rides', icon: '🚜' },
            { name: 'Yoga', icon: '🧘' }
          ].map((activity, i) => (
            <motion.div
              key={activity.name}
              whileHover={{ y: -5, scale: 1.02 }}
              className="glass-surface p-6 rounded-3xl text-center border border-slate-100 shadow-sm flex flex-col items-center gap-3"
            >
              <span className="text-3xl">{activity.icon}</span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-600">{activity.name}</span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="absolute -top-10 -left-10 w-64 h-64 bg-accent/5 rounded-full blur-3xl" />
              <span className="small-caps mb-4 block text-accent">The Travel & Tours Advantage</span>
              <h2 className="text-4xl md:text-5xl tracking-tight mb-8">Why Travelers <span className="text-accent underline underline-offset-8 decoration-slate-200">Trust Us.</span></h2>
              <p className="text-slate-500 text-lg mb-12 leading-relaxed">
                We don't just book trips; we craft experiences. Our mission is to make premium travel accessible to everyone through smart planning and local expertise.
              </p>
              
              <div className="grid sm:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <h4 className="font-bold text-slate-900">100% Safe & Secure</h4>
                  <p className="text-sm text-slate-500">Verified accommodations and secure payment gateways for peace of mind.</p>
                </div>
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600">
                    <Headset className="w-6 h-6" />
                  </div>
                  <h4 className="font-bold text-slate-900">24/7 Live Support</h4>
                  <p className="text-sm text-slate-500">Our team is always a call or WhatsApp away, even during your journey.</p>
                </div>
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-orange-50 flex items-center justify-center text-orange-600">
                    <Map className="w-6 h-6" />
                  </div>
                  <h4 className="font-bold text-slate-900">Expert Local Guides</h4>
                  <p className="text-sm text-slate-500">Hidden gems and authentic stories you won't find on any travel blog.</p>
                </div>
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-purple-50 flex items-center justify-center text-purple-600">
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <h4 className="font-bold text-slate-900">AI-Powered Planning</h4>
                  <p className="text-sm text-slate-500">Get personalized itineraries created in seconds by our travel AI.</p>
                </div>
              </div>
            </div>
            
            <div className="relative group">
              <div className="absolute inset-0 bg-accent/20 rounded-[3rem] rotate-3 group-hover:rotate-1 transition-transform" />
              <img 
                src="https://images.unsplash.com/photo-1530789253388-582c481c54b0?auto=format&fit=crop&w=1200&q=100"
                alt="Travel experiences"
                className="relative rounded-[3rem] object-cover h-[500px] w-full shadow-2xl transition-transform group-hover:-translate-y-2"
                referrerPolicy="no-referrer"
              />
              <div className="absolute -bottom-8 -right-8 glass-surface p-6 rounded-3xl shadow-xl max-w-[200px]">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">⭐</span>
                  <span className="text-2xl font-black">4.9/5</span>
                </div>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Average User Rating Across 50,000+ Bookings</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Scan & Pay Section */}
      <section className="py-24 px-6 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <div className="w-16 h-1 bg-emerald-500 mb-8" />
              <h2 className="text-5xl md:text-6xl font-black text-slate-900 leading-[1.1] tracking-tight">
                Scan & <span className="text-emerald-500 italic">Pay</span> <br /> Anywhere
              </h2>
              <p className="text-slate-500 text-lg md:text-xl font-medium leading-relaxed max-w-lg">
                Quick, secure, and hassle-free payments through any UPI app. Simply scan the QR code to proceed with your booking or payment.
              </p>
              
              <div className="pt-8">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-6 block">Direct Pay via UPI Apps</span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {[
                    { 
                      name: 'Paytm', 
                      img: 'https://cdn.worldvectorlogo.com/logos/paytm-1.svg',
                      link: 'upi://pay?pa=8295987874@ptyes&pn=Travel%20and%20Tours&cu=INR'
                    },
                    { 
                      name: 'GPay', 
                      img: 'https://www.gstatic.com/lamda/images/google_pay_logo_v2.png',
                      link: 'upi://pay?pa=8295987874@ptyes&pn=Travel%20and%20Tours&cu=INR'
                    },
                    { 
                      name: 'PhonePe', 
                      img: 'https://cdn.worldvectorlogo.com/logos/phonepe-1.svg',
                      link: 'upi://pay?pa=8295987874@ptyes&pn=Travel%20and%20Tours&cu=INR'
                    },
                    { 
                      name: 'Any UPI', 
                      icon: <Smartphone className="w-5 h-5 text-emerald-500" />,
                      link: 'upi://pay?pa=8295987874@ptyes&pn=Travel%20and%20Tours&cu=INR'
                    }
                  ].map((app) => (
                    <a 
                      key={app.name} 
                      href={app.link}
                      className="flex flex-col items-center gap-3 p-4 bg-white border border-slate-100 rounded-2xl shadow-sm transition-all hover:shadow-md hover:-translate-y-1 active:scale-95 group"
                    >
                      <div className="w-10 h-10 flex items-center justify-center">
                        {app.img ? (
                          <img src={app.img} alt={app.name} className="w-full h-full object-contain" />
                        ) : (
                          app.icon
                        )}
                      </div>
                      <span className="text-[10px] font-black text-slate-600 uppercase tracking-tighter text-center">{app.name}</span>
                    </a>
                  ))}
                </div>

                <div className="mt-10 p-6 bg-emerald-50 rounded-2xl border border-emerald-100 flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shrink-0 shadow-sm">
                    <WhatsApp className="w-5 h-5 text-emerald-500" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 mb-1">Booking Confirmation</h4>
                    <p className="text-xs text-slate-600 leading-relaxed font-medium">
                      After successful payment, please <span className="font-bold text-emerald-600">share a screenshot on WhatsApp</span> for instant booking confirmation and receipt.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Card Content */}
            <div className="relative">
              <div className="absolute inset-0 bg-slate-900 rounded-[3rem] translate-x-4 translate-y-4" />
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="relative bg-white p-10 rounded-[3rem] shadow-2xl border border-slate-100 text-center"
              >
                <div className="bg-slate-50 p-8 rounded-[2rem] mb-8 inline-block shadow-inner border border-slate-100/50">
                  <span className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.3em] mb-4 block">Scan & Pay</span>
                  <img 
                    src="/src/assets/images/upi_qr_code_1779020373838.png" 
                    alt="UPI Payment QR Code" 
                    className="w-56 h-56 rounded-xl object-contain mx-auto"
                    referrerPolicy="no-referrer"
                  />
                </div>
                
                <div className="space-y-6">
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-3 block">Our UPI ID</span>
                    <div className="bg-slate-50 px-6 py-4 rounded-2xl border border-slate-100 font-mono text-xl font-black text-slate-900 tracking-tight flex items-center justify-center gap-4 group">
                      <span>8295987874@ptyes</span>
                      <button 
                        onClick={() => navigator.clipboard.writeText('8295987874@ptyes')}
                        className="p-2 hover:bg-white rounded-lg transition-colors text-slate-400 hover:text-emerald-500"
                        title="Copy UPI ID"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>
                      </button>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-center gap-2 text-emerald-500 text-sm font-bold">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    Scan to Pay Securely
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-24 px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-12">
          {[
            { icon: Map, label: '500+ Destinations', value: 'Domestic Coverage' },
            { icon: Users, label: '10k+ Travelers', value: 'Happy Customers' },
            { icon: Star, label: '4.9/5 Rating', value: 'Customer Reviews' },
            { icon: Camera, label: 'Authentic Labs', value: 'Real Experiences' },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-center group"
            >
              <div className="w-14 h-14 bg-white rounded-2xl shadow-sm border border-slate-100 flex items-center justify-center mx-auto mb-5 group-hover:bg-accent group-hover:border-accent transition-all duration-300">
                <item.icon className="w-6 h-6 text-accent group-hover:text-white transition-colors" />
              </div>
              <h4 className="font-bold text-slate-800 text-lg">{item.label}</h4>
              <p className="small-caps text-[10px] mt-2 font-bold opacity-60">{item.value}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Testimonial / Review Preview */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
           <div className="bg-indigo-900 rounded-[2.5rem] p-12 text-white relative overflow-hidden group">
              <div className="relative z-10">
                <div className="flex gap-1 mb-8">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />)}
                </div>
                <p className="text-2xl font-medium leading-relaxed italic opacity-90 mb-12">
                  "Booked a flexible trip to Rajasthan last month. Saved nearly ₹5,000 by shifting my dates by 2 days. Seamless experience from booking to travel!"
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-indigo-800 rounded-full border border-white/10" />
                  <div>
                    <h5 className="font-bold uppercase tracking-widest text-sm">Ravi Verma</h5>
                    <p className="text-[10px] uppercase font-bold opacity-50 tracking-tighter mt-1">Verified Budget Traveler</p>
                  </div>
                </div>
              </div>
              {/* Abstract decorative circles */}
              <div className="absolute -top-20 -right-20 w-64 h-64 bg-accent/10 rounded-full blur-3xl group-hover:scale-110 transition-transform duration-1000" />
           </div>

           <div className="space-y-8">
              <span className="small-caps text-accent">Customer Stories</span>
              <h2 className="text-4xl md:text-5xl">Travelers love the <span className="text-accent underline underline-offset-8 decoration-slate-200">flexibility.</span></h2>
              <p className="text-slate-500 text-lg leading-relaxed">
                By focusing on flexible dates and budget optimizations, we've helped thousands of people see more of India for less.
              </p>
              <div className="grid grid-cols-2 gap-8 pt-6">
                 <div>
                    <h6 className="text-3xl font-extrabold text-slate-900 mb-2">40%</h6>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest leading-normal">Average savings vs competitors</p>
                 </div>
                 <div>
                    <h6 className="text-3xl font-extrabold text-slate-900 mb-2">24/7</h6>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest leading-normal">Dedicated travel support</p>
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* Expanded Destination Gallery */}
      <section className="py-24 px-6 bg-slate-900 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="max-w-xl">
              <span className="small-caps mb-4 block text-accent">The Travel & Tours Gallery</span>
              <h2 className="text-4xl md:text-5xl tracking-tight text-white">Our <span className="text-accent underline underline-offset-8 decoration-slate-700">Adventure Canvas.</span></h2>
              <p className="text-slate-400 mt-6 font-medium">
                A glimpse into the breathtaking landscapes where we create your memories.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[
              { name: 'Kashmir', img: 'https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=800&q=100' },
              { name: 'Leh Ladakh', img: 'https://images.unsplash.com/photo-1581793745862-99f9d4c11b11?auto=format&fit=crop&w=800&q=100' },
              { name: 'Manali', img: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=800&q=100' },
              { name: 'Shimla', img: 'https://images.unsplash.com/photo-1597074866923-dc05891503af?auto=format&fit=crop&w=800&q=100' },
              { name: 'Kerala', img: 'https://images.unsplash.com/photo-1602216058441-99945a908480?auto=format&fit=crop&w=800&q=100' },
              { name: 'Goa', img: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=800&q=100' },
              { name: 'Jaipur', img: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=800&q=100' },
              { name: 'Udaipur', img: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=800&q=100' },
              { name: 'Andaman', img: 'https://images.unsplash.com/photo-1589136142558-946f1bad2ec4?auto=format&fit=crop&w=800&q=100' },
              { name: 'Rishikesh', img: 'https://images.unsplash.com/photo-1590050752117-23a9d7cd991e?auto=format&fit=crop&w=800&q=100' },
              { name: 'Mussoorie', img: 'https://images.unsplash.com/photo-1617478052187-b9cd989932f1?auto=format&fit=crop&w=800&q=100' },
              { name: 'Darjeeling', img: 'https://images.unsplash.com/photo-1582200234479-71eec8b7cd22?auto=format&fit=crop&w=800&q=100' }
            ].map((dest, i) => (
              <motion.div
                key={dest.name}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                whileHover={{ scale: 0.98 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => {
                  setSearchQuery(dest.name);
                  document.getElementById('packages-section')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="group relative h-64 rounded-2xl overflow-hidden cursor-pointer"
              >
                <img
                  src={dest.img}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  alt={dest.name}
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                   <span className="text-white font-bold uppercase tracking-widest text-xs border border-white/30 px-4 py-2 rounded-full">View Deals</span>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                  <h3 className="text-white font-bold text-lg tracking-tight">{dest.name}</h3>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
