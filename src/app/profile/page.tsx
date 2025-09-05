"use client";
import Typography from "@/components/atoms/typography";
import Tabs, { TabOption, TabsProps } from "@/components/molecules/tabs";
import { JSX, useState } from "react";

const user = {
  firstName: "John",
  lastName: "Traveler",
  email: "rakesh@gmail.com",
};

const tabList: TabOption[] = [
  {
    id: 2,
    label: "Comments",
    count: 2,
  },
  {
    id: 3,
    label: "Ratings",
    count: 2,
  },
];
export default function Profile(): JSX.Element {
  const [selectedTab, setSelectedTab] = useState(tabList[0].id);
  return (
    <div className="flex flex-col gap-2">
      <div>
        <Typography className="text-[12px]">
          {user.firstName} {user.lastName}
        </Typography>
        <Typography className="text-[10px] text-gray-500">
          {user.email}
        </Typography>
      </div>
      <Tabs
        list={tabList}
        onSelect={(id) => {
          setSelectedTab(id);
        }}
      />
    </div>
  );
}
