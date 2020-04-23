// import { Upload, message } from 'antd';
// import { useState } from 'react';
// import { RcCustomRequestOptions } from 'antd/lib/upload/interface';

import { useState, ChangeEvent, ReactNode, useContext } from "react";

import './UserSkillsSelect.module.less'
import { Button, Col, Card, Row, Modal, Form, Select, Radio, Switch } from "antd";
import querystring from 'querystring';
import { fetch, getHeaders } from "../../utils/http";
import UserContext from "../../contexts/UserContext";
import { useLocale } from "../../hooks/useLocale";

const { Option } = Select;

interface UserSkill {
  skill_id: number
  level?: number
  name?: string,
  description?: string,
  icon?: string,
}

interface Props {
  title?: string | ReactNode
  addLabel?: string,
  onOk: any,
  onCancel: any,
  selected?: number[],
}

const UserSkillsModal = ({
  title,
  onOk,
  onCancel,
  addLabel,
  selected = [],
  ...props
}: Props) => {

  const { t } = useLocale()

  const [data, setData] = useState<any[]>([])
  const [skill, setSkill] = useState<any>(null)
  const [skillCategory, setSkillCategory] = useState<SkillCategory | null>(null)
  const [level, setSkillLevel] = useState<number>(2)
  const [modalVisible, setModalVisible] = useState<boolean>(false)
  const { currentUser } = useContext(UserContext)
  const headers = getHeaders(currentUser && currentUser.jwt || '');


  const showModal = () => {
    setModalVisible(true);
  };

  const onHandleOk = (e: any) => {
    console.log(e);

    const payload = {
      skill_id: skill.id,
      name: skill.name,
      level: level,
      category: skillCategory,
    }

    setModalVisible(false);
    setData([])
    setSkill(null)
    setSkillLevel(2)
    setSkillCategory(null)

    onOk(payload)
  };

  const onHandleCancel = (e: any) => {
    console.log(e);
    setModalVisible(false);
    setSkillCategory(null)
    onCancel(e)
  };

  let timeout: number | null;
  let currentValue: string | null;

  const search = (value: string, callback: any) => {
    if (timeout) {
      clearTimeout(timeout);
      timeout = null;
    }
    currentValue = value;

    // @TODO move this into api helpers
    const query = async () => {
      const str = querystring.encode({
        code: 'utf-8',
        q: value,
      });
      const skills = await fetch<Skill[]>(`/api/skill_categories/${skillCategory}/skills?${str}`, { headers })
      callback(skills)
    }

    timeout = setTimeout(query, 300);
  }

  const handleSearch = (value: string) => {
    if (value) {
      search(value, (data: any) => setData(data))
    } else {
      setData([])
    }
  };

  const handleCategoryChange = (category: SkillCategory) => {    
    setSkillCategory(category);
    fetch<Skill[]>(`/api/skill_categories/${category}/skills`, { headers })
      .then(e => {
        console.log("Setting data to", e);
        
        setData(e)
      })
  };

  const handleChange = (value: any, option: any) => {
    console.log({ value, option});
    
    setSkill({id: value, name: option.key});
  };

  const options = data.filter(e => !selected.includes(e.id)).map((d: {id: number, name: string}) =>
    <Option disabled={selected.includes(d.id)} value={d.id} key={d.name}>{d.name}</Option>
  );

  return (
    <>
      <Button block type="primary" onClick={showModal}>
        {addLabel || t('add-skill')}
      </Button>
      <Modal
        title={title}
        visible={modalVisible}
        onOk={onHandleOk}
        onCancel={onHandleCancel}
      >
        { !skillCategory && <>
          <h2>{t('form.skill_category.title')}</h2>
          <Radio.Group onChange={(e) => handleCategoryChange(e.target.value)} defaultValue="">
            <Radio.Button value="language">{t('form.skill_category.language')}</Radio.Button>
            <Radio.Button value="technical">{t('form.skill_category.technical')}</Radio.Button>
            <Radio.Button value="mobility">{t('form.skill_category.mobility')}</Radio.Button>
          </Radio.Group>
        </> }

        {skillCategory && <>
          <h2>{t(`form.skill_category.${skillCategory}`)}</h2>
          <Select
            showSearch
            value={skill && skill.id}
            placeholder={t('form.skill.modal.placeholder')}
            style={{ width: '100%' }}
            defaultActiveFirstOption={false}
            size='large'
            filterOption={false}
            onSearch={handleSearch}
            onChange={handleChange}
          >
            {options}
          </Select>

          {skill && skillCategory !== 'mobility' && <Form.Item style={{ marginTop: 20 }} name="levels" label={t('form.skill.level')}>
            <Radio.Group onChange={(e: any) => setSkillLevel(e.target.value)} defaultValue={`${level}`} value={`${level}`}>
              <Radio.Button value="1">{t(`form.skill.levels.${skillCategory}.1`)}</Radio.Button>
              <Radio.Button value="2">{t(`form.skill.levels.${skillCategory}.2`)}</Radio.Button>
              <Radio.Button value="3">{t(`form.skill.levels.${skillCategory}.3`)}</Radio.Button>
              <Radio.Button value="4">{t(`form.skill.levels.${skillCategory}.4`)}</Radio.Button>
            </Radio.Group>
          </Form.Item>}

        </>}
      </Modal>
    </>
  );
}

export default UserSkillsModal