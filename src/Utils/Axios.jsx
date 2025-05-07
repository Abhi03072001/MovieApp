 import axios from "axios";

 const instance = axios.create({
   baseURL: "https://api.themoviedb.org/3/",
   headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmNjg4YjUwMzE5MjczMGMxN2ViMjEwNzk2ZThhYzVkMCIsIm5iZiI6MTc0NTc1NjAxMi43NDMsInN1YiI6IjY4MGUxZjZjNWIyZWJkNWI5NTM3ZjkxNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.e5GAdQniVNypBfxag3wTPvdDF_PLRRYsFLKhY_0yxbE'
  },
});

export default instance;