import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Home";
import Reports from "./Reports";
import Login from "./Login";
import { AuthContextProvider } from "./Auth";
import Members from "./Members";
import ProtectedRoute from "./context/ProtectedRoute";

function App() {
  return (
    <AuthContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/reports"
            element={
              <ProtectedRoute>
                <Reports />
              </ProtectedRoute>
            }
          />
          <Route
            path="/list"
            element={
              <ProtectedRoute>
                <Members />
              </ProtectedRoute>
            }
          />
          {/* <PrivateRoute exact path="/" component={<Home />} />
          <Route exact path="/login" component={<Login />} /> */}
          {/* <Route path="/" element={<Login />}>
              <Route index element={<Login />} />
            </Route> */}
          {/* <PrivateRoute path="/" element={<Home />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/login" element={<Login />} /> */}
        </Routes>
      </BrowserRouter>
    </AuthContextProvider>
  );
}

export default App;

// import "./App.css";
// import { BrowserRouter, Route, Routes } from "react-router-dom";
// import Home from "./Home";
// import Reports from "./Reports";
// import Login from "./Login";
// import { AuthProvider } from "./Auth";

// function App() {
//   return (
//     <>
//       <AuthProvider>
//         <BrowserRouter>
//           <Routes>
//             <Route path="/" element={<Login />}>
//               <Route index element={<Login />} />
//             </Route>
//             <Route path="/home" element={<Home />} />
//             <Route path="/reports" element={<Reports />} />
//             <Route path="/login" element={<Login />} />
//           </Routes>
//         </BrowserRouter>
//       </AuthProvider>
//     </>
//   );
// }

// export default App;

{
  /* <>
<AuthProvider>
  <BrowserRouter>
    <Routes>
      {/* <Route path="/" element={<Login />}>
        <Route index element={<Login />} />
      </Route> */
}
//       <PrivateRoute path="/" element={<Home />} />
//       <Route path="/reports" element={<Reports />} />
//       <Route path="/login" element={<Login />} />
//     </Routes>
//   </BrowserRouter>
// </AuthProvider>
// </> */}
