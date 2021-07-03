import React from 'react';
import { Avatar, Rate, Tag } from 'antd';
import moment from 'moment';
import {
  MobileFilled,
  MailFilled,
  GithubFilled,
  TrophyFilled,
  CheckCircleFilled,
} from '@ant-design/icons';
import { ResumeConfig } from '../types';
import _ from 'lodash';
import './index.less';

type Props = {
  value: ResumeConfig;
};

const wrapper = ({ id, title, theme }) => WrappedComponent => {
  return (
    <section>
      <div className="section-header">
        <img src={`images/${id}.png`} alt="" width="26px" height="26px" />
        <h1 style={{ background: theme }}>{title}</h1>
      </div>
      <div className="section-body">{WrappedComponent}</div>
    </section>
  );
};

/**
 * @description 简历内容区
 */
export const Resume: React.FC<Props> = props => {
  const { value } = props;

  /** 个人基础信息 */
  const profile = _.get(value, 'profile');

  /** 教育经历 */
  const educationList = _.get(value, 'educationList');

  /** 工作经历 */
  const workList = _.get(value, 'workList');

  /** 项目经验 */
  const projectList = _.get(value, 'projectList');

  /** 个人技能 */
  const skillList = _.get(value, 'skillList');

  /** 荣誉奖项 */
  const awardList = _.get(value, 'awardList');

  /** 自我介绍 */
  const aboutme = _.split(_.get(value, 'aboutme'), '\n');

  return (
    <div className="resume-content">
      <div className="basic-info">
        {/* 头像 */}
        {!value?.avatar?.hidden && (
          <Avatar src={value?.avatar?.src} className="avatar" />
        )}
        {/* 个人信息 */}
        <div className="profile">
          {profile?.name && <div className="name">{profile.name}</div>}
          <div className="profile-list">
            {profile?.mobile && (
              <div className="email">
                <MobileFilled style={{ color: '#3c679a' }} />
                {profile.mobile}
              </div>
            )}
            {profile?.email && (
              <div className="email">
                <MailFilled style={{ color: '#3c679a' }} />
                {profile.email}
              </div>
            )}
            {profile?.github && (
              <div className="github">
                <GithubFilled style={{ color: '#3c679a' }} />
                <span
                  style={{ cursor: 'pointer' }}
                  onClick={() => {
                    window.open(profile.github);
                  }}
                >
                  {profile.github}
                </span>
              </div>
            )}
          </div>
        </div>
        {/* 教育经历 */}
        {educationList?.length ? (
          <section className="section section-education">
            <div className="section-title">教育经历</div>
            {educationList.map(education => {
              const start = moment(education.edu_time[0]).format('YYYY.MM');
              const end = moment(education.edu_time[1]).format('YYYY.MM');
              return (
                <React.Fragment>
                  <div className="section-info">
                    {start}
                    {end ? `- ${end}` : ' 至今'}
                  </div>
                  <div>
                    <b>{education.school}</b>
                    {education.major && (
                      <span style={{ marginLeft: '4px' }}>
                        {education.major}
                      </span>
                    )}
                  </div>
                </React.Fragment>
              );
            })}
          </section>
        ) : null}
        {/* 荣誉奖项 */}
        {awardList?.length ? (
          <section className="section section-award">
            <div className="section-title">荣誉奖项</div>
            {awardList.map((award, idx) => {
              return (
                <div key={idx.toString()}>
                  <TrophyFilled
                    style={{ color: '#ffc107', marginRight: '4px' }}
                  />
                  <span className="award-time">
                    {moment(award.award_time).format('YYYY.MM')}
                  </span>
                  <b className="info-name">{award.award_info}</b>
                </div>
              );
            })}
          </section>
        ) : null}
        {/* 个人技能 */}
        {skillList?.length ? (
          <section className="section section-skill">
            <div className="section-title">技能</div>
            {skillList.map(skill => {
              return skill ? (
                <React.Fragment>
                  <div className="section-info">
                    <b className="info-name">{skill.skill_name}</b>
                    <Rate
                      allowHalf
                      disabled
                      value={skill.skill_level / 20}
                      className="skill-rate"
                    />
                  </div>
                  {_.split(skill.skill_desc, '\n').map(d => (
                    <div className="skill-detail-item">
                      <CheckCircleFilled
                        style={{ color: '#ffc107', marginRight: '4px' }}
                      />
                      {d}
                    </div>
                  ))}
                </React.Fragment>
              ) : null;
            })}
          </section>
        ) : null}
      </div>
      <div className="main-info">
        {wrapper({
          id: 'work-experience',
          title: '工作经历',
          theme: 'rgb(39, 63, 117)',
        })(
          <div className="section section-work">
            {_.map(workList, (work, idx) =>
              work ? (
                <div className="section-item">
                  <div className="section-info" key={idx}>
                    <b className="info-name">
                      {work.company_name}
                      <span className="sub-info">{work.department_name}</span>
                    </b>
                  </div>
                  <div>{work.work_desc}</div>
                </div>
              ) : null
            )}
          </div>
        )}

        {wrapper({ id: 'skill', title: '项目经历', theme: 'rgb(39, 63, 117)' })(
          <div className="section section-project">
            {_.map(projectList, (project, idx) =>
              project ? (
                <div className="section-item">
                  <div className="section-info" key={idx}>
                    <b className="info-name">{project.project_name}</b>
                    {project.project_role && <Tag>{project.project_role}</Tag>}
                  </div>
                  <div style={{ whiteSpace: 'pre-wrap' }}>
                    {project.project_desc}
                  </div>
                </div>
              ) : null
            )}
          </div>
        )}

        {aboutme?.length
          ? wrapper({
              id: 'love',
              title: '自我介绍',
              theme: 'rgb(39, 63, 117)',
            })(
              <div>
                {aboutme.map(d => (
                  <div>{d}</div>
                ))}
              </div>
            )
          : null}
      </div>
    </div>
  );
};
