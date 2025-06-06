// import { useEffect, useState } from "react";
// import axios from "../api/axios";
// import { User } from "../types/User";

// export default function HomePage() {
//   const [user, setUser] = useState<User | null>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const token = localStorage.getItem("access_token");
//     if (!token) {
//       setLoading(false);
//       return;
//     }

//     axios
//       .get("/users/me")
//       .then((res) => setUser(res.data.data))
//       .catch(() => setUser(null))
//       .finally(() => setLoading(false));
//   }, []);

//   const handleLogout = () => {
//     localStorage.removeItem("access_token");
//     localStorage.removeItem("refresh_token");
//     window.location.href = "/";
//   };

//   if (loading) {
//     return <div>로딩 중...</div>;
//   }

//   return (
//     <div>
//       <h1>홈페이지</h1>
//       {user ? (
//         <>
//           <p>
//             <strong>이메일:</strong> {user.email}
//           </p>
//           <p>
//             <strong>이름:</strong> {user.name}
//           </p>
//           <p>
//             <strong>소셜:</strong> {user.provider}
//           </p>
//           <p>
//             <strong>역할:</strong> {user.role}
//           </p>
//           <button onClick={handleLogout}>로그아웃</button>
//           <br />
//           <a href="/users">유저 목록 보기</a>
//         </>
//       ) : (
//         <>
//           <p>로그인이 필요합니다.</p>
//           <a href="http://kulift.com/oauth2/authorization/github">
//             GitHub 로그인
//           </a>{" "}
//           <br />
//           <a href="http://kulift.com/oauth2/authorization/google">
//             Google 로그인
//           </a>
//         </>
//       )}
//     </div>
//   );
// }
