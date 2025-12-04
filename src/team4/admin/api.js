const BASE_URL = "https://todu.mn/bs/lms/v1";

const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || `HTTP error! status: ${response.status}`);
  }
  return response.json();
};

const fetchWithAuth = async (url, options = {}) => {
  const token =
    localStorage.getItem("access_token") || localStorage.getItem("authToken");
  console.log("myToken:", token);
  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    ...options.headers,
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(url, {
    ...options,
    headers,
  });

  return handleResponse(response);
};

export const schoolAPI = {
  getAllSchools: async () => {
    try {
      const data = await fetchWithAuth(`${BASE_URL}/schools`, {
        method: "GET",
      });
      console.log(data);
      return Array.isArray(data) ? data : data.items;
    } catch (err) {
      console.error("Failed to fetch schools:", err.message);
      alert("Сургуулиудыг татаж чадсангүй. Дахин нэвтэрнэ үү.");
      window.location.href = "/login";
      return [];
    }
  },

  getSchoolById: async (id) => {
    try {
      return await fetchWithAuth(`${BASE_URL}/schools/${id}`, {
        method: "GET",
      });
    } catch (err) {
      console.error("Failed to fetch school:", err.message);
      throw err;
    }
  },

  createSchool: async (body) => {
    try {
      const res = await fetchWithAuth(`${BASE_URL}/schools`, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
        },
      });
      return res;
    } catch (err) {
      console.error("Failed to create school:", err.message);
      throw err;
    }
  },

  updateSchool: async (id, body) => {
    try {
      return await fetchWithAuth(`${BASE_URL}/schools/${id}`, {
        method: "PUT",
        body: JSON.stringify(body),
        headers: { "Content-Type": "application/json" },
      });
    } catch (err) {
      console.error("Failed to update school:", err.message);
      throw err;
    }
  },
};

export const userAPI = {
  getAllUsers: async () => {
    try {
      const schools = await schoolAPI.getAllSchools();

      const usersArrays = await Promise.all(
        schools.map((school) => userAPI.getSchoolUsersById(school.id))
      );

      const allUsers = usersArrays.flat();

      console.log("All users from all schools:", allUsers);
      return allUsers;
    } catch (err) {
      console.error("Failed to fetch users:", err.message);
      alert("Хэрэглэгчдийг татаж чадсангүй. Дахин нэвтэрнэ үү.");
      window.location.href = "/login";
      return [];
    }
  },

  getSchoolUsersById: async (id) => {
    try {
      const data = await fetchWithAuth(
        `${BASE_URL}/schools/${id}/users?limit=350`,
        {
          method: "GET",
        }
      );
      return Array.isArray(data) ? data : data.items;
    } catch (err) {
      console.error(`Failed to fetch users for school ${id}:`, err.message);
      return [];
    }
  },

  createUser: async (body) => {
    try {
      const res = await fetchWithAuth(`${BASE_URL}/users`, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
        },
      });
      return res;
    } catch (err) {
      console.error("Failed to create user:", err.message);
      throw err;
    }
  },

  updateUser: async (id, body) => {
    try {
      const res = await fetchWithAuth(`${BASE_URL}/users/${id}`, {
        method: "PUT",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
        },
      });
      return res;
    } catch (err) {
      console.error(`Failed to update user ${id}:`, err.message);
      throw err;
    }
  },
};

export const courseAPI = {
  getCoursesBySchoolId: async (schoolId) => {
    try {
      const data = await fetchWithAuth(
        `${BASE_URL}/schools/${schoolId}/courses?limit=200`,
        {
          method: "GET",
        }
      );
      return Array.isArray(data) ? data : data.items;
    } catch (err) {
      console.error(
        `Failed to fetch courses for school ${schoolId}:`,
        err.message
      );
      return [];
    }
  },

  createCourse: async (id, body) => {
    try {
      const res = await fetchWithAuth(`${BASE_URL}/schools/${id}/courses`, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
        },
      });
      return res;
    } catch (err) {
      console.error("Failed to create course:", err.message);
      throw err;
    }
  },
};

export default {
  school: schoolAPI,
  user: userAPI,
  course: courseAPI,
};
