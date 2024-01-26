"use client";
import Link from "next/link";
import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { useCookies } from "next-client-cookies";
import { User } from "@/types/types";
import fetchUserData from "@/utils/fetchUserData";
import ThemeToggler from "./ThemeToggler";
import { checkIfIsAdmin } from "@/utils/checkIfIsAdmin";
import { useRouter } from "next/navigation";
import { useTokenDispatch } from "@/app/components/TokenContext";
import { Type } from "@/app/components/tokenReducer";
import Loading from "./Loading";
import axios from "axios";
import SVG from "react-inlinesvg";

function NavBar() {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | undefined>(undefined);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [avatarImg, setAvatarImg] = useState<string | null>(null);
  const cookieStore = useCookies();
  const router = useRouter();
  const tokenDispatch = useTokenDispatch();

  useEffect(() => {
    setToken(cookieStore.get("token"));
    const fetchUser = async () => {
      if (user !== null) return;
      if (token !== undefined) {
        const userData = await fetchUserData(token);
        if (!userData) {
          cookieStore.remove("token");
          return;
        }
        if (!userData) {
          cookieStore.remove("token");
          router.refresh();
        }
        setUser(userData);
      }
    };
    const checkIfIsValid = async () => {
      if (token === undefined) return;
      const checkIsAdmin = await checkIfIsAdmin(token);
      setIsAdmin(checkIsAdmin);
    };
    checkIfIsValid();
    const setAvatar = async () => {
      if (user === null) return "";
      const avatar = sessionStorage.getItem(
        `avatar-${user.firstName + user.lastName}`,
      );
      if (avatar !== null) {
        setAvatarImg(avatar);
        return;
      }
      fetch(
        "https://api.multiavatar.com/" +
          JSON.stringify(user.firstName + " " + user.lastName),
      )
        .then((res) => res.text())
        .then((svg) => {
          sessionStorage.setItem(
            `avatar-${user.firstName + user.lastName}`,
            svg,
          );
          setAvatarImg(svg);
        });
    };

    setAvatar();
    fetchUser();
  }, [token, cookieStore, router, user]);

  if (tokenDispatch === null) return <Loading />;

  return (
    <nav className="bg-base-200 p-4 px-10 flex justify-between items-center">
      <h1 className="font-bold">Cinema</h1>
      <div className="flex gap-4">
        <Suspense fallback={<div>Loading...</div>}>
          {token ? (
            <div className="flex justify-center items-center gap-3">
              <Link
                href="/account"
                className="text-base-conent tooltip tooltip-bottom"
                data-tip="Go to profile"
              >
                {user !== null &&
                avatarImg !== null &&
                user.lastName !== undefined ? (
                  <div className="w-12 h-12">
                    <SVG src={avatarImg}></SVG>
                  </div>
                ) : (
                  <div className="loading"></div>
                )}
              </Link>
              <button
                className="btn btn-warning"
                onClick={() => {
                  cookieStore.remove("token");
                  tokenDispatch({ type: Type.REMOVE_TOKEN, payload: "" });
                  window.location.reload();
                }}
              >
                Sign out
              </button>
              {isAdmin && (
                <Link className="btn btn-primary" href="/admin">
                  Admin Page
                </Link>
              )}
            </div>
          ) : (
            <div className="flex space-x-4">
              <Link className="btn btn-primary" href="/login">
                Login
              </Link>
              <Link className="btn btn-primary" href="/register">
                Register
              </Link>
            </div>
          )}
        </Suspense>
        <ThemeToggler />
      </div>
    </nav>
  );
}

export default NavBar;
