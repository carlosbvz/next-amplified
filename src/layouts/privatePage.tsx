import { ReactNode, useEffect, useState } from "react";
import { useUser } from "../context/AuthContext";
import { useRouter } from "next/router";

type Props = {
  isPrivatePage?: boolean;
  children: ReactNode;
};

export default function PageLayout({ isPrivatePage, children }: Props) {
  const { user, userStatus } = useUser();
  const router = useRouter();
  const [canAccessPage, setCanAccessPage] = useState<boolean>(
    isPrivatePage ? false : true
  );

  // On load and when user data changes.
  useEffect(() => {
    if (!isPrivatePage || user) {
      setCanAccessPage(true);
    }
    if (userStatus === "resolved" && !user) {
      router.push("/login");
    }
  }, [user, userStatus]);

  if (canAccessPage) {
    return <>{children}</>;
  } else {
    return <p>Loading</p>;
  }
}
