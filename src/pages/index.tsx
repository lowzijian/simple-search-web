"use client";

import { TextField } from "@components";
import useDebounce from "@hooks/useDebounce";
import { AxiosResponse } from "axios";
import { User, UserRes } from "@interfaces/user";
import moment from "moment";
import { NextPage } from "next";
import { ChangeEvent, useEffect, useState } from "react";
import client from "@utils/axios";
import { DATE_FORMAT } from "@utils/formats";

const UserCard = ({
  name,
  email,
  email_verified_at,
  created_at,
  updated_at,
}: User) => {
  return (
    <div className="flex flex-col bg-white dark:bg-neutral-800 drop-shadow-md text-neutral-800 dark:text-neutral-300 rounded-md	p-4 w-full">
      <p className="font-semibold text-base leading-normal">{name}</p>
      <p className="text-base text-neutral-800/60 dark:text-neutral-300/60 leading-tight mb-1 font-normal">
        {email}
      </p>
      <div className="flex flex-row space-x-2 text-indigo-600 dark:text-indigo-200 items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-patch-check"
          viewBox="0 0 16 16"
        >
          <path
            fillRule="evenodd"
            d="M10.354 6.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7 8.793l2.646-2.647a.5.5 0 0 1 .708 0z"
          />
          <path d="m10.273 2.513-.921-.944.715-.698.622.637.89-.011a2.89 2.89 0 0 1 2.924 2.924l-.01.89.636.622a2.89 2.89 0 0 1 0 4.134l-.637.622.011.89a2.89 2.89 0 0 1-2.924 2.924l-.89-.01-.622.636a2.89 2.89 0 0 1-4.134 0l-.622-.637-.89.011a2.89 2.89 0 0 1-2.924-2.924l.01-.89-.636-.622a2.89 2.89 0 0 1 0-4.134l.637-.622-.011-.89a2.89 2.89 0 0 1 2.924-2.924l.89.01.622-.636a2.89 2.89 0 0 1 4.134 0l-.715.698a1.89 1.89 0 0 0-2.704 0l-.92.944-1.32-.016a1.89 1.89 0 0 0-1.911 1.912l.016 1.318-.944.921a1.89 1.89 0 0 0 0 2.704l.944.92-.016 1.32a1.89 1.89 0 0 0 1.912 1.911l1.318-.016.921.944a1.89 1.89 0 0 0 2.704 0l.92-.944 1.32.016a1.89 1.89 0 0 0 1.911-1.912l-.016-1.318.944-.921a1.89 1.89 0 0 0 0-2.704l-.944-.92.016-1.32a1.89 1.89 0 0 0-1.912-1.911l-1.318.016z" />
        </svg>
        <p className="text-sm">
          {moment(email_verified_at).format(DATE_FORMAT)}
        </p>
      </div>

      {/* <p className="text-sm text-text-primary/30 dark:text-text-primary-dark/30 leading-tight">
        Created at {moment(created_at).format(DATE_FORMAT)}
      </p>
      <p className="text-sm text-text-primary/30 dark:text-text-primary-dark/30 leading-tight">
        Updated at {moment(created_at).format(DATE_FORMAT)}
      </p> */}
    </div>
  );
};

const Home: NextPage = () => {
  const [search, setSearch] = useState<string | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);

  const handleChangeSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
    setLoading(true);
  };

  const debounceSearch = useDebounce(search, 1000);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const {
          data: { data },
        }: AxiosResponse<UserRes> = await client("/users", {
          params: {
            query: debounceSearch,
          },
        });
        setUsers(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    fetchUsers();
  }, [debounceSearch]);

  return (
    <main className="min-h-screen h-full dark:bg-neutral-900 bg-white text-neutral-700 dark:text-neutral-100">
      <div className="flex flex-col container py-6 px-4 mx-auto space-y-2">
        <div className="mb-2 w-full">
          <h1 className="text-2xl font-semibold my-4">Users</h1>
          <TextField
            onChange={handleChangeSearch}
            placeholder="Search by name"
          />
        </div>
        <div className="flex flex-col space-y-2">
          {loading ? (
            <div role="status" className="self-center">
              <svg
                aria-hidden="true"
                className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-indigo-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <span className="sr-only">Loading...</span>
            </div>
          ) : users.length > 0 ? (
            users.map((val) => <UserCard {...val} key={val.id} />)
          ) : (
            <p className="text-base dark:text-neutral-500 text-neutral-600 self-center italic">
              No users found, from keyword <strong>{search}</strong>
            </p>
          )}
        </div>
      </div>
    </main>
  );
};

export default Home;
