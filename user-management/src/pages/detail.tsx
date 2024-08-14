import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '@/app/store';
import { addUser, deleteUser, updateUser, fetchUsers } from '@/app/features/userSlice';
import { useMount } from 'ahooks';
import { useNavigate, Route, Routes } from "react-router-dom";
import { useParams } from 'react-router-dom';
import { message, Space, Button, Popconfirm } from 'antd';
import styles from './detail.module.less'
import { dateFormat, calculateAge } from '@/utils/date'
import { useRequest } from 'ahooks'
import { deleteAPI } from '@/api'
import Add from './components/add'
import React, { useRef } from 'react';

const Detail = () => {
  const addRef = useRef<{ open: () => void }>(null);
  const navigate = useNavigate()
  const { runAsync } = useRequest(deleteAPI, {
    manual: true
  })
  const users = useSelector((state: RootState) => state.users);
  const dispatch: AppDispatch = useDispatch();
  useMount(() => {
    return dispatch(fetchUsers());
  })

  const deleteUser = async () => {
    try {
      const res = await runAsync()
      if (res) {
        navigate('/list')
      }
    } catch (error) {
      message.error(error as string)
    }
  }
  let { id } = useParams();
  if (!id) {
    return 'null'
  }
  const detail = users.find(user => user.id === id);
  return (
    <div className={styles.container}>
      <Space>
        <Button
          onClick={() => {
            addRef?.current?.open()
          }}
        >编辑</Button>
        <Popconfirm
          title="Delete the user"
          description="Are you sure to delete this user?"
          onConfirm={deleteUser}
          okText="Yes"
          cancelText="No"
        >
          <Button >删除</Button>
        </Popconfirm>
      </Space>
      <div className={styles.item}>姓名：{detail?.name}</div>
      <div className={styles.item}>邮箱：{detail?.email}</div>
      <div className={styles.item}>性别：{detail?.gender}</div>
      <div className={styles.item}>身高：{detail?.height}</div>
      <div className={styles.item}>体重：{detail?.weight}</div>
      <div className={styles.item}>年龄：{calculateAge(detail?.birthday)}</div>
      <div className={styles.item}>生日：{dateFormat(detail?.birthday, 'YYYY-MM-DD')}</div>
      <div className={styles.item}>注册时间：{dateFormat(detail?.registeredAt, 'YYYY-MM-DD')}</div>
      <Add ref={addRef} detail={detail} />
    </div>
  );
};

export default Detail;
