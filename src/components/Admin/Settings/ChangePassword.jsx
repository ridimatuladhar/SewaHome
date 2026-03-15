import { useState, useEffect } from "react";

const ChangePassword = () => {
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: ""
  });
  const [loading, setLoading] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const [message, setMessage] = useState({ type: '', text: '' });
  const [adminData, setAdminData] = useState(null);

  useEffect(() => {
    // Get admin data from localStorage
    const adminDataString = localStorage.getItem('adminData');
    if (adminDataString) {
      try {
        const data = JSON.parse(adminDataString);
        setAdminData(data);
      } catch (error) {
        console.error('Error parsing admin data:', error);
        setMessage({ type: 'error', text: 'Error loading admin data' });
      }
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (validationErrors[name]) {
      setValidationErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
    
    // Clear message when user starts typing
    if (message.text) {
      setMessage({ type: '', text: '' });
    }
  };

  const hasRepeatingChars = (password) => {
    for (let i = 0; i < password.length - 1; i++) {
      if (password[i] === password[i + 1]) {
        return true;
      }
    }
    return false;
  };

  const hasSpecialChar = (password) => {
    const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    return specialChars.test(password);
  };

  const validateForm = () => {
    const errors = {};
    let isValid = true;

    // Check if admin data is available
    if (!adminData || !adminData.email) {
      setMessage({ type: 'error', text: 'Admin data not found. Please login again.' });
      return false;
    }

    if (!formData.oldPassword.trim()) {
      errors.oldPassword = "Current password is required";
      isValid = false;
    }

    if (!formData.newPassword.trim()) {
      errors.newPassword = "New password is required";
      isValid = false;
    } else {
      if (formData.newPassword.length < 8) {
        errors.newPassword = "Password must be at least 8 characters";
        isValid = false;
      } else if (hasRepeatingChars(formData.newPassword)) {
        errors.newPassword = "Password must not contain repeating characters";
        isValid = false;
      } else if (formData.newPassword === formData.oldPassword) {
        errors.newPassword = "New password must be different from current password";
        isValid = false;
      } else if (!hasSpecialChar(formData.newPassword)) {
        errors.newPassword = "Password must contain at least one special character";
        isValid = false;
      }
    }

    if (!formData.confirmPassword.trim()) {
      errors.confirmPassword = "Please confirm your new password";
      isValid = false;
    } else if (formData.newPassword !== formData.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
      isValid = false;
    }

    setValidationErrors(errors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const response = await fetch(
        "https://stf.org.np/Backend/admin/change_password.php",
       // "http://localhost/SewaHome/Backend/admin/change_password.php",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            admin_id: adminData.id,
            email: adminData.email,
            oldPassword: formData.oldPassword,
            newPassword: formData.newPassword
          }),
        }
      );

      const data = await response.json();

      if (data.status === "success") {
        setMessage({ type: 'success', text: data.message || 'Password changed successfully!' });
        setFormData({ oldPassword: "", newPassword: "", confirmPassword: "" });
      } else {
        setMessage({ type: 'error', text: data.message || 'Failed to change password' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Network error. Please try again.' });
      console.error('Password change error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!adminData) {
    return (
      <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
        <div className="text-center text-gray-500">
          Loading admin data...
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-gray-800 mb-2">Change Password</h2>
     
      {/* Message Alert */}
      {message.text && (
        <div className={`mb-4 p-3 rounded-md ${
          message.type === 'success' 
            ? 'bg-green-100 text-green-800 border border-green-200' 
            : 'bg-red-100 text-red-800 border border-red-200'
        }`}>
          {message.text}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="oldPassword" className="block text-sm font-medium text-gray-700 mb-1">
            Current Password
          </label>
          <input
            type="password"
            id="oldPassword"
            name="oldPassword"
            value={formData.oldPassword}
            onChange={handleInputChange}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#376082] ${
              validationErrors.oldPassword ? "border-red-500" : "border-gray-300"
            }`}
            disabled={loading}
            placeholder="Enter current password"
          />
          {validationErrors.oldPassword && (
            <p className="mt-1 text-sm text-red-600">{validationErrors.oldPassword}</p>
          )}
        </div>
        
        <div>
          <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">
            New Password
          </label>
          <input
            type="password"
            id="newPassword"
            name="newPassword"
            value={formData.newPassword}
            onChange={handleInputChange}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#376082] ${
              validationErrors.newPassword ? "border-red-500" : "border-gray-300"
            }`}
            disabled={loading}
            placeholder="Enter new password"
          />
          {validationErrors.newPassword && (
            <p className="mt-1 text-sm text-red-600">{validationErrors.newPassword}</p>
          )}
          <div className="mt-2 text-xs text-gray-500">
            <p className="font-medium mb-1">Password requirements:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li className={formData.newPassword.length >= 8 ? "text-green-500" : "text-gray-500"}>
                Minimum 8 characters
              </li>
              <li className={!hasRepeatingChars(formData.newPassword) ? "text-green-500" : "text-gray-500"}>
                No repeating characters
              </li>
              <li className={hasSpecialChar(formData.newPassword) ? "text-green-500" : "text-gray-500"}>
                At least one special character
              </li>
            </ul>
          </div>
        </div>
        
        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
            Confirm New Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#376082] ${
              validationErrors.confirmPassword ? "border-red-500" : "border-gray-300"
            }`}
            disabled={loading}
            placeholder="Confirm new password"
          />
          {validationErrors.confirmPassword && (
            <p className="mt-1 text-sm text-red-600">{validationErrors.confirmPassword}</p>
          )}
        </div>
        
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 px-4 rounded-md text-white font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-[#376082] hover:bg-[#5D8FB1] focus:ring-[#376082]"
          }`}
        >
          {loading ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Changing Password...
            </span>
          ) : (
            "Change Password"
          )}
        </button>
      </form>
    </div>
  );
};

export default ChangePassword;