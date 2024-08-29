import { MainNav } from "@/components/nav";
import { ProfileCard } from "@/components/profile/profile-card";
import { SettingsCard } from "@/components/profile/settings";

export default function Profile() {
  return (
    <div>
      <MainNav />

      <div className="m-8">
        <div className="text-4xl pb-6">Hi Tejas!</div>
        <div className="flex gap-10">
          <ProfileCard />
          <SettingsCard />
        </div>
      </div>
    </div>
  );
}
