import React from "react";
import {
	BellIcon,
	HashtagIcon,
	BookmarkIcon,
	ListBulletIcon,
	EllipsisHorizontalCircleIcon,
	EnvelopeIcon,
	UserIcon,
	HomeIcon,
} from "@heroicons/react/24/outline";
import SidebarRow from "./SidebarRow";

function Sidebar() {
	return (
		<div className="flex flex-col col-span-2 items-cener px-4 md:items-start">
			<img
				className="m-3 h-10 w-10"
				src="https://links.papareact.com/drq"
				alt=""
			/>
			<SidebarRow Icon={HomeIcon} title="Home" />
			<SidebarRow Icon={HashtagIcon} title="Explore" />
			<SidebarRow Icon={BellIcon} title="Notification" />
			<SidebarRow Icon={EnvelopeIcon} title="Message" />
			<SidebarRow Icon={BookmarkIcon} title="Bookmarks" />
			<SidebarRow Icon={ListBulletIcon} title="Lists" />
			<SidebarRow Icon={UserIcon} title="Sign In" />
			<SidebarRow Icon={EllipsisHorizontalCircleIcon} title="More" />
		</div>
	);
}

export default Sidebar;
