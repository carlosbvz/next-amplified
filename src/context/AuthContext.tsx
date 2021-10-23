import {
  createContext,
  Dispatch,
  ReactElement,
  SetStateAction,
  useContext,
  useEffect,
} from "react";
import Auth, { CognitoUser } from "@aws-amplify/auth";
import { Hub } from "aws-amplify";
import { useAsync } from "../utils/hooks/useAsync";

interface UserContextType {
  user: CognitoUser | null;
  setUser: Dispatch<SetStateAction<CognitoUser>>;
  userStatus: string;
}

const UserContext = createContext<UserContextType>({} as UserContextType);

interface Props {
  children: React.ReactElement;
}

export default function AuthContext({ children }: Props): ReactElement {
  const {
    data: user,
    status: userStatus,
    error,
    run,
    setData: setUser,
  } = useAsync();

  // Checks for user on every load
  useEffect(() => {
    checkUser();
  }, []);

  // Listens to 'auth' events (sign in, sign out, etc...)
  useEffect(() => {
    Hub.listen("auth", () => {
      checkUser();
    });
  }, []);

  // In case of an async error
  useEffect(() => {
    if (error) setUser(null);
  }, [error]);

  async function checkUser() {
    try {
      run(Auth.currentAuthenticatedUser());
    } catch (error) {
      setUser(null);
    }
  }

  return (
    <UserContext.Provider value={{ user, setUser, userStatus }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUser = (): UserContextType => useContext(UserContext);
