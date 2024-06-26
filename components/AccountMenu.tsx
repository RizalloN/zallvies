import React from "react";
import { signOut } from "next-auth/react";
import useCurrentUser from "@/hooks/currentUser";
import { NextPageContext } from "next";
import { getSession } from "next-auth/react";
interface AccountMenuProps {
  visible?: boolean;
}

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/auth",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}
const AccountMenu: React.FC<AccountMenuProps> = ({ visible }) => {
  const { data: user } = useCurrentUser();
  if (!visible) {
    return null;
  }
  return (
    <div className="bg-black w-56 absolute top-14 right-0 py-5 flex-col border-2 border-gray-800 flex">
      <div className="flex flex-col gap-3">
        <div className="px-3 group/item flex flex-row items-center gap-3 w-full">
          <img
            className="w-8 rounded-md"
            src="/images/profile-yellow.png"
            alt="profile"
          />
          <p className="text-white text-sm group-hover/item:underline">
            {user?.name}
          </p>
        </div>
        <hr className="bg-gray-600 border-0 h-px my-4" />
        <div
          onClick={() => signOut()}
          className="px-3 text-center text-white text-sm hover:underline"
        >
          Sign out from Zallvies
        </div>
      </div>
    </div>
  );
};

export default AccountMenu;
