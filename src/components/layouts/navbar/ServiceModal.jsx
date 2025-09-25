
import { X } from "lucide-react";

const ServiceModal = ({ selectedService, onClose }) => {
  if (!selectedService) return null;

  return (
    <div
      className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-lg p-6 w-full max-w-3xl relative max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-black transition-colors"
        >
          <X size={24} />
        </button>
        <h2 className="text-2xl font-semibold mb-4 text-blue-600 pr-8">
          {selectedService.title}
        </h2>
        <img
          src={selectedService.image}
          alt={selectedService.title}
          className="w-full h-64 object-cover rounded mb-4"
        />
        <p className="text-gray-700 leading-relaxed">
          {selectedService.description}
        </p>
      </div>
    </div>
  );
};

export default ServiceModal;