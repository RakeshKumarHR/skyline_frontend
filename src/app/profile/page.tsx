import { JSX } from "react";
import { getProfile } from "../../../services/profile";
import ProfilePage from ".";

export default async function Profile(): Promise<JSX.Element | null> {
  const data = await getProfile();
  if (!data) {
    return null;
  }

  return <ProfilePage profileDetails={data} />;
}
