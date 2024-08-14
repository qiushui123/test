import React, { useImperativeHandle, forwardRef, useState } from "react";
import { Modal, Form, Select, Input, DatePicker, message } from 'antd'
import { addAPI } from '@/api'
import { useRequest, useUpdateEffect } from "ahooks";
import { useNavigate } from "react-router-dom";
import { UserState } from '@/definitions/user.type'
import dayjs from "dayjs";

const Option = Select.Option



interface Props {
  detail: UserState
}

const Add = forwardRef((props: Props, ref) => {
  const {detail} = props;
  const navigate = useNavigate()
  const [heightAfterValue, setHeightAfterValue] = useState('cm');
  const [weightAfterValue, setWeightAfterValue] = useState('kg');
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [form] = Form.useForm();
  const { runAsync, loading } = useRequest(addAPI, {
    manual: true
  })
  useImperativeHandle(ref, () => {
    return {
      open: () => {
        setIsModalOpen(true)
      }
    }
  })
  const submit = async () => {
    const data = form.getFieldsValue()
    const newData = {
      ...data,
      height: data.height + heightAfterValue,
      weight: data.weight + weightAfterValue
    }
    try {
      const res = await runAsync(newData)
      if (res) {
        form.resetFields()
        setIsModalOpen(false)
        navigate('/detail/' + res.id)
      }
    } catch (error) {
      message.error(error as string)
    }
  }

  useUpdateEffect(()=> {
    if(detail) {
      const heightArray = detail.height?.split(' ')
      const weightArray = detail.weight?.split(' ')

      form.setFieldsValue({
        ...detail,
        registeredAt: dayjs(detail.registeredAt),
        birthday:  dayjs(detail.birthday),
        height: heightArray[0],
        weight: weightArray[0],
      })
      setHeightAfterValue(heightArray[1])
      setWeightAfterValue(weightArray[1])
    }
  }, [detail])

  const selectHeightAfter = (
    <Select value={heightAfterValue} onChange={setHeightAfterValue}>
      <Option value="cm">cm</Option>
      <Option value="m">m</Option>
    </Select>
  );
  
  const selectWeightAfter = (
    <Select defaultValue={weightAfterValue} onChange={setWeightAfterValue}>
      <Option value="kg">kg</Option>
      <Option value="g">g</Option>
    </Select>
  );

  return (
    <Modal
      title="添加"
      open={isModalOpen}
      onOk={submit}
      onCancel={() => {
        form.resetFields()
        setIsModalOpen(false)
      }}
      confirmLoading={loading}
    >
      <Form
        form={form}
        name="control-hooks"
        style={{ maxWidth: 600 }}
      >
        <Form.Item name="name" label="姓名" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="email" label="邮箱" rules={[{ required: true }, {
          type: 'email',
          message: 'The input is not valid E-mail!',

        }]}>
          <Input />
        </Form.Item>
        <Form.Item name="gender" label="性别" rules={[{ required: true }]}>
          <Select
            placeholder="选择性别"
            allowClear
          >
            <Option value="male">male</Option>
            <Option value="female">female</Option>
          </Select>
        </Form.Item>
        <Form.Item name="height" label="身高" rules={[{ required: true }]}>
          <Input addonAfter={selectHeightAfter} type="string" />
        </Form.Item>
        <Form.Item name="weight" label="体重" rules={[{ required: true }]}>
          <Input addonAfter={selectWeightAfter} type="string" />
        </Form.Item>
        <Form.Item name="birthday" label="生日" rules={[{ required: true }]}>
          <DatePicker />
        </Form.Item>
        <Form.Item name="registeredAt" label="注册时间" rules={[{ required: true }]}>
          <DatePicker />
        </Form.Item>
      </Form>
    </Modal>
  )
})

export default Add