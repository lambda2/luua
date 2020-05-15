import React, { useContext, useState, useEffect } from 'react';
import { Select } from 'antd';
import UserContext from '../../contexts/UserContext';
import { fetch, getHeaders } from '../../utils/http';
import { useQuery, AnyQueryKey } from 'react-query'
import { useField } from 'formik';
import find from 'lodash/find';

const { Option } = Select;

declare interface Props {
  value?: string
  onChange: (id: number) => void
  name?: string
  placeholder?: string
  workspace_id: number
  isDisabled?: boolean
}

const DiscussionCategorySelect = ({
  value,
  onChange,
  workspace_id,
  ...props
}: Props) => {

  const { currentUser } = useContext(UserContext)
  const headers = getHeaders(currentUser && currentUser.jwt || '');
  const getDiscussionCategories = (opts: any) => 
    fetch<DiscussionCategory[]>(`/api/workspaces/${workspace_id}/categories`, { headers, ...opts })

    
  const { status, data, error } = useQuery<DiscussionCategory[], AnyQueryKey>(['discussion_categories', workspace_id], getDiscussionCategories)  
  const [list, setList] = useState<DiscussionCategory[]>(data || [])

  const handleSearch = ((q: string) => {
    if (q) {
      data && setList(data?.filter((r: DiscussionCategory) => r.name.toLowerCase().search(q.toLowerCase()) >= 0))
    } else {
      setList(data || [])
    }
  })

  useEffect(() => {
    setList(data || [])
    if (value === undefined && data && data[0]) {
      onChange(data[0]?.id)
    }
  }, [status])

  const options = list.map((d: DiscussionCategory) => <Option value={`${d.id}`} key={`${d.id}`}>
    {d.name}
  </Option>);

  return (
    <Select
      showSearch
      value={value}
      defaultValue={list && list[0]?.id?.toString()}
      placeholder={props.placeholder}
      // style={this.props.style}
      defaultActiveFirstOption={true}
      showArrow={true}
      filterOption={false}
      onSearch={handleSearch}
      onChange={(value: any) => {
        onChange(value)
      }}
      // notFoundContent={null}
    >
      {options}
    </Select>
  );
}

interface FormProps {
  name: string
  workspace_id: number
  placeholder?: string
}

export const FormDiscussionCategorySelect = ({
  name,
  workspace_id,
  ...props
}: FormProps) => {

  const [field, meta, helpers] = useField<string>(name);

  const { value } = meta;
  const { setValue } = helpers;

  return (
    <>
      <div>
        <DiscussionCategorySelect
          {...props}
          workspace_id={workspace_id}
          value={value}
          onChange={(e: number) => setValue(`${e}`)}
        />
      </div>
      {meta.touched && meta.error ? (
        <div className='error'>{meta.error}</div>
      ) : null}
    </>
  );
}

export default FormDiscussionCategorySelect