import { MainNav } from "@/components/nav";
import { EditProfileCard } from "@/components/profile/edit-profile";
import { ProfileCard } from "@/components/profile/profile-card";
import { SettingsCard } from "@/components/profile/settings";

export default function Profile() {
  return (
    <div>
      <MainNav />

      <div className="m-8">
        <div className="text-4xl pb-6">Hi Tejas!</div>
        <div className="grid grid-cols-4 grid-rows-1 gap-4">
          <div>
            <ProfileCard />
          </div>
          <div className="col-start-4 row-start-1">
            <EditProfileCard />
          </div>
          <div className="col-span-2 col-start-2 row-start-1">
            <SettingsCard />
          </div>
        </div>
      </div>
    </div>
  );
}
