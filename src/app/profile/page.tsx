import ProfileSection from "../component/profile/ProfileSection";
import { AuthProvider } from "../contexts/AuthContext";

export default function Profile() {
  return (
    <AuthProvider>
      <ProfileSection />
    </AuthProvider>
  );
}
