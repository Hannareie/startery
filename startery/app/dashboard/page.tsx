import { MainNav } from "@/components/nav";
import { EditProfileCard } from "@/components/profile/edit-profile";
import { ProfileCard } from "@/components/profile/profile-card";
import { SettingsCard } from "@/components/profile/settings";

export default function Dashboard() {
  return (
    <div>
      <MainNav />

      <div className="m-8">
        <div className="text-4xl pb-6">Dashboard</div>

        <div className="h-full w-full flex flex-wrap justify-center gap-4">
          <div className="grow h-[600px] border"></div>
          <div className="grow h-[600px] border"></div>
          <div className="grow h-[600px] border"></div>
        </div>
      </div>
    </div>
  );
}
