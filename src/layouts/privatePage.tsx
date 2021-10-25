import { ReactNode, useEffect, useState } from "react";
import { useUser } from "../context/AuthContext";
import { useRouter } from "next/router";

type Props = {
  children: ReactNode;
};

export default function PageLayout({ children }: Props) {
  const { user, userStatus } = useUser();
  const router = useRouter();
  const [canAccessPage, setCanAccessPage] = useState<boolean>(false);

  // On load and when user data changes.
  useEffect(() => {
    checkPrivatePage();
  }, [user, userStatus]);

  function checkPrivatePage() {
    if (userStatus === "resolved") {
      if (user) {
        setCanAccessPage(true);
      } else {
        router.push("/login");
      }
    }
  }

  if (canAccessPage) {
    return <>{children}</>;
  } else {
    return <p>Loading</p>;
  }
}
