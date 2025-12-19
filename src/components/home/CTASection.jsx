const CTASection = () => {
  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-linear-to-r from-emerald-600 to-blue-600">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3 sm:mb-4">
          Ready to Get Started?
        </h3>
        <p className="text-base sm:text-lg lg:text-xl text-emerald-100 mb-6 sm:mb-8">
          Join UniConnect today and become part of the most active campus community
        </p>
        <button className="w-full cursor-pointer sm:w-auto px-8 sm:px-10 py-3 sm:py-4 bg-white text-emerald-600 rounded-xl hover:shadow-2xl transition transform hover:-translate-y-1 font-bold text-base sm:text-lg">
          Create Your Account
        </button>
      </div>
    </section>
  );
};

export default CTASection;
