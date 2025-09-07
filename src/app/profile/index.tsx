"use client";
import Typography from "@/components/atoms/typography";
import Tabs, { TabOption } from "@/components/molecules/tabs";
import { JSX, useMemo, useState } from "react";
import { ProfileResponse } from "../../../services/profile";
import Comments from "./comments";
import Ratings from "./ratings";
import { TypographyVariant } from "../../../enums/typography";

interface ProfilePageProps {
  profileDetails: ProfileResponse;
}
export default function ProfilePage({
  profileDetails,
}: ProfilePageProps): JSX.Element {
  const {
    user: { name, email },
    comments,
    ratings,
  } = profileDetails;

  const tabList = useMemo((): TabOption[] => {
    return [
      {
        id: 1,
        label: "Comments",
        count: comments.length,
      },
      {
        id: 2,
        label: "Ratings",
        count: ratings.length,
      },
    ];
  }, [comments, ratings]);
  const [selectedTab, setSelectedTab] = useState(tabList[0].id);
  const userInitials = name
    ?.split(" ")
    .map((n) => n[0])
    .join("");

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <div className="flex h-8 w-8 rounded-full items-center justify-center bg-[#155DFC2f]">
          <Typography className="text-[#155DFC]">{userInitials}</Typography>
        </div>
        <div>
          <Typography className="text-[12px]">{name}</Typography>
          <Typography className="text-[10px] text-gray-500">{email}</Typography>
        </div>
      </div>
      <Tabs
        list={tabList}
        onSelect={(id) => {
          setSelectedTab(id);
        }}
      />
      {selectedTab === 1 ? (
        <Comments comments={comments} />
      ) : (
        <Ratings ratings={ratings} />
      )}
    </div>
  );
}
