// Base API URL - change this to your actual API endpoint
const API_BASE_URL = 'http://localhost:3001/api';

// Helper function to handle API responses
const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Network error' }));
    throw new Error(error.message || 'Something went wrong');
  }
  return response.json();
};

// Helper function to get auth headers
const getAuthHeaders = () => {
  const token = localStorage.getItem('authToken');
  return {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
  };
};

// Event API functions
export const eventAPI = {
  // Get all events
  getAllEvents: async (filters = {}) => {
    const queryParams = new URLSearchParams(filters);
    const response = await fetch(`${API_BASE_URL}/events?${queryParams}`, {
      headers: getAuthHeaders(),
    });
    return handleResponse(response);
  },

  // Get event by ID
  getEventById: async (eventId) => {
    const response = await fetch(`${API_BASE_URL}/events/${eventId}`, {
      headers: getAuthHeaders(),
    });
    return handleResponse(response);
  },

  // Create new event
  createEvent: async (eventData) => {
    const response = await fetch(`${API_BASE_URL}/events`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(eventData),
    });
    return handleResponse(response);
  },

  // Update event
  updateEvent: async (eventId, eventData) => {
    const response = await fetch(`${API_BASE_URL}/events/${eventId}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(eventData),
    });
    return handleResponse(response);
  },

  // Delete event
  deleteEvent: async (eventId) => {
    const response = await fetch(`${API_BASE_URL}/events/${eventId}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    return handleResponse(response);
  },

  // Register for event
  registerForEvent: async (eventId) => {
    const response = await fetch(`${API_BASE_URL}/events/${eventId}/register`, {
      method: 'POST',
      headers: getAuthHeaders(),
    });
    return handleResponse(response);
  },

  // Unregister from event
  unregisterFromEvent: async (eventId) => {
    const response = await fetch(`${API_BASE_URL}/events/${eventId}/unregister`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    return handleResponse(response);
  },
};

// User API functions
export const userAPI = {
  // Get user profile
  getProfile: async () => {
    const response = await fetch(`${API_BASE_URL}/users/profile`, {
      headers: getAuthHeaders(),
    });
    return handleResponse(response);
  },

  // Update user profile
  updateProfile: async (userData) => {
    const response = await fetch(`${API_BASE_URL}/users/profile`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(userData),
    });
    return handleResponse(response);
  },

  // Get user's events
  getUserEvents: async () => {
    const response = await fetch(`${API_BASE_URL}/users/events`, {
      headers: getAuthHeaders(),
    });
    return handleResponse(response);
  },

  // Get user's created events
  getCreatedEvents: async () => {
    const response = await fetch(`${API_BASE_URL}/users/events/created`, {
      headers: getAuthHeaders(),
    });
    return handleResponse(response);
  },

  // Get user's registered events
  getRegisteredEvents: async () => {
    const response = await fetch(`${API_BASE_URL}/users/events/registered`, {
      headers: getAuthHeaders(),
    });
    return handleResponse(response);
  },
};

// Authentication API functions
export const authAPI = {
  // Login
  login: async (credentials) => {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });
    const data = await handleResponse(response);
    if (data.token) {
      localStorage.setItem('authToken', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
    }
    return data;
  },

  // Register
  register: async (userData) => {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    const data = await handleResponse(response);
    if (data.token) {
      localStorage.setItem('authToken', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
    }
    return data;
  },

  // Logout
  logout: () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
  },

  // Check if user is authenticated
  isAuthenticated: () => {
    return !!localStorage.getItem('authToken');
  },

  // Get current user
  getCurrentUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },
};

// Utility functions
export const utils = {
  // Format date
  formatDate: (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  },

  // Format time
  formatTime: (timeString) => {
    return new Date(`2000-01-01T${timeString}`).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  },

  // Get event status
  getEventStatus: (event) => {
    const now = new Date();
    const eventDate = new Date(event.date);
    
    if (eventDate < now) {
      return 'past';
    } else if (event.attendees >= event.maxAttendees) {
      return 'full';
    } else {
      return 'upcoming';
    }
  },

  // Validate email
  validateEmail: (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  },

  // Validate password strength
  validatePassword: (password) => {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    
    return {
      isValid: password.length >= minLength && hasUpperCase && hasLowerCase && hasNumbers && hasSpecialChar,
      errors: {
        length: password.length < minLength,
        uppercase: !hasUpperCase,
        lowercase: !hasLowerCase,
        numbers: !hasNumbers,
        special: !hasSpecialChar,
      },
    };
  },
};

// Mock data for development (remove in production)
export const mockData = {
  events: [
    {
      id: 1,
      title: 'Tech Conference 2024',
      description: 'Annual technology conference featuring industry experts',
      date: '2024-03-15',
      time: '09:00',
      location: 'Main Auditorium',
      category: 'technical',
      organizer: 'Computer Science Department',
      attendees: 150,
      maxAttendees: 200,
      image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400',
    },
    {
      id: 2,
      title: 'Cultural Fest',
      description: 'Celebrate diversity with music, dance, and art',
      date: '2024-03-20',
      time: '18:00',
      location: 'Open Air Theater',
      category: 'cultural',
      organizer: 'Cultural Committee',
      attendees: 300,
      maxAttendees: 500,
      image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=400',
    },
  ],
  users: [
    {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@college.edu',
      studentId: 'STU2024001',
      department: 'Computer Science',
      year: '3rd Year',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
    },
  ],
};

export default {
  eventAPI,
  userAPI,
  authAPI,
  utils,
  mockData,
}; 