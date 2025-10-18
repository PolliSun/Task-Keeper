import { FC, useEffect, useState } from "react";
import { useCurrentUser } from "../../utils/hooks/useCurretUser/useCurretUser";
import { MobileView } from "../ui/mobile-view/mobile-view";
import { DesktopView } from "../ui/desktop-view/desktop-view";
import { Layout } from "../ui/layout/layout";

export const Dashboard: FC = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const { profile, isLogin } = useCurrentUser();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (profile.isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {isLogin ? (
        <Layout>{isMobile ? <MobileView /> : <DesktopView />}</Layout>
      ) : null}
    </>
  );
};
