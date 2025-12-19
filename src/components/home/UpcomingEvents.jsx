import { Calendar, ArrowRight } from 'lucide-react';
import { UPCOMING_EVENTS } from '../constants/homeData';

const UpcomingEvents = () => {
  return (
    <section id="events" className="py-12 sm:py-16 lg:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 sm:mb-10 lg:mb-12 gap-4">
          <div>
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-1 sm:mb-2">
              Upcoming Events
            </h3>
            <p className="text-sm sm:text-base text-gray-600">
              Don't miss these exciting opportunities
            </p>
          </div>
          <button className="px-4 cursor-pointer sm:px-6 py-2 sm:py-3 text-emerald-600 hover:text-emerald-700 font-semibold flex items-center space-x-2 group text-sm sm:text-base">
            <span>See All Events</span>
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition" />
          </button>
        </div>

        <div className="space-y-3 sm:space-y-4">
          {UPCOMING_EVENTS.map((event, idx) => (
            <div
              key={idx}
              className="bg-linear-to-r from-white to-emerald-50 p-4 sm:p-5 lg:p-6 rounded-xl sm:rounded-2xl shadow-md hover:shadow-xl transition group cursor-pointer border border-emerald-100"
            >
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 gap-4">
                <div className="flex items-start space-x-3 sm:space-x-4">
                  <div className="bg-linear-to-br from-emerald-600 to-blue-600 p-2.5 sm:p-3 lg:p-4 rounded-lg sm:rounded-xl shrink-0">
                    <Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-base sm:text-lg lg:text-xl font-bold text-gray-900 mb-1 group-hover:text-emerald-600 transition">
                      {event.title}
                    </h4>
                    <p className="text-sm sm:text-base text-gray-600">
                      Organized by {event.society}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 lg:gap-6">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-3 sm:px-4 py-1.5 sm:py-2 bg-blue-100 text-blue-700 rounded-lg text-xs sm:text-sm font-semibold">
                      {event.type}
                    </span>
                    <span className="text-sm sm:text-base text-gray-700 font-semibold">
                      {event.date}
                    </span>
                  </div>
                  <button className="w-full cursor-pointer sm:w-auto px-4 sm:px-6 py-1.5 sm:py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition font-semibold text-sm sm:text-base">
                    Register
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UpcomingEvents;
