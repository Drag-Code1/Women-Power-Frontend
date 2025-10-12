import ProfileSection from "../component/profile/ProfileSection";
import { AuthProvider } from "../contexts/AuthContext";

export default function ProfilePage() {
  return (
    <AuthProvider>
      <ProfileSection />
    </AuthProvider>
  );
}