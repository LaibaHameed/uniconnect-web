import { Users, Calendar, Bell } from 'lucide-react';

const FeaturesSection = () => {
  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-12 lg:mb-16">
          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
            Why Choose UniConnect?
          </h3>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600">
            Everything you need to stay connected with campus life
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
          <div className="bg-linear-to-br from-emerald-50 to-white p-6 sm:p-7 lg:p-8 rounded-xl sm:rounded-2xl hover:shadow-xl transition group border border-emerald-100">
            <div className="bg-emerald-600 w-12 h-12 sm:w-14 sm:h-14 rounded-lg sm:rounded-xl flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition">
              <Users className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
            </div>
            <h4 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 sm:mb-3">
              Join Societies
            </h4>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              Browse all student societies, learn about their activities, and become a member with just a few clicks.
            </p>
          </div>

          <div className="bg-linear-to-br from-blue-50 to-white p-6 sm:p-7 lg:p-8 rounded-xl sm:rounded-2xl hover:shadow-xl transition group border border-blue-100">
            <div className="bg-blue-600 w-12 h-12 sm:w-14 sm:h-14 rounded-lg sm:rounded-xl flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition">
              <Calendar className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
            </div>
            <h4 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 sm:mb-3">
              Track Events
            </h4>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              Stay updated with workshops, seminars, hackathons, and competitions happening across campus.
            </p>
          </div>

          <div className="bg-linear-to-br from-purple-50 to-white p-6 sm:p-7 lg:p-8 rounded-xl sm:rounded-2xl hover:shadow-xl transition group border border-purple-100 sm:col-span-2 lg:col-span-1">
            <div className="bg-purple-600 w-12 h-12 sm:w-14 sm:h-14 rounded-lg sm:rounded-xl flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition">
              <Bell className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
            </div>
            <h4 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 sm:mb-3">
              Get Notified
            </h4>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              Receive instant notifications about new events from societies you follow. Never miss an opportunity.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
