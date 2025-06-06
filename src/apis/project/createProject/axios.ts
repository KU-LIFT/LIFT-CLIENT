import instance from '@/apis/axios';
import { ProjectType } from '../ProjectType';

const createProject = async ({ projectKey, name, description }: ProjectType) => {
  const { data } = await instance.post('/projects', {
    projectKey,
    name,
    description,
  });
  return data;
};

export default createProject;