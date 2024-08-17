import { Register } from "./pages/Register";
import{BrowserRouter, Route, Routes} from 'react-router-dom'
import LoginPage from "./pages/LoginPage";
import { LogoutPage } from "./pages/Logoutpage";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./ProtectedRoute";
import Chat from "./pages/Chat";
import { MessageProvider } from "./context/MessageContext";
import { ChatProvider } from "./context/ChatContext";

export default function App() {
  return (
    <AuthProvider>
      <ChatProvider>
      <MessageProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/"element={<LoginPage/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/login" element={<LoginPage/>}/>
            <Route path="/logout" element={<LogoutPage/>}/>
            <Route element={<ProtectedRoute/>}>
            <Route path="/chat" element={<Chat/>}/>
            </Route>
          </Routes>
        </BrowserRouter>
      </MessageProvider>
      </ChatProvider>
    </AuthProvider>
  )
}
