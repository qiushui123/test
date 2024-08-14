import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '@/app/store';
import { fetchUsers } from '@/app/features/userSlice';
import { useMount } from 'ahooks';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Table, Space, Button } from 'antd';
import { useMemo, useRef } from 'react';
import { dateFormat, calculateAge } from '@/utils/date'
import { UserState } from '@/definitions/user.type'
import styles from './list.module.less'
import Add from './components/add'
import { useNavigate } from "react-router-dom";

const List = () => {
  const navigate = useNavigate()
  const users = useSelector((state: RootState) => state.users);
  const addRef = useRef<{ open: () => void }>(null);
  
  const dispatch: AppDispatch = useDispatch();
  useMount(() => {
    return dispatch(fetchUsers());
  })

  const columns = useMemo(() => {
    return [
      {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
        sorter: true,
      },
      {
        title: '姓名',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '邮箱',
        dataIndex: 'email',
        key: 'email',
      },
      {
        title: '性别',
        dataIndex: 'gender',
        key: 'gender',
      },
      {
        title: '身高',
        dataIndex: 'height',
        key: 'height',
      },
      {
        title: '体重',
        dataIndex: 'weight',
        key: 'weight',
      },
      {
        title: '年龄',
        sorter: true,
        render: (_text: undefined, record: UserState) => {
          return calculateAge(record?.birthday)
        }
      },
      {
        title: '生日',
        dataIndex: 'birthday',
        key: 'birthday',
        sorter: true,
        render: (text: string) => {
          return dateFormat(text, 'YYYY-MM-DD')
        }
      },
      {
        title: '注册时间',
        dataIndex: 'registeredAt',
        key: 'registeredAt',
        sorter: true,
        render: (text: string) => {
          return dateFormat(text)
        }
      },
      {
        title: '操作',
        render: (_text: undefined, record: UserState) => {
          return (
            <Space >
              <Button onClick={() => {
                navigate('/detail/' + record?.id)
              }} type='link'>查看</Button>
            </Space>
          )
        }
      },
    ];
  }, [])


  return (
    <div className={styles.container}>
      <Button type="primary" className={styles.button} onClick={() => {
        addRef.current?.open()
      }}>添加</Button>
      <Table dataSource={users} columns={columns} rowKey="id" />;
      <Add ref={addRef} />
    </div>
  );
};

export default List;
