import React from "react";
import useCurrentUser from "./CurrentUser";
import Loading from "../components/Loading";
import ErrorState from "../components/ErrorState";
import UserDetails from "../components/UserDetails";

const CurrentUserPage = () => {
  const { user, loading, error } = useCurrentUser();

  if (loading) return <Loading />;
  if (error) return <ErrorState errorMessage={error} onRetry={() => window.location.reload()} />;
  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <UserDetails user={user} />
    </div>
  );
};

export default CurrentUserPage;
