import {
  HiOutlineViewGrid,
  HiOutlineCube,
  HiOutlineShoppingCart,
  HiOutlineUsers,
  HiOutlineQuestionMarkCircle,
  HiOutlineCog,
  HiChevronRight,
  HiOutlineLocationMarker,
  HiDatabase,
  HiOutlineChartSquareBar,
  HiOutlineUserGroup,
  HiOutlineUserCircle,
  HiOutlineUserAdd,
  HiOutlinePlay,
  HiOutlineHome,
  HiOutlineLightBulb,
} from "react-icons/hi";
let Type = localStorage.getItem("Type");

export const DASHBOARD_SIDEBAR_LINKS =
  Type == "main-admin" || Type == "admin" // MAIN_ADMIN - ADMIN
    ? [
        {
          key: "dashboard",
          label: "ภาพรวม (ง3/3)",
          path: "/admin",
          icon: <HiOutlineViewGrid />,
        },
        {
          key: "basicHome_1",
          label: "ข้อมูลบ้านแชร์",
          path: "/admin/basic/home",
          icon: <HiOutlineHome />,
        },
        {
          key: "basicHome_2",
          label: "ข้อมูลวงแชร์",
          path: "/admin/basic/wong",
          icon: <HiOutlineLightBulb />,
        },
 
        Type == "admin"
          ? { key: "noData" }
          : {
              key: "CrudAdmin",
              label: "ข้อมูลผู้ดูแลระบบ",
              path: "/admin/crud-admin",
              icon: <HiOutlineUsers />,
            },

        {
          key: "ManageBasicHome",
          label: "บ้านแชร์-พนักงาน",
          path: "/admin/home-share",
          icon: <HiDatabase />,
        },
        {
          key: "ManageUser",
          label: "ข้อมูลลูกแชร์",
          path: "/admin/manage-user",
          icon: <HiOutlineShoppingCart />,
        },
      ]
    : Type == "user" // USER
    ? [
        {
          key: "dashboard",
          label: "ภาพรวม (ง3/3)",
          path: "/user",
          icon: <HiOutlineViewGrid />,
        },
        {
          key: "addToWongShare",
          label: "ขอเข้าวงแชร์",
          path: "/user/add-to-wong-share",
          icon: <HiOutlineUserAdd />,
        },
        {
          key: "myHomeShare",
          label: "บ้านแชร์ของฉัน (ง3/3)",
          path: "/user/my-wong",
          icon: <HiOutlineLocationMarker />,
        },
        {
          key: "user-report",
          label: "รายงาน (ง3/3)",
          path: "/admin",
          icon: <HiOutlineChartSquareBar />,
        },
      ]
    : Type == "home" || Type == "member" // HOME
    ? [
        {
          key: "home-dashboard",
          label: "ภาพรวม (ง3/3)",
          path: "/home",
          icon: <HiOutlineViewGrid />,
        },
        {
          key: "home-homeShare",
          label: "ลูกแชร์",
          path: "/home/manage-user",
          icon: <HiOutlineUserCircle />,
        },
        {
          key: "home-homeShare",
          label: "วงแชร์",
          path: "/home/wong-share",
          icon: <HiOutlineCube />,
        },
        Type == "home" ? {
          key: "home-homeShare",
          label: "พนักงาน",
          path: "/home/member",
          icon: <HiOutlineUserGroup />,
        } : {key: "noData"},
        {
          key: "play-share",
          label: "เล่นแชร์ (ง3/3)",
          path: "/home/play",
          icon: <HiOutlinePlay />,
        },
        {
          key: "home-homeShare",
          label: "รายงาน (ง3/3)",
          path: "/home/report",
          icon: <HiOutlineChartSquareBar />,
        },
      ]
    : Type == "member"
    ? [
        {
          key: "dashboard",
          label: "member",
          path: "/admin",
          icon: <HiOutlineViewGrid />,
        },
      ]
    : [];

export const DASHBOARD_SIDEBAR_BOTTOM_LINKS = [
  {
    key: "settings",
    label: "ข้อมูลส่วนตัว (ง3/3)",
    path: "/settings",
    icon: <HiOutlineCog />,
  },
];
