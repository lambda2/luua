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
  region_id?: number
  isDisabled?: boolean
}

const CountrySelect = ({
  value,
  onChange,
  region_id,
  ...props
}: Props) => {

  const { currentUser } = useContext(UserContext)
  const headers = getHeaders(currentUser && currentUser.jwt || '');
  const getCountries = (opts: any) => 
    fetch<Country[]>(`/api/countries${region_id ? `?region_id=${region_id}` : ''}`, { headers, ...opts })

    
  const { status, data, error } = useQuery<Country[], AnyQueryKey>(['countries', region_id], getCountries)  
  const [list, setList] = useState<Country[]>(data || [])

  const handleSearch = ((q: string) => {
    if (q) {
      data && setList(data?.filter((r: Country) => r.name.toLowerCase().search(q.toLowerCase()) >= 0))
    } else {
      setList(data || [])
    }
  })

  useEffect(() => {
    setList(data || [])
  }, [status])

  const options = list.map((d: Country) => <Option value={`${d.id}`} key={`${d.id}`}>{d.name}</Option>);
  return (
    <Select
      showSearch
      value={value}
      defaultValue={value}
      placeholder={props.placeholder}
      // style={this.props.style}
      defaultActiveFirstOption={false}
      showArrow={false}
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
  placeholder?: string
}

export const FormCountrySelect = ({
  name,
  ...props
}: FormProps) => {

  const [field, meta, helpers] = useField<string>(name);

  const { value } = meta;
  const { setValue } = helpers;

  return (
    <>
      <div>
        <CountrySelect
          {...props}
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

export default CountrySelect