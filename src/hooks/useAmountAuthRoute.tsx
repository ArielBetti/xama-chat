'use client'
import { IUser } from '@/interfaces';
import { useUser } from '@/store/user';
import { useEffect, useState } from 'react'

const useAmountAuthRoute = () => {
  const user = useUser();
  const [userLoader, setUserLoader] = useState<IUser | null>();

  useEffect(() => {
    setUserLoader(user);
  }, [user]);


  return {
    userLoader,
  }
}

export default useAmountAuthRoute;
