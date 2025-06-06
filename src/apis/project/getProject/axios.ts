import instance from '@/apis/axios';
import { ProjectType } from '../ProjectType';

// 유저의 모든 프로젝트 조회
export const getUserProjects = async (): Promise<ProjectType[]> => {
  const { data } = await instance.get('/projects');
  return data;
};

// 특정 프로젝트 조회
export const getProject = async (projectKey: string): Promise<ProjectType> => {
  const { data } = await instance.get(`/projects/${projectKey}`);
  return data;
};