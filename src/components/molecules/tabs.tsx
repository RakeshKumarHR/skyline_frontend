"use client";
import React, { JSX, useCallback, useState } from "react";
import Typography from "../atoms/typography";

export interface TabOption {
  readonly id: string | number;
  label: string;
  count: number | null;
}

export interface TabsProps {
  list: TabOption[];
  onSelect: (id: number | string) => void;
}

export default function Tabs({ list, onSelect }: TabsProps): JSX.Element {
  const [selected, setSelected] = useState<string | number>(list[0].id);
  const renderList = useCallback((): JSX.Element[] => {
    return list.map((ele) => {
      return (
        <div
          onClick={() => {
            setSelected(ele.id);
            onSelect(ele.id);
          }}
          className={`flex flex-row gap-1 px-1 py-0.5 rounded-[12px] cursor-pointer ${
            selected === ele.id && "bg-white"
          }`}
          key={ele.id}
        >
          <Typography className="!text-[10px]">{ele.label}</Typography>
          {!!ele.count && (
            <Typography className="!text-[10px]">({ele.count})</Typography>
          )}
        </div>
      );
    });
  }, [list, selected]);
  return (
    <div className="bg-[#ECECF0] p-1 flex flex-row gap-2 self-start rounded-[12px]">
      {renderList()}
    </div>
  );
}
