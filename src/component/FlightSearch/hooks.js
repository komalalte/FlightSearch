import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadList } from "../../redux/actions";
export const useSesssionList = () => {
  const dispatch = useDispatch();
  const users = useSelector((usersReducers) => usersReducers?.data);

  useEffect(() => {
    dispatch(loadList());
  }, []);
  return {
    users,
  };
};
